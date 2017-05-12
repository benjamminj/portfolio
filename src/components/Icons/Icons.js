// @flow
import React from 'react'

import {Svg as SvgStyled} from 'src/theme'
import type {SvgProps} from './Icons.types'

const Svg = (props: SvgProps) => (
  <SvgStyled
    height='24'
    width='24'
    viewBox={props.viewBox || '0 0 24 24'}
    {...props}
  >
    {props.children}
  </SvgStyled>
)

export const CloseIcon = (props: SvgProps) => (
  <Svg className='Close-Icon' viewBox='2 4 22 20' {...props}>
    <path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />
  </Svg>
)

export const MenuIcon = (props: SvgProps) => (
  <Svg className='Menu-Icon' viewBox='2 4 22 20' {...props}>
    <path d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
  </Svg>
)
