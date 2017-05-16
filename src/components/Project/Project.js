import React from 'react'

import type {ProjectProps} from './Project.types'

const Project = (props: ProjectProps) => (
  <li className='Project' id={`project-${props.id}`}>
    <img src='https://placehold.it/500x500?text=project' alt='' aria-hidden='true' />
  </li>
)

export default Project
