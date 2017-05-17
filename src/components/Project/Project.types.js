// @flow
import type {
  ProjectThumbnailGroupImages
} from '../ProjectThumbnailGroup/ProjectThumbnailGroup.types'

export type ProjectProps = {
  id: string,
  project: {
    url: string,
    title: string,
    tech: string[],
    desc: string,
    images: ProjectThumbnailGroupImages,
    background: string
  }
}
