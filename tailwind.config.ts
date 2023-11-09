import { get, set } from 'lodash';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';

const PROSE_WIDTH = '80ch';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{ts,tsx,mdx}'],
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				...generateColorDefinitions(),
				'@black': `rgb(var(--color-black) / <alpha-value>)`,
				'@white': `rgb(var(--color-white) / <alpha-value>)`,
				...generateAliasColorTokenDefinitions(),
			},
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
				...defaultTheme.screens,
			},
			typography: (theme: PluginAPI['theme']) => {
				return {
					DEFAULT: {
						css: {
							table: {
								'thead tr': {
									backgroundColor: theme('colors.gray.100'),

									'@media (prefers-color-scheme: dark)': {
										backgroundColor: theme('colors.gray.600'),
									},
								},
								'tbody tr': {
									'&:nth-child(even)': {
										backgroundColor: theme('colors.gray.50'),

										'@media (prefers-color-scheme: dark)': {
											backgroundColor: theme('colors.gray.700'),
										},
									},
								},
								td: {
									padding: theme('spacing.2'),
									border: '1px solid',
									borderColor: theme('colors.gray.200'),
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
		plugin(({ addVariant, addUtilities, addBase, theme }) => {
			addVariant('js-enabled', '[data-js_enabled="true"] &');
			addVariant('js-disabled', '[data-js_enabled="false"] &');

			addUtilities(generateHeadingTypographyCss(theme));
			addUtilities(generateBodyTypographyCss(theme));

			addBase(generateBaseColorTokenCss(theme));
			addBase(generateAliasColorTokenCss());
		}),
	],
};

function generateColorDefinitions() {
	const colorMap = getBaseColorMap();

	const colorDefinitions: Record<number, string> = {};
	for (const [hue, shades] of Object.entries(colorMap)) {
		// const color = {}
		for (const shade in shades) {
			set(
				colorDefinitions,
				[`@${hue}`, shade],
				`rgb(var(--color-${hue}-${shade}) / <alpha-value>)`
			);
		}
	}

	return colorDefinitions;
}

function getBaseColorMap(theme?: PluginAPI['theme']) {
	theme = theme ?? ((() => '') as PluginAPI['theme']);
	const colorMapping = {
		gray: {
			'50': theme('colors.gray.50'),
			'100': theme('colors.gray.100'),
			'200': theme('colors.gray.200'),
			'300': theme('colors.gray.300'),
			'400': theme('colors.gray.400'),
			'500': theme('colors.gray.500'),
			'600': theme('colors.gray.600'),
			'700': theme('colors.gray.700'),
			'800': theme('colors.gray.800'),
			'900': theme('colors.gray.900'),
			'950': theme('colors.gray.950'),
		},
		blue: {
			'50': theme('colors.blue.50'),
			'100': theme('colors.blue.100'),
			'200': theme('colors.blue.200'),
			'300': theme('colors.blue.300'),
			'400': theme('colors.blue.400'),
			'500': theme('colors.blue.500'),
			'600': theme('colors.blue.600'),
			'700': theme('colors.blue.700'),
			'800': theme('colors.blue.800'),
			'900': theme('colors.blue.900'),
			'950': theme('colors.blue.950'),
		},
		teal: {
			'50': theme('colors.teal.50'),
			'100': theme('colors.teal.100'),
			'200': theme('colors.teal.200'),
			'300': theme('colors.teal.300'),
			'400': theme('colors.teal.400'),
			'500': theme('colors.teal.500'),
			'600': theme('colors.teal.600'),
			'700': theme('colors.teal.700'),
			'800': theme('colors.teal.800'),
			'900': theme('colors.teal.900'),
			'950': theme('colors.teal.950'),
		},
		cyan: {
			'50': theme('colors.cyan.50'),
			'100': theme('colors.cyan.100'),
			'200': theme('colors.cyan.200'),
			'300': theme('colors.cyan.300'),
			'400': theme('colors.cyan.400'),
			'500': theme('colors.cyan.500'),
			'600': theme('colors.cyan.600'),
			'700': theme('colors.cyan.700'),
			'800': theme('colors.cyan.800'),
			'900': theme('colors.cyan.900'),
			'950': theme('colors.cyan.950'),
		},
		red: {
			'50': theme('colors.red.50'),
			'100': theme('colors.red.100'),
			'200': theme('colors.red.200'),
			'300': theme('colors.red.300'),
			'400': theme('colors.red.400'),
			'500': theme('colors.red.500'),
			'600': theme('colors.red.600'),
			'700': theme('colors.red.700'),
			'800': theme('colors.red.800'),
			'900': theme('colors.red.900'),
			'950': theme('colors.red.950'),
		},
		orange: {
			'50': theme('colors.orange.50'),
			'100': theme('colors.orange.100'),
			'200': theme('colors.orange.200'),
			'300': theme('colors.orange.300'),
			'400': theme('colors.orange.400'),
			'500': theme('colors.orange.500'),
			'600': theme('colors.orange.600'),
			'700': theme('colors.orange.700'),
			'800': theme('colors.orange.800'),
			'900': theme('colors.orange.900'),
			'950': theme('colors.orange.950'),
		},
		yellow: {
			'50': theme('colors.amber.50'),
			'100': theme('colors.amber.100'),
			'200': theme('colors.amber.200'),
			'300': theme('colors.amber.300'),
			'400': theme('colors.amber.400'),
			'500': theme('colors.amber.500'),
			'600': theme('colors.amber.600'),
			'700': theme('colors.amber.700'),
			'800': theme('colors.amber.800'),
			'900': theme('colors.amber.900'),
			'950': theme('colors.amber.950'),
		},
		green: {
			'50': theme('colors.emerald.50'),
			'100': theme('colors.emerald.100'),
			'200': theme('colors.emerald.200'),
			'300': theme('colors.emerald.300'),
			'400': theme('colors.emerald.400'),
			'500': theme('colors.emerald.500'),
			'600': theme('colors.emerald.600'),
			'700': theme('colors.emerald.700'),
			'800': theme('colors.emerald.800'),
			'900': theme('colors.emerald.900'),
			'950': theme('colors.emerald.950'),
		},
		purple: {
			'50': theme('colors.violet.50'),
			'100': theme('colors.violet.100'),
			'200': theme('colors.violet.200'),
			'300': theme('colors.violet.300'),
			'400': theme('colors.violet.400'),
			'500': theme('colors.violet.500'),
			'600': theme('colors.violet.600'),
			'700': theme('colors.violet.700'),
			'800': theme('colors.violet.800'),
			'900': theme('colors.violet.900'),
			'950': theme('colors.violet.950'),
		},
		pink: {
			'50': theme('colors.pink.50'),
			'100': theme('colors.pink.100'),
			'200': theme('colors.pink.200'),
			'300': theme('colors.pink.300'),
			'400': theme('colors.pink.400'),
			'500': theme('colors.pink.500'),
			'600': theme('colors.pink.600'),
			'700': theme('colors.pink.700'),
			'800': theme('colors.pink.800'),
			'900': theme('colors.pink.900'),
			'950': theme('colors.pink.950'),
		},
	};

	return colorMapping;
}

type AliasColorTokenDef = {
	'@bg-default': string;
	// TODO: even needed? or cut entirely??
	'@bg-muted': string;
	'@bg-emphasis': string;

	'@fg-default': string;
	'@fg-muted': string;
	'@fg-on-emphasis': string;

	'@border-default': string;
	'@border-muted': string;
};

function cssVarToTailwindColorDef(cssVar: string) {
	return `rgb(var(${cssVar}) / <alpha-value>)`;
}

function generateAliasColorTokenDefinitions(): AliasColorTokenDef {
	return {
		'@bg-default': cssVarToTailwindColorDef('--color-bg-default'),
		'@bg-muted': cssVarToTailwindColorDef('--color-bg-muted'),
		'@bg-emphasis': cssVarToTailwindColorDef('--color-bg-emphasis'),
		'@fg-default': cssVarToTailwindColorDef('--color-fg-default'),
		'@fg-muted': cssVarToTailwindColorDef('--color-fg-muted'),
		'@fg-on-emphasis': cssVarToTailwindColorDef('--color-fg-on-emphasis'),
		'@border-default': cssVarToTailwindColorDef('--color-border-default'),
		'@border-muted': cssVarToTailwindColorDef('--color-border-muted'),
	};
}

function generateAliasColorTokenCss() {
	const lightDefaultStyles: AliasColorTokenDef = {
		'@bg-default': 'var(--color-white)',
		'@bg-muted': 'var(--color-gray-100)',
		'@bg-emphasis': 'var(--color-black)',
		'@fg-default': 'var(--color-black)',
		'@fg-muted': 'var(--color-gray-700)',
		'@fg-on-emphasis': 'var(--color-white)',
		'@border-default': 'var(--color-black)',
		'@border-muted': 'var(--color-gray-600)',
	};

	const darkDefaultStyles: AliasColorTokenDef = {
		'@bg-default': 'var(--color-black)',
		'@bg-muted': 'var(--color-gray-900)',
		'@bg-emphasis': 'var(--color-white)',
		'@fg-default': 'var(--color-white)',
		'@fg-muted': 'var(--color-gray-300)',
		'@fg-on-emphasis': 'var(--color-black)',
		'@border-default': 'var(--color-white)',
		'@border-muted': 'var(--color-gray-400)',
	};

	const formatIntoVariables = (obj: AliasColorTokenDef) => {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key.replace(/^@/, '--color-'), value])
		);
	};

	return {
		':root': formatIntoVariables(lightDefaultStyles),
		'@media (prefers-color-scheme: dark)': {
			':root': formatIntoVariables(darkDefaultStyles),
		},
	};
}

const hexToRgb = (hex: string) => {
	const normalizedHex = hex.length === 4 ? hex + hex.slice(1) : hex;
	const r = parseInt(normalizedHex.slice(1, 3), 16);
	const g = parseInt(normalizedHex.slice(3, 5), 16);
	const b = parseInt(normalizedHex.slice(5, 7), 16);

	return [r, g, b].join(' ');
};

function generateBaseColorTokenCss(theme: PluginAPI['theme']) {
	const colorMapping = getBaseColorMap(theme);

	const variablesObject: Record<string, string> = {};
	for (const [hue, shades] of Object.entries(colorMapping)) {
		for (const [shade, value] of Object.entries(shades)) {
			if (!value) continue;
			variablesObject[`--color-${hue}-${shade}`] = hexToRgb(value as unknown as string);
		}
	}

	return {
		':root': {
			'--color-white': hexToRgb(colors.white),
			'--color-black': hexToRgb(colors.black),
			...variablesObject,
		},
	};
}

function generateHeadingTypographyCss(theme: PluginAPI['theme']) {
	const commonHeadingStyles = {
		fontFamily: theme('fontFamily.sans'),
		letterSpacing: theme('letterSpacing.tight'),
		lineHeight: theme('lineHeight.none'),
		fontWeight: theme('fontWeight.extrabold'),
	};

	const headings = {
		h1: {
			fontSize: theme('fontSize.5xl'),
		},
		h2: {
			fontSize: theme('fontSize.4xl'),
		},
		h3: {
			fontSize: theme('fontSize.2xl'),
		},
		h4: {
			fontSize: theme('fontSize.xl'),
		},
		h5: {
			fontSize: theme('fontSize.base'),
		},
		h6: {
			fontSize: theme('fontSize.sm'),
			fontWeight: theme('fontWeight.bold'),
		},
	};

	const headingClasses: Record<string, CSSRuleObject> = {};
	for (const [key, value] of Object.entries(headings)) {
		headingClasses[`.text-\\@${key}`] = { ...commonHeadingStyles, ...value } as CSSRuleObject;
	}

	return headingClasses;
}

function generateBodyTypographyCss(theme: PluginAPI['theme']) {
	const bodyStyles: Record<string, CSSRuleObject> = {
		large: {
			fontSize: theme('fontSize.xl'),
			lineHeight: theme('lineHeight.6'),
		},
		medium: {
			fontSize: theme('fontSize.base'),
			lineHeight: theme('lineHeight.6'),
		},
		small: {
			fontSize: theme('fontSize.sm'),
			lineHeight: theme('lineHeight.5'),
		},
		caption: {
			fontSize: theme('fontSize.xs'),
			lineHeight: theme('lineHeight.4'),
		},
	};

	return Object.fromEntries(
		Object.entries(bodyStyles).map(([key, value]) => {
			return [
				`.text-\\@${key}`,
				{
					fontFamily: theme('fontFamily.sans'),
					fontWeight: theme('fontWeight.normal'),
					...value,
				},
			] as [string, CSSRuleObject];
		})
	);
}
