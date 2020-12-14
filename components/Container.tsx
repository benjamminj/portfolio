import clsx from 'clsx'
import { ReactNode } from 'react'

export const Container = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div className={clsx('max-w-prose my-0 mx-auto', className)}>
      {children}
    </div>
  )
}
