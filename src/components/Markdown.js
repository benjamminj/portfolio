import React from 'react'
import styled, { css } from 'react-emotion'
import { aboveScreenSm, linkStyle } from '../styles/mixins'
import syntaxHighlightingStyles from '../styles/syntax-highlighting'

const Wrapper = styled.div`
  width: calc(100vw - (2 * var(--body-padding)));

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
    font-family: var(--font-secondary);
    margin: 2em 0 0;
    color: var(--color-primary);
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.825rem;
  }

  h6 {
    font-size: 0.75rem;
  }

  /* lists */
  ol,
  ul {
    margin: 1em 0;

    li {
      margin: 0.5em 0;

      &:before {
        /* position: absolute; */
        padding-right: 0.5rem;
        font-family: var(--font-secondary);
        left: 0;
      }
    }
  }

  ol {
    list-style-type: none;
    counter-reset: ol-count;

    li {
      position: relative;
      padding-left: 2rem;
      line-height: 1.5;

      &:before {
        content: counter(ol-count) ')';
        position: absolute;
        counter-increment: ol-count;
      }
    }
  }

  ul {
    li {
      /* allows for nested lists with proper icon placement */
      padding-left: 2rem;
      position: relative;
      line-height: 1.5;

      &:before {
        content: '*';
        font-family: var(--font-secondary);
        font-weight: bold;
        position: absolute;
      }

      > p {
        margin: initial;
      }

      & + li {
        margin-top: 2rem;
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
    font-weight: 100;
    font-family: var(--font-secondary);

    &:before {
      content: '***';
    }
  }

  /* paragraphs */
  p {
    margin: 1em 0 0;

    & + p {
      margin-top: 2em;
    }
  }

  /* code */
  pre {
    margin: 1.25em 0;
  }

  *:not(pre) > code {
    background: var(--gray-0);
    padding: 0.25em;
  }

  /* blockquote */
  blockquote {
    border-left: 0.25rem solid var(--accent-1);
    font-family: var(--font-secondary);
    font-size: 0.825rem;
    font-style: italic;
    padding: 1rem 1rem 1rem 1.75rem;
    margin: 2rem 0 2rem;

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
    width: 100%;
    margin: 2rem 0;
  }

  p > img {
    margin: 1rem 0 0;
  }

  ${syntaxHighlightingStyles};
`

const Markdown = props => (
  <Wrapper dangerouslySetInnerHTML={{ __html: props.html }} />
)

export default Markdown
