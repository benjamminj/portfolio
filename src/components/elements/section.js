// @flow @jsx h
import { h } from 'preact';

import type { Node } from 'react'

type propTypes = {
  children: Node,
  className?: String
}

const Section = ({ children, className }: propTypes) => (
  <section className={className}>
    {children}

    <style jsx>{`
      padding: 1rem;
    `}</style>
  </section>
)

export default Section
