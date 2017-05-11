import {css} from 'styled-components'

const genPsuedoMixin = className => (...args) => css`
  ;&:${className} {
    ${css(...args)}
  }
`

export const hover = genPsuedoMixin('hover')
