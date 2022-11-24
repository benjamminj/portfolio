import Prism from 'prismjs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

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
import type { HtmlAst, HtmlAstNode } from './hast.types';

export class MarkdownService {
	/**
	 * Pipeline to take raw Markdown and turn it into a HTML string.
	 */
	public static async toHTML(markdown: string) {
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
	public static async parseMarkdownToHast(markdown: string) {
		// Spits out a hast (HTML AST) of the markdown, this can later be processed by
		// individual frontend components.
		const hast = (await unified()
			.use(remarkParse)
			// TODO: change to process and send HAST? or change to be based on MDAST?
			// Alternatively we could do processing on the HTML to add stuff like the copy-pasta
			// button.
			.parse(markdown)) as unknown as HtmlAst;

		const highlightedHast = this.highlightCodeBlocks(hast);

		return this.pruneAst(highlightedHast);
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

	/**
	 * Given a HAST node, remove the position. This is not used by the markdown rendering
	 * and dramatically decreases the size of the payload (sometimes up to 50% smaller!!)
	 */
	private static pruneHastNode(node: HtmlAstNode): Omit<HtmlAstNode, 'position'> {
		const { position: _position, ...rest } = node;
		return rest;
	}

	/**
	 * This prunes down a given HAST node recursively to remove the position.
	 */
	private static pruneAst(ast: HtmlAst) {
		type TransformedNode = Omit<HtmlAstNode, 'position' | 'children'> & {
			children?: TransformedNode[];
		};

		const transformHastNode = (node: HtmlAstNode): TransformedNode => {
			let children: TransformedNode[] | undefined;

			if (node.children) {
				const transformedChildren: TransformedNode[] = node.children.map(transformHastNode);
				children = transformedChildren;
			}

			const { children: _, ...pruned } = this.pruneHastNode(node);
			return {
				...pruned,
				children
			};
		};

		const transformedChildren = ast.children.map(transformHastNode);
		const { children: _children, position: _pos, ...rest } = ast;
		return {
			...rest,
			children: transformedChildren
		};
	}
}

export type PrunedHast = Awaited<ReturnType<typeof MarkdownService.parseMarkdownToHast>>;
