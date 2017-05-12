import {css} from 'styled-components'

export const squareSizing = size => css`
  height: ${size}
  width: ${size}
`

export const flexbox = (
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start'
) => css`
  display: flex
  flex-direction: ${direction}
  align-items: ${align}
  justify-content: ${justify}
`

export const centerFlexColumn = flexbox('column', 'center', 'center')

export const margin = props => css`margin: ${props.margin || 'initial'}`
