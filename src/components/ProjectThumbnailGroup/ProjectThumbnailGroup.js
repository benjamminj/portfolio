import React from 'react'
import styled from 'styled-components'
import rgba from 'hex-rgba'

import {COLORS, Z_LEVELS, mixins} from 'src/theme'
import type {ProjectThumbnailGroupProps} from './ProjectThumbnailGroup.types'

const ImagesContainer = styled.div`
  position: relative
  height: 300px
  width: 100%
`

// TODO: refactor both of these into more reusable components
const ThumbNailBase = styled.img`
  border-radius: 2px
  box-shadow: 0.25rem 0.25rem 0.75rem ${rgba(COLORS.black, 80)}
  position: absolute
  width: ${props => props.width}
  height: ${props => props.height}
  max-width: ${props => props.maxWidth || 'none'}
  object-fit: cover

  ${props => props.zIndex ? `z-index: ${props.zIndex}` : ''}
  ${mixins.animations.transitionShort('box-shadow')}
  ${mixins.layout.positionEdges}

  ${mixins.pseudo.hover`
    box-shadow: 0.25rem 0.25rem 1rem ${rgba(COLORS.black, 90)}
  `}
`

const DesktopImg = (props: ProjectThumbnailGroupProps) => (
  <a href={props.url}>
    <ThumbNailBase
      width='150%'
      height='90%'
      right='3rem'
      bottom='10%'
      maxWidth='30rem'
      {...props}
    />
  </a>
)

const MobileImg = (props: ProjectThumbnailGroupProps) => (
  <a href={props.url}>
    <ThumbNailBase
      width='9rem'
      height='16rem'
      right='0'
      bottom='0'
      zIndex={Z_LEVELS.middle}
      {...props}
    />
  </a>
)

const ProjectThumbnailGroup = (props: ProjectThumbnailGroupProps) => (
  <ImagesContainer className='Project-Thumbnail-Group'>
    <DesktopImg url={props.url} src={props.images.desktop} alt='Desktop Preview' aria-hidden='true' />
    <MobileImg url={props.url} src={props.images.mobile} alt='Mobile Preview' aria-hidden='true' />
  </ImagesContainer>
)

export default ProjectThumbnailGroup
