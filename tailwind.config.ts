import { set } from "lodash";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import type { CSSRuleObject, PluginAPI } from "tailwindcss/types/config";

const PROSE_WIDTH = "80ch";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{ts,tsx,mdx}"],
	theme: {
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				...generateColorDefinitions(),
				"LEGACY-black": "rgb(var(--color-black) / <alpha-value>)",
				"LEGACY-white": "rgb(var(--color-white) / <alpha-value>)",
				...generateAliasColorTokenDefinitions(),
			},
			minWidth: {
				prose: PROSE_WIDTH,
			},
			animation: {
				fadein: "fadein 100ms ease-in-out 200ms",
			},
			keyframes: {
				fadein: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
			},
			maxWidth: {
				prose: PROSE_WIDTH,
				...defaultTheme.screens,
			},
			typography: (theme: PluginAPI["theme"]) => {
				return {
					DEFAULT: {
						css: {
							table: {
								"thead tr": {
									backgroundColor: theme("colors.gray.100"),

									"@media (prefers-color-scheme: dark)": {
										backgroundColor: theme("colors.gray.600"),
									},
								},
								"tbody tr": {
									"&:nth-child(even)": {
										backgroundColor: theme("colors.gray.50"),

										"@media (prefers-color-scheme: dark)": {
											backgroundColor: theme("colors.gray.700"),
										},
									},
								},
								td: {
									padding: theme("spacing.2"),
									border: "1px solid",
									borderColor: theme("colors.gray.200"),
								},
							},
							ol: {
								counterReset: "ol-count",
								"& > li:before": {
									content: "counter(ol-count) '.'",
									counterIncrement: "ol-count",
								},
							},
							li: {
								"& li:before": {
									content: "○",
								},
								"&::marker, ::marker": {
									display: "none !important",
								},
							},
							ul: {
								"& > li:before": {
									content: "'●'",
									fontSize: "0.625rem",
									lineHeight: 2.5,
								},
							},
							// Code fences
							"pre code": {
								"--code-bg": "transparent",
								"--code-fg": theme("colors.gray.900"),
								"--first-color": theme("colors.blue.600"),
								"--second-color": theme("colors.gray.500"),
								"--fourth-color": theme("colors.green.700"),
								"--third-color": theme("colors.pink.700"),

								backgroundColor: "var(--code-bg)",
								color: "var(--code-fg)",
								padding: 0,
								textAlign: "left",
								whiteSpace: "pre",
								overflowWrap: "normal",
								wordBreak: "normal",
								lineHeight: "1.5",
								wordSpacing: "normal",

								"@media (prefers-color-scheme: dark)": {
									"--code-fg": theme("colors.gray.100"),
									"--first-color": theme("colors.indigo.300"),
									"--second-color": theme("colors.purple.300"),
									"--third-color": theme("colors.green.300"),
									"--fourth-color": theme("colors.yellow.200"),
								},
							},
							"pre code::-moz-selection, pre code ::-moz-selection": {
								textShadow: "none",
								color: theme("colors.black"),
								background: theme("colors.white"),
							},
							"pre code::selection, pre code ::selection": {
								textShadow: "none",
								color: theme("colors.black"),
								background: theme("colors.white"),
							},
							"@media print": {
								"pre code": {
									textShadow: "none",
								},
							},
							".token.comment, .token.prolog, .token.doctype, .token.cdata": {
								color: theme("colors.gray.400"),
							},
							".token.punctuation": {
								color: "var(--second-color)",
							},
							".token.namespace": {
								opacity: 0.7,
							},
							".token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol":
								{
									color: "inherit",
								},
							".token.selector, .token.attr, .token.string, .token.char, .token.builtin":
								{
									color: "var(--fourth-color)",
								},
							".token.deleted": {
								color: theme("colors.red.700"),

								"@media (prefers-color-scheme: dark)": {
									color: theme("colors.red.400"),
								},
							},
							".token.inserted": {
								color: theme("colors.green.700"),
								"@media (prefers-color-scheme: dark)": {
									color: theme("colors.green.500"),
								},
							},
							".token.operator, .token.entity, .token.url, [class='.language-css'] .token.string, .style .token.string":
								{
									color: "var(--first-color)",
								},
							".token.atrule, .token.attr-value, .token.keyword": {
								color: "var(--first-color)",
							},
							".token.function": {
								color: "var(--third-color)",
							},
							".token.regex, .token.important, .token.variable": {
								color: "var(--second-color)",
							},
							".token.important, .token.bold": {
								fontWeight: 700,
							},
							".token.italic": {
								fontStyle: "italic",
							},
							".token.entity": {
								cursor: "help",
							},
						},
					},
				};
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		plugin(({ addVariant, addUtilities, addBase, theme }) => {
			addVariant("js-enabled", '[data-js_enabled="true"] &');
			addVariant("js-disabled", '[data-js_enabled="false"] &');

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
				[`LEGACY-${hue}`, shade],
				`rgb(var(--color-${hue}-${shade}) / <alpha-value>)`,
			);
		}
	}

	return colorDefinitions;
}

