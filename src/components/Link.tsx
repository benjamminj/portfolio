import React, { FC } from 'react'
import NextLink, { LinkProps } from 'next/link'
import styled from '@emotion/styled'
import { linkStyle } from '../styles/mixins'

const A = styled.a`
  ${linkStyle()};
`

interface AdditionalLinkProps {
  /** If the link is not on this site, open it in a new tab */
  external?: boolean
}

export const Link: FC<LinkProps & AdditionalLinkProps> = ({
  external = false,
  href,
  as,
  ...props
}) => {
  // If it's an external link, don't use the nextjs `Link` wrapper, just
  // render a regular `a` tag.
  if (external && typeof href === 'string') {
    return (
      <A {...props} href={href} target="_blank" rel="noopener noreferrer" />
    )
  }

  return (
    <NextLink href={href} as={as} passHref>
      <A {...props} />
    </NextLink>
  )
}
