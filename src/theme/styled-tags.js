import styled, {css} from 'styled-components'
import rgba from 'hex-rgba'

import {COLORS, FOCUS_OUTLINE} from './constants'
import {animations, layout, pseudo, text} from './mixins'

const {focus, hover} = pseudo

export const A = styled.a`
  text-decoration: none
  color: ${rgba(COLORS.white, 90)}
  text-shadow: none
  ${text.centered}

  ${animations.transitionShort('color', 'text-shadow')}

  ${hover`
    color: ${rgba(COLORS.white, 100)}
    text-shadow: 0 0 ${COLORS.white}
    cursor: pointer
  `}

  ${focus`
    ${FOCUS_OUTLINE}
  `}
`

export const Input = styled.input`
  ${props => (props.invisible ? css`
      position: absolute
      left: -100000px

      /* Allows the hidden input's label to appear focused */
      ;&:focus + * label {
        ${FOCUS_OUTLINE}
      }
    ` : '')}
`

export const Label = styled.label`
  ${props => (props.icon ? `user-select: none` : '')}
`

export const Svg = styled.svg`
  fill: currentColor
  ${props => (props.size ? layout.squareSizing(props.size) : '')}
  ${hover`
    cursor: pointer
  `}
`

export const Li = styled.li`
  ${text.centered}
  font-size: ${props => (props.fontSize ? `${props.fontSize}` : 'initial')}
`
