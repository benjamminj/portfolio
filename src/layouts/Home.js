// @flow
import React, {Component} from 'react'

import {COLORS} from 'src/theme'
import {Banner, Toggler, SubTitle, Projects, Project} from 'src/components'

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
        <Projects id='Projects' background={COLORS.accent2}>
          <Project
            id='test-project'
            project={{
              url: 'https://test.com',
              title: 'test project',
              images: {
                desktop: 'https://placehold.it/100x100?text=Desktop',
                mobile: 'https://placehold.it/100x100?text=Mobile'
              },
              background: COLORS.accent2,
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam ratione alias, ab at minus, unde cupiditate quibusdam eius expedita, quaerat earum temporibus illo sed tenetur voluptas. Voluptatem, magni animi sequi quo aliquam odio iste repellat recusandae modi eligendi doloribus, illum.',
              tech: ['reactjs', 'expressjs', 'nodejs', 'scss', 'webpack']
            }}
          />
        </Projects>
        <section id='About'>About</section>
      </main>
    )
  }
}

export default Home
