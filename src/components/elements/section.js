// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'react'

type propTypes = {
  children: Node,
  id: string
}

const Section = ({ children, id }: propTypes) => (
  <section className='Section' id={id}>
    {children}

    <style jsx>{`
      padding: 2rem 1rem;
    `}</style>
  </section>
)

export default Section
