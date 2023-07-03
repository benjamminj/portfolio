const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const PROSE_WIDTH = '80ch';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx,mdx}'],
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		extend: {
			minWidth: {
				prose: PROSE_WIDTH,
			},
			animation: {
				fadein: 'fadein 100ms ease-in-out 200ms',
			},
			keyframes: {
				fadein: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
			maxWidth: {
				prose: PROSE_WIDTH,
			},
			typography: (theme) => {
				return {
					DEFAULT: {
						css: {
							table: {
								'thead tr': {
									backgroundColor: theme('colors.gray.300'),

									'@media (prefers-color-scheme: dark)': {
										backgroundColor: theme('colors.gray.600'),
									},
								},
								'tbody tr': {
									'&:nth-child(even)': {
										backgroundColor: theme('colors.gray.200'),

										'@media (prefers-color-scheme: dark)': {
											backgroundColor: theme('colors.gray.700'),
										},
									},
								},
								td: {
									padding: theme('spacing.2'),
								},
							},
							ol: {
								counterReset: 'ol-count',
								'& > li:before': {
									content: "counter(ol-count) '.'",
									counterIncrement: 'ol-count',
								},
							},
							li: {
								'& li:before': {
									content: '○',
								},
								'&::marker, ::marker': {
									display: 'none !important',
								},
							},
							ul: {
								'& > li:before': {
									content: "'●'",
									fontSize: '0.625rem',
									lineHeight: 2.5,
								},
							},
							// Code fences
							'pre code': {
								'--code-bg': 'transparent',
								'--code-fg': theme('colors.gray.900'),
								'--first-color': theme('colors.blue.600'),
								'--second-color': theme('colors.gray.500'),
								'--fourth-color': theme('colors.green.700'),
								'--third-color': theme('colors.pink.700'),

								backgroundColor: 'var(--code-bg)',
								color: 'var(--code-fg)',
								padding: 0,
								textAlign: 'left',
								whiteSpace: 'pre',
								overflowWrap: 'normal',
								wordBreak: 'normal',
								lineHeight: '1.5',
								wordSpacing: 'normal',

								'@media (prefers-color-scheme: dark)': {
									'--code-fg': theme('colors.gray.100'),
									'--first-color': theme('colors.indigo.300'),
									'--second-color': theme('colors.purple.300'),
									'--third-color': theme('colors.green.300'),
									'--fourth-color': theme('colors.yellow.200'),
								},
							},
							'pre code::-moz-selection, pre code ::-moz-selection': {
								textShadow: 'none',
								color: theme('colors.black'),
								background: theme('colors.white'),
							},
							'pre code::selection, pre code ::selection': {
								textShadow: 'none',
								color: theme('colors.black'),
								background: theme('colors.white'),
							},
							'@media print': {
								'pre code': {
									textShadow: 'none',
								},
							},
							'.token.comment, .token.prolog, .token.doctype, .token.cdata': {
								color: theme('colors.gray.400'),
							},
							'.token.punctuation': {
								color: 'var(--second-color)',
							},
							'.token.namespace': {
								opacity: 0.7,
							},
							'.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol':
								{
									color: 'inherit',
								},
							'.token.selector, .token.attr, .token.string, .token.char, .token.builtin': {
								color: 'var(--fourth-color)',
							},
							'.token.deleted': {
								color: theme('colors.red.700'),

								'@media (prefers-color-scheme: dark)': {
									color: theme('colors.red.400'),
								},
							},
							'.token.inserted': {
								color: theme('colors.green.700'),
								'@media (prefers-color-scheme: dark)': {
									color: theme('colors.green.500'),
								},
							},
							".token.operator, .token.entity, .token.url, [class='.language-css'] .token.string, .style .token.string":
								{
									color: 'var(--first-color)',
								},
							'.token.atrule, .token.attr-value, .token.keyword': {
								color: 'var(--first-color)',
							},
							'.token.function': {
								color: 'var(--third-color)',
							},
							'.token.regex, .token.important, .token.variable': {
								color: 'var(--second-color)',
							},
							'.token.important, .token.bold': {
								fontWeight: 700,
							},
							'.token.italic': {
								fontStyle: 'italic',
							},
							'.token.entity': {
								cursor: 'help',
							},
						},
					},
				};
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(({ addVariant }) => {
			addVariant('js-enabled', '[data-js_enabled="true"] &');
			addVariant('js-disabled', '[data-js_enabled="false"] &');
		}),
	],
};
