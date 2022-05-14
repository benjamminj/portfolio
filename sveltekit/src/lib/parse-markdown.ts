import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import { Remarkable } from 'remarkable'

const languages = new Map()

const md = new Remarkable({
	highlight: (code, lang) => {
		if (!lang) return ''

		if (!languages.has(lang)) {
			languages.set(lang, true)
			loadLanguages([lang])
		}
		const highlighted = Prism.highlight(code, Prism.languages.javascript, 'javascript')

		return highlighted
	}
})

export const parseMarkdown = async (markdown: string) => {
	const parsed = await md.render(markdown)
	return parsed
}
