import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { spacing, SpacingToken } from '../styles/theme'

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

interface StackProps extends DivProps {
  horizontal?: boolean
  space?: SpacingToken
  children: ReactNode
}

export const Stack = ({
  horizontal = false,
  space = 'm',
  children,
  ...props
}: StackProps) => {
  const marginProperty = horizontal ? 'marginLeft' : 'marginTop'
  return (
    <div
      {...props}
      css={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: horizontal ? 'center' : 'flex-start',

        '> * + *': {
          [marginProperty]: spacing[space],
        },
      }}
    >
      {children}
    </div>
  )
}
