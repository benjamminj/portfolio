// @flow
import React from 'react'

import {Li} from 'src/theme'
import ProjectThumbnailGroup from '../ProjectThumbnailGroup'
import type { ProjectProps } from './Project.types'

const Project = (props: ProjectProps) => (
  <Li className='Project' id={`project-${props.id}`}>
    <ProjectThumbnailGroup images={props.images} />
  </Li>
)

export default Project
