// @flow
import React, {Component} from 'react'

import {COLORS} from 'src/theme'
import {About, Banner, Toggler, SubTitle, Projects, Project} from 'src/components'
import {projects, bio} from 'src/content'

import type {NavItem} from '../components/Nav/Nav.types'
import type {Project as ProjectType} from '../components/Project/Project.types'

class Home extends Component {
  props: {nav: NavItem[], projects: ProjectType[] }

  static defaultProps = {
    nav: [
      {url: '/#Banner', text: 'home'},
      {url: '/#Work', text: 'work'},
      {url: '/#About', text: 'about'},
      {url: 'mailto:benjamin.d.johnson@icloud.com', text: 'contact'}
    ],
    projects: projects
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
          {
            this.props.projects.map(project =>
              <Project key={project.title} id={project.title.split(' ').join()} project={project} />
            )
          }
        </Projects>
        <About bio={bio} />
      </main>
    )
  }
}

export default Home
