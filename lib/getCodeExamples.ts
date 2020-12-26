import fs, { promises } from 'fs'
import path from 'path'
import { POSTS_BASE_PATH } from './constants'

export type CodeExamples = Record<string, string>

export const getCodeExamples = async (
  filePath: string
): Promise<CodeExamples> => {
  const splitPath = filePath.split('/')

  // If the file path is not nested within a folder, then we
  // can assume that there are no examples.
  if (splitPath.length === 1) {
    return {}
  }

  // //
  // // TODO: will this work for `index` paths where the file
  // // is not part of the slug?
  // if (typeof slug === 'string' || slug.length === 1) {
  //   return {}
  // }

  // If the URL of the post does contain more than one section, the
  // first portion of the URL is the folder containing the post.
  const [folder] = splitPath

  // TODO: inject the path for testing pruposes??
  const files = fs.readdirSync(POSTS_BASE_PATH + folder)

  // For now, the code examples are assumed to be any file within the post's
  // folder that _isn't_ a markdown file.
  const exampleFiles = files.filter(fileName => !fileName.match(/.mdx?$/))

  const examples = {}

  // Go thru the examples and load each one as raw text.
  //
  // TODO: may be able to optimize by using an async load and then awaiting them
  // with Promise.all.
  for (const example of exampleFiles) {
    const filePath = path.join(POSTS_BASE_PATH, folder, example)
    examples[example] = await promises.readFile(filePath, 'utf-8')
  }

  return examples
}
