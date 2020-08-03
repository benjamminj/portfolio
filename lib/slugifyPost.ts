/**
 * Transform a post's file path into a URL-friendly "slug"
 */
export const slugifyPost = (filePath: string) => {
  return filePath
    .replace(/^src\/posts\//, '')
    .replace(/\.mdx?$/, '')
    .replace(/\.tsx?$/, '')
}
