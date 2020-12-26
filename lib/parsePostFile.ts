import fm from 'front-matter'
import fs from 'fs'
import path from 'path'
import { POSTS_BASE_PATH } from './constants'
import { ParsedPost, PostFrontmatter } from './types'

/**
 * Given a file path with a blog post, load the file and parse it into markdown.
 */
export const parsePostFile = (
  filePath: string,
  directory = POSTS_BASE_PATH
): ParsedPost => {
  const fullPath = path.join(directory, filePath)
  const source = fs.readFileSync(fullPath, 'utf8')

  const { attributes: frontmatter, body } = fm<PostFrontmatter>(source)

  return { frontmatter, body }
}
