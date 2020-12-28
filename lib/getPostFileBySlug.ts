import { getPostFilePaths } from './getPostFilePaths'
import { slugifyPost } from './slugifyPost'

/**
 * Given a post's URL paramters, find the file path where the post is located.
 */
export const getPostFileBySlug = (
  rawSlug: string | string[],
  files = getPostFilePaths()
) => {
  // Sometimes the slug coming from the URL parameters can be an array if the
  // post is nested within another folder. We can construct the full "slug"
  // by joining these array parameters.
  const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug

  const matchingPost = files.find(filePath => slugifyPost(filePath) === slug)

  if (!matchingPost) {
    throw new Error(`No file found for "${slug}"`)
  }

  return matchingPost
}
