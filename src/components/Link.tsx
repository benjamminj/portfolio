import React, { FC } from 'react'
// import GatsbyLink from 'gatsby-link'
import NextLink, { LinkProps } from 'next/link'
import styled from '@emotion/styled'
import { linkStyle } from '../styles/mixins'

const A = styled.a`
  ${linkStyle()};
`

// const InternalLink = A.withComponent(GatsbyLink)

interface AdditionalLinkProps {
  external?: boolean
}

export const Link: FC<LinkProps & AdditionalLinkProps> = ({
  external = false,
  href,
  as,
  ...props
}) => {
  if (external) {
    return <A {...props} target="_blank" rel="noopener noreferrer" />
  }

  return (
    <NextLink href={href} as={as} passHref>
      <A {...props} />
    </NextLink>
  )
}

export default Link
