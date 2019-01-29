import React from 'react'
import GatsbyLink from 'gatsby-link'
import styled from 'react-emotion'
import { linkStyle } from '../styles/mixins'

const A = styled.a`
  ${linkStyle()};
`

const InternalLink = A.withComponent(GatsbyLink)

const Link = ({ external, ...props }) =>
  external ? (
    <A
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    />
  ) : (
    <InternalLink {...props} />
  )

export default Link
