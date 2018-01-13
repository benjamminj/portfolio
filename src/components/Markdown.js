import React from 'react'
import { css } from 'emotion'
import { linkStyle } from '../styles/mixins'

require('prismjs/themes/prism.css')

const markdownStyles = css`
  /* headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    /* todo -- move to a central mixin location? */
    font-family: var(--font-secondary);
    margin: 1.25em 0;
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
      // smaller vertical rhythm for sublists
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
    margin: 1.5rem 0;
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
    margin: 1em 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* code */
  pre {
    margin: 1.25em 0;
  }

  :not(pre) > code {
    background: var(--accent-1-extra-light);
    padding: 0.25em;
  }

  /* blockquote */
  blockquote {
    background: var(--accent-1-extra-light);
    font-family: var(--font-secondary);
    font-size: 0.825rem;
    padding: 1rem;
    border-radius: 2px;
    font-style: italic;

    p {
      line-height: 1.25;
    }
  }

  /* links */
  a {
    ${linkStyle}
  }

  /* img */
  img {
    width: 100%;
    margin: 2rem 0;
  }
`

const Markdown = props => (
  <div
    dangerouslySetInnerHTML={{ __html: props.html }}
    className={markdownStyles}
  />
)

export default Markdown
