import { getPostFileBySlug } from './getPostFileBySlug'
import { parsePostFile } from './parsePostFile'
import { ParsedPost } from './types'

/**
 * Given a slug, find the post that matches and return its metadata & content
 */
export const getPostBySlug = (slug: string): ParsedPost => {
  const matchingPost = getPostFileBySlug(slug)
  return parsePostFile(matchingPost)
}
