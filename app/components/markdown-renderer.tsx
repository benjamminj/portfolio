import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { createElement, Fragment, useRef } from 'react'
import type { HtmlAstNode, HtmlAstNodeMap } from '~/lib/hast.types'
import type { ReactNode } from 'react'
import type { PrunedHast } from '~/lib/parse-markdown'
import { CopyPasteButton } from './copy-paste-button'

const H = ({
  level = 2,
  children,
  ...props
}: { level?: number; children: ReactNode } & JSX.IntrinsicElements['h2']) => {
  const tag = `h${Math.max(Math.min(level, 6), 1)}`
  let styles = {
    h1: '',
    h2: 'mt-16 mb-6 text-3xl',
    h3: 'mt-12 mb-4 text-2xl',
    h4: 'mt-10 mb-4 text-xl',
    h5: 'mt-6 mb-4 text-lg',
    h6: 'mt-6 mb-4 text-base',
  }

  return createElement(
    tag,
    {
      ...props,
      className: clsx(
        styles[tag as unknown as keyof typeof styles],
        'font-medium'
      ),
    },
    children
  )
}

const CodeBlock = ({ code }: { code: string }) => {
  const ref = useRef<HTMLElement>(null)
  return (
    <div className="relative">
      <CopyPasteButton element={ref} />
      <pre className="rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900">
        <code
          className="overflow-auto"
          ref={ref}
          dangerouslySetInnerHTML={{ __html: code }}
        ></code>
      </pre>
    </div>
  )
}

const hastNodeComponents: {
  [K in keyof HtmlAstNodeMap]: (node: HtmlAstNodeMap[K]) => React.ReactNode
} = {
  text: (node) => <>{node.value}</>,
  paragraph: (node) => (
    <p className="mb-6 text-base leading-7">
      <InternalMarkdownRenderer nodes={node.children} />
    </p>
  ),
  link: (node) => {
    if (node.url.startsWith('/')) {
      return (
        <Link to={node.url} className="font-bold">
          <InternalMarkdownRenderer nodes={node.children} />
        </Link>
      )
    } else {
      return (
        <a href={node.url} className="font-bold">
          <InternalMarkdownRenderer nodes={node.children} />
        </a>
      )
    }
  },
  heading: (node) => (
    <H level={node.depth}>
      <InternalMarkdownRenderer nodes={node.children} />
    </H>
  ),
  thematicBreak: (node) => (
    <hr className="relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400" />
  ),
  strong: (node) => (
    <strong>
      <InternalMarkdownRenderer nodes={node.children} />
    </strong>
  ),
  emphasis: (node) => (
    <em>
      <InternalMarkdownRenderer nodes={node.children} />
    </em>
  ),
  list: (node) => {
    if (node.ordered) {
      return (
        <ol className="pl-8 list-none">
          <InternalMarkdownRenderer nodes={node.children} />
        </ol>
      )
    }

    return (
      <ul className="pl-6 list-none">
        <InternalMarkdownRenderer nodes={node.children} />
      </ul>
    )
  },
  listItem: (node) => (
    <li className="relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute">
      <InternalMarkdownRenderer nodes={node.children} />
    </li>
  ),
  blockquote: (node) => (
    <blockquote>
      <InternalMarkdownRenderer nodes={node.children} />
    </blockquote>
  ),
  inlineCode: (node) => (
    <code className="bg-gray-100 dark:bg-gray-700 p-1 break-words">
      {node.value}
    </code>
  ),
  code: (node) => <CodeBlock code={node.value} />,
  image: (node) => <img src={node.url} alt={node.alt} />,
}

function InternalMarkdownRenderer({ nodes }: { nodes?: HtmlAstNode[] }) {
  if (!nodes) return null
  return (
    <>
      {nodes.map((node, i) => {
        const mapper = hastNodeComponents[node.type]
        const content = mapper ? mapper(node as any) : null
        return <Fragment key={i}>{content}</Fragment>
      })}
    </>
  )
}

export function MarkdownRenderer({ hast }: { hast?: PrunedHast }) {
  if (!hast) return null
  return (
    <div className="prose dark:prose-invert font-mono mx-auto max-w-prose">
      <InternalMarkdownRenderer nodes={hast.children as HtmlAstNode[]} />
    </div>
  )
}
