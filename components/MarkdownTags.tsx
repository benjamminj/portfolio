import { forwardRef, ReactNode } from 'react'
import { Callout } from './Callout'
import { Code } from './Code'
import styles from './MarkdownTags.module.css'
import { Pre } from './Pre'

export const A = forwardRef<
  HTMLAnchorElement,
  { href?: string; children: ReactNode; title?: string }
>(({ href, children, title }, ref) => {
  return (
    <a
      ref={ref}
      title={title}
      href={href}
      className={
        'px-0.5 font-medium text-gray-500 no-underline bg-transparent border-b-2 border-gray-200 rounded-sm border-b-solid hover:bg-gray-100 hover:text-gray-600 hover:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-900 dark:hover:bg-opacity-50 dark:hover:border-white'
      }
    >
      {children}
    </a>
  )
})

export const P = ({ children }) => {
  return <p className="mb-6 text-base leading-7">{children}</p>
}

export const H2 = ({ children }) => {
  return <h2 className="mt-16 mb-6 text-3xl font-medium">{children}</h2>
}

export const H3 = ({ children }) => {
  return <h3 className="mt-12 mb-4 text-2xl font-medium">{children}</h3>
}

export const H4 = ({ children }) => {
  return <h4 className="mt-10 mb-4 text-xl font-medium">{children}</h4>
}

export const H5 = ({ children }) => {
  return <h5 className="mt-6 mb-4 text-lg font-medium">{children}</h5>
}

export const H6 = ({ children }) => {
  return <h6 className="mt-6 mb-4 text-base font-medium">{children}</h6>
}

export const InlineCode = ({ children }) => {
  return (
    <code className="p-1 break-words bg-gray-100 rounded-md dark:bg-gray-900">
      {children}
    </code>
  )
}

export const Ol = ({ children }) => {
  return <ol className={`pl-8 ${styles.ol}`}>{children}</ol>
}

export const Ul = ({ children }) => {
  return <ul className={`pl-6 ${styles.ul}`}>{children}</ul>
}

export const Li = ({ children }) => {
  return (
    <li
      className={`relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute ${styles.li}`}
    >
      {children}
    </li>
  )
}

export const Hr = () => {
  return (
    <hr
      className="relative h-auto my-16 font-mono tracking-tighter text-center border-none content-before before:text-lg dark:text-gray-400"
      tw-content-before="* * *"
    />
  )
}

export const components = {
  a: A,
  p: P,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  inlineCode: InlineCode,
  code: Code,
  ol: Ol,
  ul: Ul,
  li: Li,
  hr: Hr,
  Callout: props => (
    <div className="my-6 -mx-4 md:mx-0 lg:-mx-6">
      <Callout {...props} />
    </div>
  ),
}
