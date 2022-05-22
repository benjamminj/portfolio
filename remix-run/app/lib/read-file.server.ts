import fs from 'fs/promises'
import path from 'path'
;`${__dirname}/../app/content`

export const readFile = (filePath: string) => {
  return fs.readFile(
    path.join(__dirname, '../app/content/writing', filePath),
    'utf8'
  )
}
