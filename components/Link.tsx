import { FC } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { createLinkStyles } from '../styles/mixins'
import { css, jsx, InterpolationWithTheme } from '@emotion/core'
/** @jsxImportSource @emotion/core */ jsx

interface AdditionalLinkProps {
  /** Opens the link in a new tab securely */
  external?: boolean
}

const linkStyles = createLinkStyles()

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
      <a
        {...props}
        css={linkStyles}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      />
    )
  }

  return (
    <NextLink href={href} as={as} passHref>
      <a {...props} css={linkStyles} />
    </NextLink>
  )
}
