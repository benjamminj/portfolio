// @flow
import React, {Component} from 'react'

import {Banner, Toggler, SubTitle, Projects, Project} from 'src/components'
import {Ul} from 'src/theme'

import type {NavItem} from '../components/Nav/Nav.types'

class Home extends Component {
  props: {nav: Array<NavItem>}

  static defaultProps = {
    nav: [
      {url: '/#Banner', text: 'home'},
      {url: '/#Work', text: 'work'},
      {url: '/#About', text: 'about'},
      {url: 'mailto:benjamin.d.johnson@icloud.com', text: 'contact'}
    ]
  }

  render () {
    return (
      <main className='Home'>
        <Toggler id='toggle-nav' navItems={this.props.nav} />
        <Banner id='Banner' />
        <SubTitle
          id='SubTitle'
          actionMsg='create intuitive UIs with modern web technologies'
        />
        <Projects id='Projects'>
          <Project id='test-project' images={{
            desktop: 'https://placehold.it/100x100?text=Desktop',
            mobile: 'https://placehold.it/100x100?text=Mobile'
          }} />
        </Projects>
        <section id='About'>About</section>
      </main>
    )
  }
}

export default Home
