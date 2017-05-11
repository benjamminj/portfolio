import styled from 'styled-components'
import rgba from 'hex-rgba'

import {COLORS} from './constants'
import {animations} from './mixins'

export const A = styled.a`
  text-decoration: none
  color: ${rgba(COLORS.white, 90)}
  text-shadow: none

  ${animations.transitionShort('color', 'text-shadow')}

  ;&:hover {
    color: ${rgba(COLORS.white, 100)}
    text-shadow: 0 0 ${COLORS.white}
    cursor: pointer
  }
`
