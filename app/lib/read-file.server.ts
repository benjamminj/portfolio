import fs from 'fs/promises'
import path from 'path'

// Problem: Vercel doesn't allow you to use the filesystem to "read" files
//
// Solutions:
//
// 1. Import all markdown files straight from the filesystem.
//
// 2. Have a "prebuild" step that copies all markdown files to the build directory

export const readFile = async (filePath: string) => {
  // TODO: dev mode that dynamically reads the file straight off the filesystem??
  const { posts } = await import('~/generated/posts.generated.server')

  const index = `content/${filePath}` as keyof typeof posts
  return posts[index]
}
