import fm from 'front-matter'
import fs from 'fs'
import path from 'path'

interface PostFrontmatter {
  title: string
  description?: string
  draft?: boolean
  date: Date
  image?: {
    url: string
    alt: string
  }
  link?: string
  publisher?: string
}

interface ParsedPost {
  frontmatter: PostFrontmatter
  body: string
}

/**
 * Transform a post's file path into a URL-friendly "slug"
 */
const slugifyPost = (filePath: string) => {
  return filePath
    .replace(/^src\/posts/, '')
    .replace(/\.mdx?$/, '')
    .replace(/\.tsx?$/, '')
}

/**
 * Given a slug, find the post that matches and return its metadata & content
 */
export const getPostBySlug = (slug: string): ParsedPost => {
  const basePath = './src/posts/'
  const postFiles = fs.readdirSync(basePath)

  const matchingPost = postFiles.find(
    filePath => slugifyPost(filePath) === slug
  )

  if (!matchingPost) {
    throw new Error(`No file found for "${matchingPost}"`)
  }

  const filePath = path.join(basePath, matchingPost)
  const source = fs.readFileSync(filePath, 'utf8')

  const { attributes: frontmatter, body } = fm<PostFrontmatter>(source)

  return { frontmatter, body }
}
