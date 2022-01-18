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

  const { attributes, body } = fm<PostFrontmatter>(source)

  const frontmatter = {
    ...attributes,
    // Date objects don't parse to JSON safely, so convert them into their equivalent
    // strings in ISO 8601 format.
    date: attributes.date.toISOString(),
    lastUpdated: attributes.lastUpdated?.toISOString() ?? null,
  }
  return { frontmatter, body }
}
