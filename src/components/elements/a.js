// @flow @jsx h
import { h } from 'preact';

import { white } from '../../styles/variables'

import type { Node } from 'React'

type propTypes = {
  children: Node | Node[] | String,
  href: String,
  target?: String,
  color?: String
}

const A = ({ children, href, target, color }: propTypes) => (
  <a href={href} target={target} className='A'>
    {children}

    <style jsx>{`
      --color: ${color ? String(color) : 'steelblue'};

      color: var(--color);

      a:hover {
        color: ${white};
        background: var(--color);
      }
    `}</style>
  </a>
)

export default A