function getBaseColorMap(theme?: PluginAPI["theme"]) {
	const _theme = theme ?? ((() => "") as PluginAPI["theme"]);
	const colorMapping = {
		gray: {
			"50": _theme("colors.zinc.50"),
			"100": _theme("colors.zinc.100"),
			"200": _theme("colors.zinc.200"),
			"300": _theme("colors.zinc.300"),
			"400": _theme("colors.zinc.400"),
			"500": _theme("colors.zinc.500"),
			"600": _theme("colors.zinc.600"),
			"700": _theme("colors.zinc.700"),
			"800": _theme("colors.zinc.800"),
			"900": _theme("colors.zinc.900"),
			"950": _theme("colors.zinc.950"),
		},
		blue: {
			"50": _theme("colors.blue.50"),
			"100": _theme("colors.blue.100"),
			"200": _theme("colors.blue.200"),
			"300": _theme("colors.blue.300"),
			"400": _theme("colors.blue.400"),
			"500": _theme("colors.blue.500"),
			"600": _theme("colors.blue.600"),
			"700": _theme("colors.blue.700"),
			"800": _theme("colors.blue.800"),
			"900": _theme("colors.blue.900"),
			"950": _theme("colors.blue.950"),
		},
		teal: {
			"50": _theme("colors.teal.50"),
			"100": _theme("colors.teal.100"),
			"200": _theme("colors.teal.200"),
			"300": _theme("colors.teal.300"),
			"400": _theme("colors.teal.400"),
			"500": _theme("colors.teal.500"),
			"600": _theme("colors.teal.600"),
			"700": _theme("colors.teal.700"),
			"800": _theme("colors.teal.800"),
			"900": _theme("colors.teal.900"),
			"950": _theme("colors.teal.950"),
		},
		cyan: {
			"50": _theme("colors.cyan.50"),
			"100": _theme("colors.cyan.100"),
			"200": _theme("colors.cyan.200"),
			"300": _theme("colors.cyan.300"),
			"400": _theme("colors.cyan.400"),
			"500": _theme("colors.cyan.500"),
			"600": _theme("colors.cyan.600"),
			"700": _theme("colors.cyan.700"),
			"800": _theme("colors.cyan.800"),
			"900": _theme("colors.cyan.900"),
			"950": _theme("colors.cyan.950"),
		},
		red: {
			"50": _theme("colors.red.50"),
			"100": _theme("colors.red.100"),
			"200": _theme("colors.red.200"),
			"300": _theme("colors.red.300"),
			"400": _theme("colors.red.400"),
			"500": _theme("colors.red.500"),
			"600": _theme("colors.red.600"),
			"700": _theme("colors.red.700"),
			"800": _theme("colors.red.800"),
			"900": _theme("colors.red.900"),
			"950": _theme("colors.red.950"),
		},
		orange: {
			"50": _theme("colors.orange.50"),
			"100": _theme("colors.orange.100"),
			"200": _theme("colors.orange.200"),
			"300": _theme("colors.orange.300"),
			"400": _theme("colors.orange.400"),
			"500": _theme("colors.orange.500"),
			"600": _theme("colors.orange.600"),
			"700": _theme("colors.orange.700"),
			"800": _theme("colors.orange.800"),
			"900": _theme("colors.orange.900"),
			"950": _theme("colors.orange.950"),
		},
		yellow: {
			"50": _theme("colors.amber.50"),
			"100": _theme("colors.amber.100"),
			"200": _theme("colors.amber.200"),
			"300": _theme("colors.amber.300"),
			"400": _theme("colors.amber.400"),
			"500": _theme("colors.amber.500"),
			"600": _theme("colors.amber.600"),
			"700": _theme("colors.amber.700"),
			"800": _theme("colors.amber.800"),
			"900": _theme("colors.amber.900"),
			"950": _theme("colors.amber.950"),
		},
		green: {
			"50": _theme("colors.emerald.50"),
			"100": _theme("colors.emerald.100"),
			"200": _theme("colors.emerald.200"),
			"300": _theme("colors.emerald.300"),
			"400": _theme("colors.emerald.400"),
			"500": _theme("colors.emerald.500"),
			"600": _theme("colors.emerald.600"),
			"700": _theme("colors.emerald.700"),
			"800": _theme("colors.emerald.800"),
			"900": _theme("colors.emerald.900"),
			"950": _theme("colors.emerald.950"),
		},
		purple: {
			"50": _theme("colors.violet.50"),
			"100": _theme("colors.violet.100"),
			"200": _theme("colors.violet.200"),
			"300": _theme("colors.violet.300"),
			"400": _theme("colors.violet.400"),
			"500": _theme("colors.violet.500"),
			"600": _theme("colors.violet.600"),
			"700": _theme("colors.violet.700"),
			"800": _theme("colors.violet.800"),
			"900": _theme("colors.violet.900"),
			"950": _theme("colors.violet.950"),
		},
		pink: {
			"50": _theme("colors.pink.50"),
			"100": _theme("colors.pink.100"),
			"200": _theme("colors.pink.200"),
			"300": _theme("colors.pink.300"),
			"400": _theme("colors.pink.400"),
			"500": _theme("colors.pink.500"),
			"600": _theme("colors.pink.600"),
			"700": _theme("colors.pink.700"),
			"800": _theme("colors.pink.800"),
			"900": _theme("colors.pink.900"),
			"950": _theme("colors.pink.950"),
		},
	};

	return colorMapping;
}

