import fs from 'fs-extra'
import path from 'node:path'

type FilePath = string | string[] | FilePath[]

const readContentDir = async () => {
  const getFiles = async (dir: string) => {
    const subdirs = await fs.readdir(dir)
    const promises: Promise<FilePath>[] = subdirs.map(async (subdir) => {
      const resolved = path.resolve(dir, subdir)
      const stats = await fs.stat(resolved)
      return stats.isDirectory() ? getFiles(resolved) : resolved
    })
    const files: FilePath[] = await Promise.all(promises)
    return files
  }

  return getFiles('./content')
}

const truncateContentPaths = (paths: FilePath[]) => {
  const truncatePath = (p: string) => p.split('/content/')[1]

  const mapped: FilePath[] = paths.map((group: FilePath) => {
    if (Array.isArray(group)) {
      return truncateContentPaths(group)
    }
    return truncatePath(group)
  })

  return mapped
}

const readContent = (filePath: string) => {
  return fs.readFile(`./content/${filePath}`, 'utf8')
}

const main = async () => {
  // Step #1: Read all of the posts into memory.
  const files = await readContentDir()
  const truncated = truncateContentPaths(files)
  const flattened = truncated.flat().flat() as string[]

  const promises: Promise<[string, string]>[] = flattened
    .filter((filePath) => /\.md(x)?$/.test(filePath))
    .map(async (filePath: string) => {
      const content = await readContent(filePath)
      return [`content/${filePath}`, content] as [string, string]
    })

  const content = await Promise.all(promises)

  // Step #2: Write all of the posts to a generated file inside of `app`
  let objectBody = ''

  for (const [filePath, post] of content) {
    // Since this is inside a template string to preserve whitespace, we need to
    // escape the backticks and interpolations.
    const templateSafePost = post
      .replace(/\\`/g, '\\\\`')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${')
    objectBody += `"${filePath.replace(
      '"',
      '\\"'
    )}": \`${templateSafePost}\`,\n`
  }

  const output = `export const posts = {
    ${objectBody}
  }`

  await fs.ensureFile('./app/generated/posts.generated.server.ts')
  // TODO: need to create file if it doesn't exist....
  await fs.writeFile('./app/generated/posts.generated.server.ts', output)
}

main()
