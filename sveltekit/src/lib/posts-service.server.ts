import fm from 'front-matter';
import type { ZodTypeAny } from 'zod';
import { z } from 'zod';
import { MarkdownService } from './markdown-service.server';

/**
 * Parses a date object into a JSON-serializable string, formatted as yyyy-mm-dd.
 */
const FormattedDateSchema = z.date().transform((date) => {
	const iso = date.toISOString();

	// We split the ISO string into its components using a regex to avoid timezone conversions
	// that occur when using date.getMonth, date.getDay, etc. This makes sure that the date
	// is stable (always in GMT timezone) regardless of where the build was run.
	const [y, m, d] = iso.split(/[-T]/);
	return [y, m?.padStart(2, '0'), d?.padStart(2, '0')].join('-');
});

/**
 * All of the metadata about the blog post. This mostly comes from the front-matter
 * of the file, but some items can be derived from the file name.
 */
const PostMetadataSchema = z
	.object({
		slug: z.string(),
		title: z.string(),
		date: FormattedDateSchema,
		lastUpdated: FormattedDateSchema.optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]),
		link: z.string().optional(),
		publisher: z.string().optional()
	})
	.transform(({ lastUpdated, date, ...rest }) => ({
		...rest,
		date: lastUpdated ?? date
	}));

/**
 * The post content itself, parsed into a HTML AST. This schema should usually be
 * composed with the metadata schema to create a full "Post" object.
 */
const PostContentSchema = z.object({
	// @todo: This should be the type of the HAST, but since that's recursive you
	// can easily get into an infinite parsing loop.
	content: z.any()
});

/**
 * A single post, with metadata and parsed HAST content.
 */
const PostSchema = z.intersection(PostContentSchema, PostMetadataSchema);

export type Post = z.infer<typeof PostSchema>;
export type PostMetadata = z.infer<typeof PostMetadataSchema>;
export type PostContent = z.infer<typeof PostContentSchema>;

/**
 * Responsible for reading & formatting post data.
 *
 * TODO: set up a cache to make retrieval of posts a little faster
 * when we get up large builds...
 */
export class PostService {
	public static async list({ include = [] }: { include?: 'html'[] } = {}): Promise<
		(Post & { html?: string })[]
	> {
		const rawPosts = await this.fetchRaw();
		const formatted = await Promise.all(
			rawPosts.map(([path, raw]) => this.parse({ path, raw, include }))
		);

		formatted.sort((a, b) => b.date.localeCompare(a.date));
		return formatted;
	}

	public static async get(slug: string) {
		const rawPosts = await this.fetchRaw();
		const [path, raw] = rawPosts.find(([path]) => this.slugify(path) === slug) ?? [];
		if (!path || !raw) {
			throw new Error(`Post not found: ${slug}`);
		}
		const metadata = await this.parse({ path, raw });
		const { body } = fm<Record<string, string>>(raw);
		const content = await MarkdownService.parseMarkdownToHast(body);
		return {
			...metadata,
			content
		};
	}

	/**
	 * Fetches the raw posts from the file system.
	 */
	private static async fetchRaw() {
		const posts = import.meta.glob('../../../content/writing/**/*.md', { eager: true, as: 'raw' });

		return Object.entries(posts);
	}

	/**
	 * Given a path and raw content, parses the post into a Post object.
	 * Optionally, can include the raw HTML content of the post.
	 */
	private static async parse({
		path,
		raw,
		include = []
	}: {
		path: string;
		raw: string;
		include?: 'html'[];
	}) {
		const slug = this.slugify(path);
		const { attributes, body } = fm<Record<string, string>>(raw);
		const post: Record<string, unknown> = {
			slug,
			...attributes
		};

		let schema: ZodTypeAny = PostMetadataSchema;

		// TODO: can this be extracted from the main parse fn to only happen if passed
		// in??
		// Optionally allow the content to be included as pre-parsed HTML
		// for the RSS feed.
		if (include.includes('html')) {
			const html = await MarkdownService.toHTML(body);
			schema = z.intersection(PostMetadataSchema, z.object({ html: z.string() }));
			post.html = html;
		}

		return schema.parseAsync(post) as Promise<Post>;
	}

	/**
	 * Converts a file path into a slug. This is used to generate the slug for a
	 * post from its file name.
	 */
	private static slugify(path: string) {
		const [_, tail] = path.split('/content/writing/');
		return tail.replace('.md', '');
	}
}
