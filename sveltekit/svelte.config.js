import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import fs from 'fs'
import fm from 'front-matter'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * @todo
 * This should be temporary to prerender the tag pages (and any other dynamic pages)
 * while in migration from Next.js to Sveltekit. Once all pages have been migrated to
 * Sveltekit, we should be able to remove this function and re-enable the crawler.
 */
const getPrerenderEntries = () => {
	const __filename = fileURLToPath(import.meta.url)
	const writingDir = path.resolve(path.dirname(__filename), '..', `content/writing`)
	const tags = {}
	fs.readdirSync(writingDir).map((file) => {
		const contents = fs.readFileSync(path.resolve(writingDir, file), 'utf8')
		const { attributes } = fm(contents)
		if (attributes.tags) {
			attributes.tags.forEach((tag) => {
				tags[tag] = tag
			})
		}
	})
	const tagEntries = Object.keys(tags).map((t) => `/tags/${t}`)

	return ['*', ...tagEntries]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		adapter: vercel(),
		prerender: {
			// For now, prevent the crawler to avoid blowing up the routes that are
			// served by the Next.js app. After we have migrated the deeper routes and
			// crawling is safe, we can remove this.
			crawl: false,
			entries: getPrerenderEntries()
		},
		routes: (filepath) => {
			if (filepath.includes('_next')) return true
			return !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)
		}
	}
}

export default config
