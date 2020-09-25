import { POSTS_DIRECTORY_NAME } from './constants'

/** Transform a post's file path into a URL-friendly "slug" */
export const slugifyPost = (filePath: string) => {
  const postsDirectoryPrefix = new RegExp(`^${POSTS_DIRECTORY_NAME}\/`)

  return filePath
    .replace(postsDirectoryPrefix, '')
    .replace(/\.mdx?$/, '')
    .replace(/\.tsx?$/, '')
}
