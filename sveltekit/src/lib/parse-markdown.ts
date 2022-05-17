import Prism from 'prismjs'
import components from 'prismjs/components.json'
// import components from 'prismjs/plugins/autoloader'
// import loadLanguages from 'prismjs/components/index.js'
import { Remarkable } from 'remarkable'

const languages = new Map()

import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-tsx.js'
// loadLanguages(['markup'])

// const loadLanguages = async (lang: string) => {
// 	if (languages.has(lang)) {
// 		return
// 	}

// 	const langFile = await import(`prismjs/components/prism-${lang}.js`)
// 	// Prism.languages[lang] = langFile
// 	languages.set(lang, langFile)
// }
// import(`prismjs/components/prism-javascript.js`)
// import(`prismjs/components/prism-markup.js`)
// import(`prismjs/components/prism-jsx.js`)
// Prism.languages.extend()
const md = new Remarkable({
	highlight: (code, lang) => {
		// return ''
		// if (!languages.has(lang)) {
		// 	// languages.set(lang, Prism.languages[lang])
		// }
		if (!lang) return ''

		if (!Prism.languages[lang]) return ''

		const highlighted = Prism.highlight(code, Prism.languages[lang], lang)
		return highlighted
	}
	// highlight: (code, lang) => {
	// 	if (!lang) return ''
	// 	// TODO: fix issue w/ TSX parsing for vercel deploys...
	// 	if (!languages.has(lang)) {
	// 		if (lang === 'tsx') {
	// 			// loadLanguages(['jsx', 'javascript', 'typescript'])
	// 		}
	// 		import(`prismjs/components/prism-${lang}.js`)
	// 		languages.set(lang, true)
	// 		// loadLanguages([lang])
	// 	}
	// }
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
