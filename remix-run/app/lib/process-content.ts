import fm from 'front-matter'
import { parseMarkdown } from './parse-markdown'

// TODO: can we just roll this into `parseMarkdown`?
export const processContent = async (raw: string) => {
  const { body, attributes } = fm<Record<string, unknown>>(raw)

  const hast = await parseMarkdown(body)
  return {
    ...attributes,
    hast,
  }
}
