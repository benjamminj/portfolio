// @flow
import React from 'react'

import {Ul} from 'src/theme'
import type {ProjectsProps} from './Projects.types'

const Projects = (props: ProjectsProps) => (
  <section className='Projects' {...props}>
    <h2>recent work</h2>
    <Ul>
      {props.children}
    </Ul>
  </section>
)

export default Projects
