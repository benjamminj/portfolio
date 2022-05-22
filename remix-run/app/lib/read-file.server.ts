import fs from 'node:fs/promises'
import path from 'node:path'
;`${__dirname}/../content`

export const readFile = (filePath: string) => {
  return fs.readFile(
    path.join(__dirname, '../content/writing', filePath),
    'utf8'
  )
}
