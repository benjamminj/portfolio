import { POSTS_DIRECTORY_NAME } from './constants'

/**
 * Transform a post's file path into a URL-friendly "slug"
 *
 * For posts within nested folders a trailing `index` file will resolve to
 * the folder name, anything else will be slugified along with the folder name.
 */
export const slugifyPost = (
  filePath: string,
  baseDirectory = POSTS_DIRECTORY_NAME
) => {
  const postsDirectoryPrefix = new RegExp(`^${baseDirectory}\/`)

  const postFile = filePath.replace(postsDirectoryPrefix, '')
  let slug = postFile.replace(/\.(mdx?|tsx?)$/, '')

  // If the file is `index.md(x)` then we remove that portion from the URL.
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '')
  }

  return slug
}
