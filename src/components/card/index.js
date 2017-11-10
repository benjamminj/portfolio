// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'react'

type propTypes = {
  header: Node,
  children: Node | Node[]
}

const Card = ({ children, header }: propTypes) => (
  <article className='Card'>
    {header && <header>{header}</header>}

    <main>{children}</main>

    <style jsx>{`
      --color: var(--gray-normal);

      .Card {
        border-radius: 2px;
        border: 1px solid var(--color);
        background: var(--white);
      }

      header {
        border-bottom: 1px solid var(--color);
      }

      header,
      main {
        padding: 1.25rem 1rem;
      }
    `}</style>
  </article>
)

export default Card
