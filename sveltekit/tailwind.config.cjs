const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens
		},
		extend: {
			maxWidth: {
				prose: '80ch'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
