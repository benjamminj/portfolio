import {css} from 'styled-components'

export const hover = (strings, ...args) => `
  ;&:hover {
    ${css(strings, ...args)}
  }
`
