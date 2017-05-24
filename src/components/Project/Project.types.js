// @flow
import type {
  ProjectThumbnailGroupImages
} from '../ProjectThumbnailGroup/ProjectThumbnailGroup.types'

export type Project = {
  url: string,
  title: string,
  tech: string[],
  desc: string,
  images: ProjectThumbnailGroupImages,
  background: string
}

export type ProjectProps = {
  id: string,
  project: Project
}
