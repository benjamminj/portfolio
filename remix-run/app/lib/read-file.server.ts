import fs from 'node:fs/promises'
import path from 'node:path'

export const readFile = (filePath: string) => {
  return fs.readFile(path.join(__dirname, filePath), 'utf8')
}
