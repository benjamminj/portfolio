import { getPostFilePaths } from './getPostFilePaths'
import { slugifyPost } from './slugifyPost'

// TODO: docssssss
export const getPostFileBySlug = (rawSlug: string | string[]) => {
  // TODO: commentzzzz
  const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug

  const postFiles = getPostFilePaths()

  const matchingPost = postFiles.find(
    filePath => slugifyPost(filePath) === slug
  )

  return matchingPost
}
