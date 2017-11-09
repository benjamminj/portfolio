// @flow @jsx h
import { h } from 'preact';

import type { Node } from 'react'

type propTypes = {
  children: Node
}

const Section = ({ children }: propTypes) => (
  <section className='Section'>
    {children}

    <style jsx>{`
      padding: 1rem;
    `}</style>
  </section>
)

export default Section
