// @flow
import React from 'react'
import {A} from 'src/theme'

type NavItem = {
  url: string,
  text: string
}

type NavProps = {
  navItems: Array<NavItem>
}

const Nav = (props: NavProps) => (
  <nav>
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
