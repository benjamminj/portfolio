// @flow
import React from 'react'
import {A, Label} from 'src/theme'

import type {NavProps} from './Nav.types'

const Nav = (props: NavProps) => (
  <nav>
    {props.toggleNav
      ? <Label icon htmlFor={props.toggleNav.target}>{props.toggleNav.icon()}</Label>
      : ''}
    <ul>
      {props.navItems.map(item => (
        <li key={item.url.slice(1)}>
          <A href={item.url}>{item.text}</A>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
