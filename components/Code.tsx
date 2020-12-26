import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './Code.module.css'
import { Pre } from './Pre'

interface CodeProps {
  children: ReactNode
  className?: string
}

export const Code = ({ children, className, ...rest }: CodeProps) => {
  return <code className={clsx(className, styles.code)}>{children}</code>
}

export const CodeExample = ({ children, example }) => {
  console.log('example >>', example)
  return (
    <Pre className="language-typescript">
      <code
        className={clsx('language-typescript', styles.code)}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </Pre>
  )
}
