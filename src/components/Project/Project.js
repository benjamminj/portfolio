// @flow
import React from 'react'

import {A, ButtonAnchor, H3, Li, P} from 'src/theme'
import TechUsed from '../TechUsed'
import ProjectThumbnailGroup from '../ProjectThumbnailGroup'
import type {ProjectProps} from './Project.types'

const Project = (props: ProjectProps) => (
  <Li className='Project' id={`project-${props.id}`} background={props.project.background} padding='1rem'>
    <ProjectThumbnailGroup images={props.project.images} url={props.project.url} />
    <H3 underline padding='1.5rem 0 1rem'>
      <A href={props.project.url}>{props.project.title}</A>
    </H3>
    <P>{props.project.desc}</P>
    <TechUsed items={props.project.tech} />
    <ButtonAnchor href={props.project.url}>view website</ButtonAnchor>
  </Li>
)

export default Project
