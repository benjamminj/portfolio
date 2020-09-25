/**
 * All of the possible metadata that can possibly in a article's frontmatter.
 */
export interface PostFrontmatter {
  /** The title of the post. */
  title: string
  /** A brief description of the post for social media and for previews. */
  description?: string
  /** Whether the post is a work in progress. */
  draft?: boolean
  /** The date that the post was first published. */
  date: Date
  /**
   * The date the article was most recently updated.
   *
   * In the future this could potentially be automated (for example, if the
   * content was hosted in a separate repository).
   */
  lastUpdated?: Date
  /** Banner image for the post. */
  image?: {
    /** Path to the full high-fidelity image resource */
    url: string
    /** Alt text for the banner image */
    alt: string
  }
  /**
   * If the post was externally published, this will contain the link to the original
   * article. For these posts, the actual post body will just be a summary of the
   * originally published post.
   */
  link?: string
  /**
   * If the post was published in an external publication, this will contain the
   * name of the publisher.
   */
  publisher?: string
  /** List of topics that the post has been tagged with */
  tags?: string[]
}

export interface ParsedPost {
  frontmatter: PostFrontmatter
  body: string
}
