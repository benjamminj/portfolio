import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import { Remarkable } from 'remarkable'

const languages = new Map()

const md = new Remarkable({
	highlight: (code, lang) => {
		if (!lang) return ''

		// TODO: fix issue w/ TSX parsing for vercel deploys...
		if (!languages.has(lang)) {
			if (lang === 'tsx') {
				loadLanguages(['jsx', 'javascript', 'typescript'])
			}

			languages.set(lang, true)
			loadLanguages([lang])
		}

		const highlighted = Prism.highlight(code, Prism.languages[lang], lang)

		return highlighted
	}
})

/**
 * Responsible for taking in a markdown string and returning the resulting HTML.
 *
 * A couple things to note:
 * - Code blocks will be highlighted using PrismJS
 * - At the current time, frontmatter is not extracted, so that needs to be done separately.
 */
export const parseMarkdown = async (markdown: string) => {
	const parsed = await md.render(markdown)
	return parsed
}
