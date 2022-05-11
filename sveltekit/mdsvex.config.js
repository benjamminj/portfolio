import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import path from 'path'

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	layout: path.join('./src/mdsvexlayout.svelte'),

	remarkPlugins: [],
	rehypePlugins: []
})

export default config
