// @flow
import React from 'react'
import type {NavItem} from '../Nav/Nav.types'

export type TogglerProps = {
  id: string,
  navItems: NavItem[],
  toggledComponent: () => React.Component<*>,
  children: React.Component<*>[]
}
