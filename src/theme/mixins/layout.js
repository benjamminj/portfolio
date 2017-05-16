import {css} from 'styled-components'

import {MARGIN_SIZES} from '../constants'

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
export const padding = props => css`padding: ${props.padding || 'initial'}`
export const paddingBase = props =>
  css`padding: ${props.padding || MARGIN_SIZES.base}`
