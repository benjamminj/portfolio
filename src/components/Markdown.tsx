import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { createLinkStyles, createHighlight } from '../styles/mixins'
import { aboveDesktop, aboveTablet } from '../styles/media'
import syntaxHighlightingStyles from '../styles/syntax-highlighting'
import { spacing, fonts, palette } from '../styles/theme'
import { getFontStylesFromVariant } from './Text'

/**
 * Meant to wrap around rendered markdown content to provide it with styling.
 */
export const MarkdownWrapperStyles = styled.div`
  ${aboveTablet(css`
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
        padding-right: ${spacing.xs}px;
        left: 0;
      }
    }
  }

  ol {
    list-style-type: none;
    counter-reset: ol-count;

    li {
      position: relative;
      padding-left: ${spacing.xl}px;
      line-height: 1.5;

      &:before {
        content: counter(ol-count) '.';
        position: absolute;
        counter-increment: ol-count;
        padding-left: ${spacing.xs}px;
      }
    }
  }

  ul {
    li {
      /* allows for nested lists with proper icon placement */
      padding-left: ${spacing.xl}px;
      position: relative;
      line-height: 1.5;

      &:before {
        content: '●';
        padding-left: ${spacing.xs}px;
        padding-top: 0.5em;
        font-size: 10px;
        position: absolute;
        height: 100%;
        display: flex;
      }

      > p {
        margin: initial;
        line-height: inherit;
      }

      & + li {
        margin-top: ${spacing.m}px;
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
    margin: ${spacing.xl}px 0;
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
    background: ${palette.neutral_900};
    color: ${palette.white};
    padding: ${spacing.xl}px var(--body-gutter);
    overflow: auto;

    ${aboveDesktop({
      borderRadius: 'var(--border-radius-m)',
    })}
  }

  *:not(pre) > code {
    ${createHighlight()}
  }

  /* blockquote */
  blockquote {
    --blockquote-sizing: ${spacing.xl}px;

    background-color: ${palette.primary_100};
    border: 2px solid ${palette.primary_200};
    border-radius: var(--border-radius-l);

    ${getFontStylesFromVariant('body')};

    font-style: italic;
    padding: var(--blockquote-sizing);
    margin: ${spacing.xl}px 0;

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

  /* img */
  img {
    width: calc(100%);
    margin: ${spacing.xl}px 0;
  }

  p > img {
    margin: ${spacing.m}px 0 0;
  }

  ${syntaxHighlightingStyles};
`

export const Markdown = props => (
  <MarkdownWrapperStyles dangerouslySetInnerHTML={{ __html: props.html }} />
)
