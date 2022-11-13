import Prism from 'prismjs';
import { z } from 'zod';
import type { ZodTypeAny } from 'zod';
import fm from 'front-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { pruneAst } from './prune-hast';
import type { HtmlAst, HtmlAstNode } from './hast.types';

// Import syntax highlighting for languages used across the blog.
//
// This is not a perfect solution, since language syntaxes have to be manually
// added here. This means that using a new language in an article will not result
// in it automatically being highlighted.
//
// However, this approach is far simpler than the alternative approach of dynamically
// importing syntaxes, which relies on Node.js internals (i.e. no moving to CF workers)
// and is a lot of complex, manual code.
//
// TODO: In the future, it may be better to dynamically load these
// or to generate a list of syntaxes needed using the prism CLI. OR it may be simpler/better
// to simply load ALL syntaxes up-front depending on the memory load (might be too
// high for lambda / edge functions + SSR)
import 'prismjs/components/prism-clike.min.js';
import 'prismjs/components/prism-markup.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-tsx.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-haskell.min.js';
import 'prismjs/components/prism-diff.min.js';
import 'prismjs/components/prism-json.min.js';

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
	public static async list({ include = [] }: { include?: 'html'[] } = {}): Promise<Post[]> {
		const rawPosts = await this.fetchRaw();
		const formatted = await Promise.all(
			rawPosts.map(([path, raw]) => this.parse({ path, raw, include }))
		);
		formatted.sort((a, b) => b.date.localeCompare(a.date));
		return formatted;
	}

	// public static get(slug: string) {}

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
		// console.log('>> slug: ', slug);
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
			const html = await this.parseMarkdownToHTML(body);
			schema = z.intersection(PostMetadataSchema, z.object({ html: z.string() }));
			post.html = html;
		}

		return schema.parseAsync(post);
	}

	/**
	 * Converts a file path into a slug. This is used to generate the slug for a
	 * post from its file name.
	 */
	private static slugify(path: string) {
		const [_, tail] = path.split('/content/writing/');
		return tail.replace('.md', '');
	}

	/**
	 * Pipeline to take raw Markdown and turn it into a HTML string.
	 */
	private static async parseMarkdownToHTML(markdown: string) {
		const html = await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(markdown);

		return html.value;
	}

	/**
	 * Responsible for taking in a markdown string and returning the resulting HTML.
	 *
	 * A couple things to note:
	 * - Code blocks will be highlighted using PrismJS
	 * - At the current time, frontmatter is not extracted, so that needs to be done separately.
	 */
	private static async parseMarkdownToHast(markdown: string) {
		// Spits out a hast (HTML AST) of the markdown, this can later be processed by
		// individual frontend components.
		const hast = (await unified()
			.use(remarkParse)
			// TODO: change to process and send HAST? or change to be based on MDAST?
			// Alternatively we could do processing on the HTML to add stuff like the copy-pasta
			// button.
			.parse(markdown)) as unknown as HtmlAst;

		const highlightedHast = this.highlightCodeBlocks(hast);

		return pruneAst(highlightedHast);
	}

	/**
	 * Walks the AST and highlights any code blocks that are found.
	 */
	static highlightCodeBlocks = (ast: HtmlAst) => {
		const transform = (node: HtmlAstNode): HtmlAstNode => {
			if (node.type === 'code') {
				const value = this.highlight(node.value, node.lang);
				return {
					...node,
					value
				};
			}

			if (node.children) {
				const mappedChildren = node.children.map(transform);
				return {
					...node,
					children: mappedChildren
				};
			}

			return node;
		};

		const children = ast.children.map(transform);
		return {
			...ast,
			children
		};
	};

	/**
	 * Highlights a code block using PrismJS.
	 */
	private static highlight(code: string, lang?: string) {
		if (!lang) return code;
		if (!Prism.languages[lang]) {
			console.warn('language syntax not found:', lang);
			return '';
		}

		return Prism.highlight(code, Prism.languages[lang], lang);
	}
}
