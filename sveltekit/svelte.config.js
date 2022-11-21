import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

// Remove whitespace between html elements, Svelte does not do this by default
// although many other frameworks do.
//
// https://github.com/sveltejs/svelte/issues/189
const htmlWhitespaceRegexes = [
	/(>)[\s]*([<{])/g,
	/({[/:][a-z]+})[\s]*([<{])/g,
	/({[#:][a-z]+ .+?})[\s]*([<{])/g,
	/([>}])[\s]+(<|{[/#:][a-z][^}]*})/g
];

const tagsReplace = '$1$2';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			replace: [htmlWhitespaceRegexes.map((regex) => [regex, tagsReplace])]
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
