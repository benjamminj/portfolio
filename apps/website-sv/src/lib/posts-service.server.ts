import fm from "front-matter";
import { glob } from "glob";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { ZodTypeAny } from "zod";
import { z } from "zod";
import { readFile } from "./read-file";
import { rehypeCallouts } from "./rehype-callouts";
import { slimAst } from "./rehype-slim-hast";
import rehypeStringify from "rehype-stringify";
import { fromHtml } from "hast-util-from-html";
import rehypeParse from "rehype-parse";

/**
 * Parses a date object into a JSON-serializable string, formatted as yyyy-mm-dd.
 */
const FormattedDateSchema = z.date().transform((date) => {
	const iso = date.toISOString();

	// We split the ISO string into its components using a regex to avoid timezone conversions
	// that occur when using date.getMonth, date.getDay, etc. This makes sure that the date
	// is stable (always in GMT timezone) regardless of where the build was run.
	const [y, m, d] = iso.split(/[-T]/);
	return [y, m?.padStart(2, "0"), d?.padStart(2, "0")].join("-");
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
		publisher: z.string().optional(),
	})
	.transform(({ lastUpdated, date, ...rest }) => ({
		...rest,
		date: lastUpdated ?? date,
	}));

/**
 * The post content itself, parsed into a HTML AST. This schema should usually be
 * composed with the metadata schema to create a full "Post" object.
 */
const PostContentSchema = z.object({
	// @todo: This should be the type of the HAST, but since that's recursive you
	// can easily get into an infinite parsing loop.
	content: z.any(),
});

/**
 * A single post, with metadata and parsed HAST content.
 */
const PostSchema = z.intersection(PostContentSchema, PostMetadataSchema);

export type Post = z.infer<typeof PostSchema>;

/**
 * Responsible for reading & formatting post data.
 *
 * TODO: set up a cache to make retrieval of posts a little faster
 * when we get up large builds...
 */
/**
 * Fetches the raw posts from the file system.
 */
async function fetchRaw() {
	const posts = await glob("**/content/writing/**/*.md");
	return posts;
}

/**
 * Converts a file path into a slug. This is used to generate the slug for a
 * post from its file name.
 */
function slugify(path: string) {
	const [_, tail] = path.split("content/writing/");
	return tail.replace(".md", "");
}

/**
 * Given a path and raw content, parses the post into a Post object.
 * Optionally, can include the raw HTML content of the post.
 */
async function parse({
	path,
	raw,
	include = [],
}: {
	path: string;
	raw: string;
	include?: "html"[];
}) {
	const slug = slugify(path);
	const { attributes, body } = fm<Record<string, string>>(raw);
	const post: Record<string, unknown> = {
		slug,
		...attributes,
	};

	let schema: ZodTypeAny = PostMetadataSchema;

	// Optionally allow the content to be included as pre-parsed HTML
	// for the RSS feed.
	if (include.includes("html")) {
		const html = await transformToStaticHTML(body);
		schema = z.intersection(PostMetadataSchema, z.object({ html: z.string() }));
		post.html = html;
	}

	const hast = await transformToAst(body);

	return schema.parseAsync(post) as Promise<Post>;
}

/**
 * Pipeline to take raw Markdown and turn it into a HTML string. This should only be used as
 * part of the RSS feed.
 */
async function transformToStaticHTML(markdown: string) {
	// TODO: use rehype to render it out to MD?
}

// TODO: some other service (markdown?)
export async function transformToAst(markdown: string) {
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeCallouts)
		.use(rehypePrettyCode, {
			theme: "rose-pine",
			defaultLang: "plaintext",
			keepBackground: false,
		})
		.use(() => slimAst);

	const mdast = processor.parse(markdown);
	const hast = processor.run(mdast);
	// const parsed = fromHtml(ast.value);
	// slimAst(ast);

	// return hyped;
	return hast;
}

/**
 *
 * Lists all posts, optionally including additional data like HTML.
 */
async function list({ include = [] }: { include?: "html"[] } = {}): Promise<
	(Post & { html?: string })[]
> {
	const rawPosts = await fetchRaw();

	const formatted = await Promise.all(
		rawPosts.map((path) =>
			readFile(path).then((raw) => parse({ path, raw, include })),
		),
	);

	formatted.sort((a, b) => b.date.localeCompare(a.date));
	return formatted;
}

/**
 * Retrieves a single post by its slug.
 */
async function get(slug: string) {
	const rawPosts = await fetchRaw();
	const path = rawPosts.find((path) => slugify(path) === slug);
	if (!path) {
		throw new Error(`Post not found: ${slug}`);
	}

	const raw = await readFile(path);
	const metadata = await parse({ path, raw });
	const { body } = fm<Record<string, string>>(raw);
	return {
		...metadata,
		body,
	};
}

export const PostService = {
	list,
	get,
};
