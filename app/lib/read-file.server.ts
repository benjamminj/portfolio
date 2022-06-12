export const readFile = async (filePath: string) => {
  // TODO: dev mode that dynamically reads the file straight off the filesystem??
  const { posts } = await import('~/generated/posts.generated.server')

  const index = `content/${filePath}` as keyof typeof posts
  return posts[index]
}
