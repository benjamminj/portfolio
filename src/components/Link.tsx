import { FC } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { createLinkStyles } from '../styles/mixins'
import { css, jsx, InterpolationWithTheme } from '@emotion/core'
/** @jsx jsx */ jsx

interface AdditionalLinkProps {
  /** If the link is not on this site, open it in a new tab */
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
