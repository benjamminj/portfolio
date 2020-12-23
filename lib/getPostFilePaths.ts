import fs, { promises } from 'fs'
import path from 'path'
import { POSTS_BASE_PATH } from './constants'
import { slugifyPost } from './slugifyPost'

// Some files inside the writing directory are not actually posts.
// These files shouldn't be built into the list of posts.
// In the future it might be nice to tie these to an env variable so we can
// optionally add these files in.
const excludedFiles = ['index']

const checkIfMarkdownFile = (filename: string) => /.mdx?$/.test(filename)

// Within a nested folder:
// - index === the folder path
// - .mdx gets built as a child of the "series"
const getNestedPostFilePath = (directory: string) => {
  const nestedFiles = fs.readdirSync(directory)
  const posts = []
  for (const file of nestedFiles) {
    if (!checkIfMarkdownFile(file)) continue
    posts.push([directory, file].join('/'))
  }

  return posts
}

/** Fetch a list of post files from the posts directory */
export const getPostFilePaths = (directory = POSTS_BASE_PATH) => {
  const postFiles = fs.readdirSync(directory, { withFileTypes: true })

  const posts = []

  for (const filePath of postFiles) {
    // If the file path is a directory it can contain multiple posts
    // so grab them all and push them all into the array
    if (filePath.isDirectory()) {
      const nestedPosts = getNestedPostFilePath(
        path.join(directory, filePath.name)
      )

      posts.push(...nestedPosts)
    }

    if (!checkIfMarkdownFile(filePath.name)) continue

    const slug = slugifyPost(filePath.name)
    const isExcludedPost = excludedFiles.some(file => file === slug)
    if (isExcludedPost) continue

    posts.push(filePath.name)
  }

  return posts
  // const postFilePaths = postFiles.filter(filePath => {
  //   if (filePath.isDirectory()) {
  //     const nestedPosts = getNestedPostFilePath(
  //       path.join(directory, filePath.name)
  //     )

  //     console.log('nested >>', nestedPosts)
  //   }

  //   const isMarkdownFile = /.mdx?$/.test(filePath.name)

  //   const slug = slugifyPost(filePath.name)
  //   const isPost = excludedFiles.every(file => file !== slug)

  //   return isMarkdownFile && isPost
  // })

  // return postFilePaths.map(path => path.name)
}
