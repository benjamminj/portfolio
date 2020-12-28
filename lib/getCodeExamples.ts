import fs, { promises } from 'fs'
import path from 'path'
import { POSTS_BASE_PATH } from './constants'

export type CodeExamples = Record<string, string>

/**
 * Take a post and load all of its related code examples.
 *
 * For a code example to be considered "related" to a file, it must meet the
 * follow criteria:
 *
 * - The post must be in a nested folder within the larger posts
 *   directory (i.e. `writing/nested/test.md` instead of `writing/test.md`)
 * - The code example must _not_ be a `.md` or `.mdx` file. Nested Markdown files
 *   are considered to be additional posts in a series.
 * - The code example must be located in the same nested directory as the
 *   Markdown post.
 *
 * Finally, this function is only focused on finding the example files and loading
 * their text. Things like syntax highlighting, importing components, etc. can be
 * done as separate, chained operations.
 */
export const getCodeExamples = async (
  filePath: string,
  directory = POSTS_BASE_PATH
): Promise<CodeExamples> => {
  const splitPath = filePath.split('/')

  // If the file path is not nested within a folder, then we
  // can assume that there are no examples.
  if (splitPath.length === 1) {
    return {}
  }

  // If the URL of the post does contain more than one section, the
  // first portion of the URL is the folder containing the post.
  const [folder] = splitPath
  const files = fs.readdirSync(directory + folder)

  // For now, the code examples are assumed to be any file within the post's
  // folder that _isn't_ a markdown file.
  const exampleFiles = files.filter(fileName => !fileName.match(/.mdx?$/))

  const examples = {}

  // Go thru the examples and load each one as raw text.
  for (const example of exampleFiles) {
    const filePath = path.join(POSTS_BASE_PATH, folder, example)
    examples[example] = await promises.readFile(filePath, 'utf-8')
  }

  return examples
}
