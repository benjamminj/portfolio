// @flow
import React from 'react'

import {H2, Ul} from 'src/theme'
import type {ProjectsProps} from './Projects.types'

const Projects = (props: ProjectsProps) => (
  <section className='Projects' {...props}>
    <H2 padding='1rem' fontSize='2.5rem'>recent work</H2>
    <Ul>
      {props.children}
    </Ul>
  </section>
)

export default Projects
