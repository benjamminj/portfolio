import { css } from '@emotion/core'

export const palette = {
  white: '#fff',
  black: '#000',
  // neutrals
  neutral_100: '#f2f5f8',
  neutral_200: '#e6e8ea',
  neutral_300: '#d7dae0',
  neutral_500: '#b3b8c1',
  neutral_600: '#979daa',
  neutral_700: '#5b6171',
  neutral_900: '#282b39',
  // primary
  primary_100: '#ebf6ff',
  primary_300: '#92d1fc',
  primary_500: '#006bad',
  primary_700: '#00396b',
  primary_900: '#001f66',
  // accents
  accent1_100: '#fbebfe',
  accent1_300: '#ecb9fd',
  accent1_500: '#d392fc',
  accent1_700: '#9707df',
  accent1_900: '#44037d',
  // error
  error_100: '#fee8e7',
  error_300: '#f78d87',
  error_500: '#E53935',
  error_700: '#ac1411',
  error_900: '#610705',
  // greenish color?
  success_100: '#dbfffb',
  success_300: '#31e3c8',
  success_500: '#0bb79d',
  success_700: '#016556',
  success_900: '#014132',
  // yellow
  warning_100: '#fff6c7',
  warning_300: '#fddc91',
  warning_500: '#ffc247',
  warning_700: '#f59b0a',
  warning_900: '#6b3700',
}

export const colors = {
  white: '#fff',
  primary: '#333',
  secondary: '#efefef',
  accent1: {
    100: '#e6f5ff',
    300: '#80d6ff',
    500: '#42a5f5',
    700: '#0077c2',
    900: '#1565c0',
  },
  accent2: {
    500: '#ff5722',
    700: 'hsl(16deg 100% 60%)',
    900: 'hsl(16deg 100% 50%)',
  },
  gray: {
    100: '#f2f2f2',
    500: '#ccc',
    700: '#999',
  },
}

export const fonts = {
  primary: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  secondary: `Menlo, Monaco, Lusica Console, Ubuntu Mono, Courier New, monospace`,
  mono: `Menlo, Monaco, Lusica Console, Ubuntu Mono, Courier New, monospace`,
}

export const spacing = {
  base: 16,
  body: {
    gutter: '1rem',
  },
}

export default css`
  :root {
    /**
     * Border Radius
     *
     * Currently, all values are "0", but they're still differentiated so that
     * updating the border radii is only a matter of updating the design system.
     */
    --border-radius-s: 0;
    --border-radius-m: 10px;
    --border-radius-l: 0;

    /* fonts */
    --font-primary: ${fonts.primary};
    --font-secondary: ${fonts.secondary};
    --font-mono: ${fonts.mono};

    /* paddings */
    --body-gutter: 1rem;
  }
`
