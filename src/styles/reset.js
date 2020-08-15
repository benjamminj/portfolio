import { css } from '@emotion/core'
import { fonts } from './theme'

export default css`
  :root {
    --body-gutter: 1rem;
  }

  /*! minireset.css v0.0.3 | MIT License | github.com/jgthms/minireset.css */
  body {
    font-family: ${fonts.primary};
  }

  code {
    font-family: ${fonts.mono};
    font-size: 0.875rem;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }
  p {
    line-height: 2;
  }
  ul {
    list-style: none;
  }
  button,
  input,
  select,
  textarea {
    margin: 0;
  }
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  img,
  embed,
  iframe,
  object,
  audio,
  video {
    height: auto;
    max-width: 100%;
  }
  iframe {
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
    text-align: left;
  }

  li {
    list-style-type: none;
  }
`
