import { POSTS_DIRECTORY_NAME } from './constants'

/** Transform a post's file path into a URL-friendly "slug" */
export const slugifyPost = (
  filePath: string,
  baseDirectory = POSTS_DIRECTORY_NAME
) => {
  const postsDirectoryPrefix = new RegExp(`^${baseDirectory}\/`)

  return filePath
    .replace(postsDirectoryPrefix, '')
    .replace(/\.mdx?$/, '')
    .replace(/\.tsx?$/, '')
}
