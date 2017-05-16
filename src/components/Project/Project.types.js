// @flow
import type {
  ProjectThumbnailGroupImages
} from '../ProjectThumbnailGroup/ProjectThumbnailGroup.types'

export type ProjectProps = {
  id: string,
  project: {
    title: string,
    images: ProjectThumbnailGroupImages
  }
}
