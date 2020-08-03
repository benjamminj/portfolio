export interface PostFrontmatter {
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

export interface ParsedPost {
  frontmatter: PostFrontmatter
  body: string
}
