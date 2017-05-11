// @flow
import React from 'react'

import {Svg as SvgStyled} from 'src/theme'
import type {SvgProps} from './Icons.types'

const Svg = (props: SvgProps) => (
  <SvgStyled height='24' width='24' viewBox='0 0 24 24' {...props}>
    {props.children}
  </SvgStyled>
)

export const MenuIcon = (props: SvgProps) => (
  <Svg {...props}>
    <path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
  </Svg>
)
