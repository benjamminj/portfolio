// @flow
import React from 'react'

import type {SvgProps} from './Icons.types'

const Svg = (props: SvgProps) => (
  <svg height='24' width='24' {...props}>
    {props.children}
  </svg>
)

export const MenuIcon = (props: SvgProps) => (
  <Svg {...props}>
    <path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
  </Svg>
)
