// @flow
import React from 'react'
import {A} from 'src/theme'

import type {NavProps} from './Nav.types'

const Nav = (props: NavProps) => (
  <nav>
    {props.toggleNav
      ? <label htmlFor={props.toggleNav.target}>{props.toggleNav.icon()}</label>
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
