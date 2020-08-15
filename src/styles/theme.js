import { css } from '@emotion/core'

export const palette = {
  white: '#fff',
  black: '#000',
  // neutrals
  neutral_100: '#f2f5f8',
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
    /* colors */
    --white: #fff;
    --color-primary: #333;
    --color-secondary: #efefef;

    --accent-1-extra-light: #e6f5ff;
    --accent-1-light: #80d6ff;
    --accent-1: #42a5f5;
    --accent-1-dark: #0077c2;
    --accent-1-extra-dark: #1565c0;

    --accent-2: #ff5722;
    --accent-2-dark: hsl(16, 100, 60);
    --accent-2-extra-dark: hsl(16, 100, 50);

    --accent-3: #7cb342;
    --accent-4: #ad1457;

    --gray-0: #f2f2f2;
    --gray-1: #ccc;
    --gray-2: #999;

    /* fonts */
    --font-primary: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --font-secondary: Menlo, Monaco, Lucida Console, Ubuntu Mono, Courier New,
      monospace;
    --font-mono: Menlo, Monaco, Lucida Console, Ubuntu Mono, Courier New,
      monospace;

    /* paddings */
    --body-padding: 1rem;
  }
`
