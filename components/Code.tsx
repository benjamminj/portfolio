import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './Code.module.css'
import { Pre } from './Pre'

interface CodeProps {
  children: ReactNode
  className?: string
}

export const Code = ({ children, className }: CodeProps) => {
  return <code className={clsx(className, styles.code)}>{children}</code>
}

export const CodeExample = ({ children, language }) => {
  return (
    <Pre className={`language-${language}`}>
      <code
        className={clsx(`language-${language}`, styles.code)}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </Pre>
  )
}
