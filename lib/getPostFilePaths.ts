import fs from 'fs'
import { POSTS_BASE_PATH } from './constants'
import { slugifyPost } from './slugifyPost'

// Some files inside the writing directory are not actually posts.
// These files shouldn't be built into the list of posts.
// In the future it might be nice to tie these to an env variable so we can
// optionally add these files in.
const excludedFiles = ['markdown-test', 'index']

/**
 * Fetch a list of post files from the posts directory
 */
export const getPostFilePaths = () => {
  const postFiles = fs.readdirSync(POSTS_BASE_PATH)

  return postFiles.filter(filePath => {
    const isMarkdownFile = /.mdx?$/.test(filePath)

    const slug = slugifyPost(filePath)
    const isPost = excludedFiles.every(file => file !== slug)

    return isMarkdownFile && isPost
  })
}
