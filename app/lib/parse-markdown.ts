import Prism from 'prismjs'
// import { unified } from 'unified'
import type { HtmlAst, HtmlAstNode } from './hast.types'
import { pruneAst } from './prune-hast'
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
import 'prismjs/components/prism-clike.min.js'
import 'prismjs/components/prism-markup.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-haskell.min.js'
import 'prismjs/components/prism-diff.min.js'
import 'prismjs/components/prism-json.min.js'

// const rehypeStringify = import('rehype-stringify')

const highlight = (code: string, lang?: string) => {
  if (!lang) return code
  if (!Prism.languages[lang]) {
    console.warn('language syntax not found:', lang)
    return ''
  }

  return Prism.highlight(code, Prism.languages[lang], lang)
}

export const highlightCodeBlocks = (ast: HtmlAst) => {
  const transform = (node: HtmlAstNode): HtmlAstNode => {
    if (node.type === 'code') {
      const value = highlight(node.value, node.lang)
      return {
        ...node,
        value,
      }
    }

    if (node.children) {
      const mappedChildren = node.children.map(transform)
      return {
        ...node,
        children: mappedChildren,
      }
    }

    return node
  }

  const children = ast.children.map(transform)
  return {
    ...ast,
    children,
  }
}

/**
 * Responsible for taking in a markdown string and returning the resulting HTML.
 *
 * A couple things to note:
 * - Code blocks will be highlighted using PrismJS
 * - At the current time, frontmatter is not extracted, so that needs to be done separately.
 */
export const parseMarkdown = async (markdown: string) => {
  const unified = await import('unified').then(({ unified }) => unified)
  const remarkParse = await import('remark-parse').then((pkg) => pkg.default)
  const remarkRehype = await import('remark-rehype').then((pkg) => pkg.default)
  const rehypeStringify = await import('rehype-stringify').then(
    (pkg) => pkg.default
  )

  // Spits out a hast (HTML AST) of the markdown, this can later be processed by Svelte
  // into individual components.
  const hast = (await unified()
    .use(remarkParse)
    // .use(remarkRehype)
    // .use(rehypeStringify)
    // TODO: change to process and send HAST? or change to be based on MDAST?
    .parse(markdown)) as unknown as HtmlAst

  const highlightedHast = highlightCodeBlocks(hast)

  return pruneAst(highlightedHast)
}

export const parseMarkdownToHTML = async (markdown: string) => {
  const unified = await import('unified').then(({ unified }) => unified)
  const remarkParse = await import('remark-parse').then((pkg) => pkg.default)
  const remarkRehype = await import('remark-rehype').then((pkg) => pkg.default)
  const rehypeStringify = await import('rehype-stringify').then(
    (pkg) => pkg.default
  )

  // Spits out a hast (HTML AST) of the markdown, this can later be processed by Svelte
  // into individual components.
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown)

  return html.value
}

export type PrunedHast = Awaited<ReturnType<typeof parseMarkdown>>
