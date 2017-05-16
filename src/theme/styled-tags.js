import styled, {css} from 'styled-components'
import rgba from 'hex-rgba'

import {COLORS, FOCUS_OUTLINE} from './constants'
import {animations, layout, pseudo, text} from './mixins'

const {focus, hover} = pseudo

export const A = styled.a`
  text-decoration: none
  color: inherit
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

export const H1 = styled.h1`
  margin: 0
  ${text.fontSize}
`

export const H2 = styled.h2`
  margin: 0
  ${text.fontSize}
  ${layout.padding}
`

export const Input = styled.input`
  ${props => (props.invisible ? css`
      position: fixed
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

export const Li = styled.li`
  ${text.centered}
  ${text.fontSize}
  ${layout.margin}
`

export const Section = styled.section`
  background: ${props => props.background || 'initial'}
  color: ${props => props.color || 'inherit'}
  min-height: ${props => (props.fullscreen ? '100vh' : 'initial')}
  width: 100%

  ${layout.paddingBase}
  ${props => (props.flexCenter ? layout.centerFlexColumn : '')}
`

export const Svg = styled.svg`
  fill: currentColor
  ${props => (props.size ? layout.squareSizing(props.size) : '')}
  ${hover`
    cursor: pointer
  `}
`

export const Ul = styled.ul`
  list-style-type: none
  padding-left: 0
  margin: 0
`
