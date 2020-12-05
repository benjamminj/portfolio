import { ReactNode } from 'react'
import { containerWide, textMaxWidth } from '../styles/variables'

// TODO: padding / gutter
export const Container = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div
      className={className}
      css={{
        maxWidth: textMaxWidth,
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  )
}
