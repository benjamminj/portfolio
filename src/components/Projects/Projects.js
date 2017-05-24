// @flow
import React from 'react'

import {H2, Section, Ul} from 'src/theme'
import type {ProjectsProps} from './Projects.types'

const Projects = (props: ProjectsProps) => (
  <Section className='Projects' padding='1rem 0 0' background={props.background} {...props}>
    <H2 padding='1rem 1rem 0'>recent work</H2>
    <Ul>
      {props.children}
    </Ul>
  </Section>
)

export default Projects
