// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'react'

type propTypes = {
  header: Node,
  children: Node | Node[]
}

const Card = ({ children, header }: propTypes) => (
  <div className='Card'>
    {header && <header>{header}</header>}

    <main>{children}</main>

    <style jsx>{`
      --color: #aaa;

      .Card {
        border-radius: 2px;
        border: 1px solid var(--color);
      }

      header {
        border-bottom: 1px solid var(--color);
      }

      header,
      main {
        padding: 1rem;
      }
    `}</style>
  </div>
)

export default Card