type AliasColorTokenDef = {
	"LEGACY-bg-default": string;
	"LEGACY-bg-muted": string;
	"LEGACY-bg-emphasis": string;
	"LEGACY-fg-default": string;
	"LEGACY-fg-muted": string;
	"LEGACY-fg-on-emphasis": string;
	"LEGACY-border-default": string;
	"LEGACY-border-muted": string;
};

function cssVarToTailwindColorDef(cssVar: string) {
	return `rgb(var(${cssVar}) / <alpha-value>)`;
}

function generateAliasColorTokenDefinitions(): AliasColorTokenDef {
	return {
		"LEGACY-bg-default": cssVarToTailwindColorDef("--color-bg-default"),
		"LEGACY-bg-muted": cssVarToTailwindColorDef("--color-bg-muted"),
		"LEGACY-bg-emphasis": cssVarToTailwindColorDef("--color-bg-emphasis"),
		"LEGACY-fg-default": cssVarToTailwindColorDef("--color-fg-default"),
		"LEGACY-fg-muted": cssVarToTailwindColorDef("--color-fg-muted"),
		"LEGACY-fg-on-emphasis": cssVarToTailwindColorDef("--color-fg-on-emphasis"),
		"LEGACY-border-default": cssVarToTailwindColorDef("--color-border-default"),
		"LEGACY-border-muted": cssVarToTailwindColorDef("--color-border-muted"),
	};
}

