// @flow
import React from 'react'

import {A, Label} from 'src/theme'
import {MenuIcon} from 'src/components/Icons'

import type {NavProps} from './Nav.types'

const Nav = (props: NavProps) => (
  <nav className='Nav'>
    {props.toggleId
      ? <Label icon htmlFor={props.toggleId}><MenuIcon /></Label>
      : ''}
    <ul className='toggle-able'>
      {props.navItems.map(item => (
        <li key={item.url.slice(1)}>
          <A href={item.url}>{item.text}</A>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
