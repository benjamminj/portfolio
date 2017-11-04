// @flow @jsx h
import { h } from 'preact'
import { fontWeightBold } from '../../styles/variables'

import type { Node } from 'react'

type propTypes = {
  children: Node,
  color?: String
}

const H2 = ({ children, color }: propTypes) => (
  <h2 style={{ color }}>
    {children}

    <style jsx>{`
      font-weight: ${fontWeightBold};
      font-size: 1.5rem;
    `}</style>
  </h2>
)

export default H2
