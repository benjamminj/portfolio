// @flow
import React, {Component} from 'react'

import {Toggler} from 'src/components'

import type {NavItem} from '../components/Nav/Nav.types'

type HomeProps = {nav: Array<NavItem>}

class Home extends Component {
  props: HomeProps
  defaultProps: HomeProps

  render () {
    return (
      <main className='Home'>
        <Toggler id='toggle-nav' navItems={this.props.nav} />
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
