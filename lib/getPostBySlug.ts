import fm from 'front-matter'
import fs from 'fs'
import path from 'path'
import { POSTS_BASE_PATH } from './constants'
import { getPostFilePaths } from './getPostFilePaths'
import { slugifyPost } from './slugifyPost'
import { ParsedPost, PostFrontmatter } from './types'

/**
 * Given a slug, find the post that matches and return its metadata & content
 */
export const getPostBySlug = (slug: string): ParsedPost => {
  const postFiles = getPostFilePaths()

  const matchingPost = postFiles.find(
    filePath => slugifyPost(filePath) === slug
  )

  if (!matchingPost) {
    throw new Error(`No file found for "${slug}"`)
  }

  const filePath = path.join(POSTS_BASE_PATH, matchingPost)
  const source = fs.readFileSync(filePath, 'utf8')

  const { attributes: frontmatter, body } = fm<PostFrontmatter>(source)

  return { frontmatter, body }
}
