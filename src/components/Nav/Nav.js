// @flow
import React from 'react'
import styled from 'styled-components'

import {A, Label, Li, Z_LEVELS, FONT_SIZES, MARGIN_SIZES} from 'src/theme'
import {MenuIcon} from 'src/components/Icons'

import type {NavProps} from './Nav.types'

const NavMenu = styled.div`
  position: fixed
  background: indianred
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: ${Z_LEVELS.top - 100}
`

const MenuLabel = styled(Label)`
  position: fixed
  top: ${MARGIN_SIZES.base}
  left: ${MARGIN_SIZES.base}
  z-index: ${Z_LEVELS.top}
`

const Nav = (props: NavProps) => (
  <nav className='Nav'>
    {props.toggleId
      ? <MenuLabel icon htmlFor={props.toggleId}>
        <MenuIcon size={FONT_SIZES.xlarge} />
      </MenuLabel>
      : ''}
    <NavMenu className='toggle-able'>
      <ul>
        {props.navItems.map(item => (
          <Li
            centered
            fontSize={FONT_SIZES.xlarge}
            key={item.url.slice(1)}
            margin={'1.5rem 0'}
          >
            <A href={item.url}>{item.text}</A>
          </Li>
        ))}
      </ul>
    </NavMenu>
  </nav>
)

export default Nav
