import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './Code.module.css'

interface CodeProps {
  children: ReactNode
  className?: string
}

export const Code = ({ children, className, ...rest }: CodeProps) => {
  console.log('rest >>', rest)
  return <code className={clsx(className, styles.code)}>{children}</code>
}
