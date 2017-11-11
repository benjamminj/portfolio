// @flow @jsx h
import { h } from 'preact'

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

      /* add a little bit of margin around link on hover without offsetting text spacing */
      padding: 0 0.2em;
      margin: 0 -0.2em;

      a:hover {
        color: var(--white);
        background: var(--accent-primary);
      }
    `}</style>
  </a>
)

export default A
