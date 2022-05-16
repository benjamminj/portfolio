import vercel from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'

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
			entries: ['*']
		},
		routes: (filepath) => {
			if (filepath.includes('_next')) return true
			return !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)
		}
	}
}

export default config
