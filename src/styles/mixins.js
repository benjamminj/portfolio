import { css } from 'emotion'

// shared styles
export const headingStyle = () => css`
  font-family: var(--font-secondary);
  margin: 1.25em 0;
  color: var(--color-primary);
`

export const linkStyle = (color = 'var(--accent-1-dark)') => {
  const borderSize = '1px'

  return css`
    text-decoration: none;
    border-bottom: ${borderSize} solid $color;
    color: ${color};
    padding-top: ${borderSize};
    transition: all 50ms ease-in;

    &:active,
    &:hover {
      background: ${color};
      color: var(--color-secondary);
    }
  `
}

// media queries
export const aboveScreenSm = styles => css`
  @media (min-width: 35rem) {
    ${styles};
  }
`

export const aboveScreenMd = styles => css`
  @media (min-width: 50rem) {
    ${styles};
  }
`