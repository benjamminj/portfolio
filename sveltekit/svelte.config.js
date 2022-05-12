import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
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
		routes: (filepath) => {
			if (filepath.includes('_next')) return true
			return !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)
		}
	}
}

export default config