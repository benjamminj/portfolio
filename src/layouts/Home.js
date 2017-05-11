// @flow
import React, {Component} from 'react'

import {Nav, Toggler, Icons} from 'src/components'

import type {NavItem} from '../components/Nav/Nav.types'

const {MenuIcon} = Icons

type HomeProps = {nav: Array<NavItem>}

class Home extends Component {
  props: HomeProps
  defaultProps: HomeProps

  render () {
    const navTogglerId = 'toggle-nav'
    const HomeNav = () => (
      <Nav
        navItems={this.props.nav}
        toggleNav={{target: navTogglerId, icon: MenuIcon}}
      />
    )
    return (
      <main className='Home'>
        <Toggler toggledComponent={HomeNav} id={navTogglerId} />
        <section id='Banner'>Banner</section>
        <section id='Work'>Work</section>
        <section id='About'>About</section>
      </main>
    )
  }
}

Home.defaultProps = {
  nav: [
    {url: '/#Banner', text: 'home'},
    {url: '/#Work', text: 'work'},
    {url: '/#About', text: 'about'},
    {url: 'mailto:benjamin.d.johnson@icloud.com', text: 'contact'}
  ]
}

export default Home
