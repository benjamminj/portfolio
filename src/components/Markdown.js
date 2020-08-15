import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import {
  aboveScreenSm,
  createLinkStyles,
  createHighlight,
  aboveScreenMd,
} from '../styles/mixins'
import syntaxHighlightingStyles from '../styles/syntax-highlighting'
import { spacing, fonts, colors } from '../styles/theme'
import { textVariants, getFontStylesFromVariant } from './Text'

/**
 * Meant to wrap around rendered markdown content to provide it with styling.
 */
export const MarkdownWrapperStyles = styled.div`
  ${aboveScreenSm(css`
    width: inherit;
  `)};

  /* headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 0;

    & > code[class*='language-'] {
      white-space: pre-wrap;
    }
  }

  h2 {
    ${getFontStylesFromVariant('h4')}
  }

  h3 {
    ${getFontStylesFromVariant('h5')}
  }

  h4 {
    ${getFontStylesFromVariant('h6')}
  }

  h5 {
    ${getFontStylesFromVariant('subtitle')}
  }

  h6 {
    ${getFontStylesFromVariant('overline')}
  }

  /* lists */
  ol,
  ul {
    margin: 1em 0;

    li {
      margin: 0.5em 0;

      &:before {
        padding-right: 0.5rem;
        left: 0;
      }
    }
  }

  ol {
    list-style-type: none;
    counter-reset: ol-count;

    li {
      position: relative;
      margin-left: 1.125rem;
      line-height: 1.5;

      &:before {
        content: counter(ol-count) '.';
        position: absolute;
        counter-increment: ol-count;
        left: -1.125rem;
      }
    }
  }

  ul {
    li {
      /* allows for nested lists with proper icon placement */
      padding-left: 1.125rem;
      position: relative;
      line-height: 1.5;

      &:before {
        content: '*';
        font-family: ${fonts.secondary};
        font-weight: 700;
        position: absolute;
      }

      > p {
        margin: initial;
      }

      & + li {
        margin-top: 1rem;
      }
    }

    /* nested lists */
    ul {
      /* smaller vertical rhythm for sublists */
      margin: 0;

      li {
        &:before {
          content: '-';
        }
      }
    }
  }

  /* dividers */
  hr {
    margin: 2rem 0;
    border-width: 0;
    text-align: center;
    letter-spacing: 4px;
    font-weight: 400;
    font-family: ${fonts.secondary};

    &:before {
      content: '***';
    }
  }

  /* paragraphs */
  p {
    margin: 1em 0 0;

    & + p {
      margin-top: 1em;
    }
  }

  /* code */
  pre {
    --overflow-size: calc(-1 * var(--body-gutter));
    margin: 1.25em var(--overflow-size);
    /* border-radius: 10px; */

    ${aboveScreenMd(
      css({
        borderRadius: 10,
      })
    )}
  }

  *:not(pre) > code {
    ${createHighlight()}
  }

  /* blockquote */
  blockquote {
    border-left: 0.25rem solid ${colors.accent1[500]};
    background-color: ${colors.accent1[100]};
    font-family: ${fonts.secondary};
    font-size: 1rem;
    font-style: italic;
    padding: 1rem 1rem 1rem 1.75rem;
    margin: 2rem 0;

    & > p {
      margin-top: 0;
    }

    p {
      line-height: 1.25;
    }
  }

  /* links */
  a {
    ${createLinkStyles()};
  }

  a > code {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border-radius: 0;
  }

  /* img */
  img {
    width: calc(100%);
    margin: 2rem 0;
  }

  p > img {
    margin: 1rem 0 0;
  }

  ${syntaxHighlightingStyles};
`

export const Markdown = props => (
  <MarkdownWrapperStyles dangerouslySetInnerHTML={{ __html: props.html }} />
)