function generateAliasColorTokenCss() {
	const lightDefaultStyles: AliasColorTokenDef = {
		"LEGACY-bg-default": "var(--color-white)",
		"LEGACY-bg-muted": "var(--color-gray-100)",
		"LEGACY-bg-emphasis": "var(--color-black)",
		"LEGACY-fg-default": "var(--color-black)",
		"LEGACY-fg-muted": "var(--color-gray-600)",
		"LEGACY-fg-on-emphasis": "var(--color-white)",
		"LEGACY-border-default": "var(--color-black)",
		"LEGACY-border-muted": "var(--color-gray-600)",
	};

	const darkDefaultStyles: AliasColorTokenDef = {
		"LEGACY-bg-default": "var(--color-black)",
		"LEGACY-bg-muted": "var(--color-gray-900)",
		"LEGACY-bg-emphasis": "var(--color-white)",
		"LEGACY-fg-default": "var(--color-white)",
		"LEGACY-fg-muted": "var(--color-gray-400)",
		"LEGACY-fg-on-emphasis": "var(--color-black)",
		"LEGACY-border-default": "var(--color-white)",
		"LEGACY-border-muted": "var(--color-gray-400)",
	};

	const formatIntoVariables = (obj: AliasColorTokenDef) => {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key.replace(/^LEGACY-/, "--color-"),
				value,
			]),
		);
	};

	return {
		":root": formatIntoVariables(lightDefaultStyles),
		"@media (prefers-color-scheme: dark)": {
			":root": formatIntoVariables(darkDefaultStyles),
		},
	};
}

const hexToRgb = (hex: string) => {
	const normalizedHex = hex.length === 4 ? hex + hex.slice(1) : hex;
	const r = Number.parseInt(normalizedHex.slice(1, 3), 16);
	const g = Number.parseInt(normalizedHex.slice(3, 5), 16);
	const b = Number.parseInt(normalizedHex.slice(5, 7), 16);

	return [r, g, b].join(" ");
};

function generateBaseColorTokenCss(theme: PluginAPI["theme"]) {
	const colorMapping = getBaseColorMap(theme);

	const variablesObject: Record<string, string> = {};
	for (const [hue, shades] of Object.entries(colorMapping)) {
		for (const [shade, value] of Object.entries(shades)) {
			if (!value) continue;
			variablesObject[`--color-${hue}-${shade}`] = hexToRgb(
				value as unknown as string,
			);
		}
	}

	return {
		":root": {
			"--color-white": hexToRgb(colors.white),
			"--color-black": hexToRgb(colors.black),
			...variablesObject,
		},
	};
}

function generateHeadingTypographyCss(theme: PluginAPI["theme"]) {
	const commonHeadingStyles = {
		fontFamily: theme("fontFamily.mono"),
		letterSpacing: theme("letterSpacing.tight"),
		lineHeight: theme("lineHeight.none"),
		fontWeight: theme("fontWeight.extrabold"),
	};

	const headings = {
		h1: {
			fontSize: theme("fontSize.5xl"),
		},
		h2: {
			fontSize: theme("fontSize.4xl"),
		},
		h3: {
			fontSize: theme("fontSize.2xl"),
		},
		h4: {
			fontSize: theme("fontSize.xl"),
		},
		h5: {
			fontSize: theme("fontSize.base"),
		},
		h6: {
			fontSize: theme("fontSize.sm"),
			fontWeight: theme("fontWeight.bold"),
		},
	};

	const headingClasses: Record<string, CSSRuleObject> = {};
	for (const [key, value] of Object.entries(headings)) {
		headingClasses[`.text-LEGACY-${key}`] = {
			...commonHeadingStyles,
			...value,
		} as CSSRuleObject;
	}

	return headingClasses;
}

function generateBodyTypographyCss(theme: PluginAPI["theme"]) {
	const bodyStyles: Record<string, CSSRuleObject> = {
		large: {
			fontSize: theme("fontSize.xl"),
			lineHeight: theme("lineHeight.6"),
		},
		medium: {
			fontSize: theme("fontSize.base"),
			lineHeight: theme("lineHeight.6"),
		},
		small: {
			fontSize: theme("fontSize.sm"),
			lineHeight: theme("lineHeight.5"),
		},
		caption: {
			fontSize: theme("fontSize.xs"),
			lineHeight: theme("lineHeight.4"),
		},
	};

	return Object.fromEntries(
		Object.entries(bodyStyles).map(([key, value]) => {
			return [
				`.text-LEGACY-${key}`,
				{
					fontFamily: theme("fontFamily.mono"),
					fontWeight: theme("fontWeight.normal"),
					...value,
				},
			] as [string, CSSRuleObject];
		}),
	);
}
