import { fromMarkdown } from 'mdast-util-from-markdown';
import { CompileContext, Root } from 'mdast-util-from-markdown/lib';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import Prism from 'prismjs';

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
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-clike.min.js';
import 'prismjs/components/prism-diff.min.js';
import 'prismjs/components/prism-haskell.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-markup.min.js';
import 'prismjs/components/prism-tsx.min.js';
import 'prismjs/components/prism-typescript.min.js';

type Node = CompileContext['stack'][number];

export class MarkdownService {
	/**
	 * Pipeline to take raw Markdown and turn it into a HTML string.
	 */
	public static async toHTML(markdown: string) {
		const html = micromark(markdown, {
			extensions: [gfm()],
			htmlExtensions: [gfmHtml()],
		});

		return html;
	}

	/**
	 * Responsible for taking in a markdown string and returning the resulting HTML.
	 *
	 * A couple things to note:
	 * - Code blocks will be highlighted using PrismJS
	 * - At the current time, frontmatter is not extracted, so that needs to be done separately.
	 */
	public static async parseMarkdownToMdast(markdown: string) {
		const tree = fromMarkdown(markdown, {
			extensions: [gfm()],
			mdastExtensions: [gfmFromMarkdown()],
		});

		const highlightedHast = this.highlightCodeBlocks(tree);

		return this.pruneAst(highlightedHast);
	}

	/**
	 * Walks the AST and highlights any code blocks that are found.
	 */
	static highlightCodeBlocks = (ast: Root): Root => {
		const transform = (node: Node): Node => {
			if (node.type === 'code' && node.lang) {
				const value = this.highlight(node.value, node.lang);

				return {
					...node,
					value,
				};
			}

			if ('children' in node) {
				const mappedChildren = node.children.map(transform);
				return {
					...node,
					children: mappedChildren,
				} as Node;
			}

			return node;
		};

		const children = ast.children.map(transform);
		return {
			...ast,
			data: children,
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
	private static pruneAstNode(node: Node): Omit<Node, 'position'> {
		const { position: _position, ...rest } = node;
		return rest;
	}

	/**
	 * This prunes down a given HAST node recursively to remove the position.
	 */
	private static pruneAst(ast: Root) {
		type TransformedNode = Omit<Node, 'position' | 'children'> & {
			children?: TransformedNode[];
		};

		const transformAstNode = (node: Node): TransformedNode => {
			let children: TransformedNode[] | undefined;

			if ('children' in node) {
				const transformedChildren: TransformedNode[] = node.children.map(transformAstNode);
				children = transformedChildren;
			}

			let pruned = this.pruneAstNode(node);

			if ('children' in pruned) {
				const { children: _children, ...rest } = pruned;
				pruned = rest;
			}

			return {
				...pruned,
				children,
			} as TransformedNode;
		};

		const transformedChildren = ast.children.map(transformAstNode);
		const { children: _children, position: _pos, ...rest } = ast;
		return {
			...rest,
			children: transformedChildren,
		};
	}
}

export type PrunedHast = Awaited<ReturnType<typeof MarkdownService.parseMarkdownToMdast>>;
