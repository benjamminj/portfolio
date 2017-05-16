// @flow
import React from 'react'
import styled from 'styled-components'
import rgba from 'hex-rgba'

import {
  A,
  Label,
  Li,
  Z_LEVELS,
  FONT_SIZES,
  MARGIN_SIZES,
  COLORS
} from 'src/theme'
import {CloseIcon, MenuIcon} from 'src/components/Icons'

import type {NavProps} from './Nav.types'

const NavMenu = styled.div`
  position: fixed
  background: ${COLORS.white}
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
  z-index: ${Z_LEVELS.top}
`

const MenuHeader = styled.header`
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: ${Z_LEVELS.top}
  padding: ${MARGIN_SIZES.base}
`

const BlurredBackground = styled.div`
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: ${rgba(COLORS.white, 98)}
  z-index: -1
`

const Nav = (props: NavProps) => (
  <nav className='Nav'>
    <MenuHeader className='Menu-Header'>
      <BlurredBackground className='Blurred-Background' />
      {props.toggleId
        ? <MenuLabel icon htmlFor={props.toggleId}>
          <MenuIcon size={FONT_SIZES.xlarge} />
          <CloseIcon size={FONT_SIZES.xlarge} />
        </MenuLabel>
        : ''}
    </MenuHeader>
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
