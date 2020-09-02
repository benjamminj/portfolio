import { css } from '@emotion/core'
import { colors, palette, fonts } from './theme'

export default css`
  /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
  --first-color: ${palette.success_300};
  --second-color: ${palette.accent1_300};
  --third-color: ${palette.primary_300};
  --fourth-color: ${palette.warning_300};

  code[class*='language-'],
  pre[class*='language-'] {
    color: ${palette.white};

    font-family: ${fonts.mono};
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${palette.neutral_900};
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${palette.neutral_600};
  }

  .token.punctuation {
    color: var(--second-color);
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: inherit;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin {
    /* color: #690; */
    color: var(--fourth-color);
  }

  .token.deleted {
    color: ${palette.error_300};
  }

  .token.inserted {
    color: ${palette.success_300};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--first-color);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: var(--first-color);
  }

  .token.function {
    color: var(--third-color);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: var(--second-color);
  }

  .token.important,
  .token.bold {
    font-weight: 700;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .gatsby-highlight-code-line {
    display: block;
    background: rgba(255, 255, 255, 0.5);
  }
`
