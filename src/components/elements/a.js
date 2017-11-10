// @flow @jsx h
import { h } from 'preact';

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
      color: var(--accent-primary);

      a:hover {
        color: var(--white);
        background: var(--accent-primary);
      }
    `}</style>
  </a>
)

export default A
