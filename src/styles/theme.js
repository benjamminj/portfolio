import { injectGlobal } from 'emotion'

injectGlobal`
  :root {
    // colors
    --color-primary: #333;
    --color-secondary: #efefef;

    --accent-1-extra-light: #e6f5ff;
    --accent-1-light: #80d6ff;
    --accent-1: #42a5f5;
    --accent-1-dark: #0077c2;
    --accent-1-extra-dark: #1565c0;

    --accent-2: hsl(16, 100, 66);
    --accent-2-dark: hsl(16, 100, 60);
    --accent-2-extra-dark: hsl(16, 100, 50);

    --gray-1: #ccc;
    --gray-2: #999;

    // fonts
    --font-primary: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    --font-secondary: Menlo, Monaco, Lucida Console, Ubuntu Mono, Courier New,
      monospace;

    // paddings
    --body-padding: 1rem;
  }
`
