import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { aboveScreenSm, linkStyle } from '../styles/mixins'
import syntaxHighlightingStyles from '../styles/syntax-highlighting'
import { spacing, fonts, colors } from '../styles/theme'

/**
 * Meant to wrap around rendered markdown content to provide it with styling.
 */
export const MarkdownWrapperStyles = styled.div`
  width: calc(100vw - (2 * ${spacing.body.gutter}));
  font-size: 1.125rem;

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
    /* todo -- move to a central mixin location? */
    font-family: ${fonts.secondary};
    margin: 2em 0 0;
    color: ${colors.primary};

    & > code[class*='language-'] {
      white-space: pre-wrap;
    }
  }

  h2 {
    font-size: 1.25em;
  }

  h3 {
    font-size: 1em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 0.825em;
  }

  h6 {
    font-size: 0.75em;
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
    margin: 1.25em 0;
  }

  *:not(pre) > code {
    background: ${colors.accent1[100]};
    padding: 0.25em;
    border-radius: 4px;
    font-size: 1.25rem;
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
    ${linkStyle()};
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
