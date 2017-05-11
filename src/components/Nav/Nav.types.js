// @flow
import React from 'react'

export type NavItem = {
  url: string,
  text: string
}

export type ToggleNav = {
  target: string,
  icon: () => React.Component<*> // TODO: find a correct typing for this
}

export type NavProps = {
  navItems: Array<NavItem>,
  toggleNav: ToggleNav
}
