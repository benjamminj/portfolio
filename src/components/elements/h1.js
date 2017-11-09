// @flow @jsx h
import { h } from 'preact'
import { fontWeightBold } from '../../styles/variables'

import type { Node } from 'react'

type propTypes = {
  children: Node
}

const H1 = ({ children }: propTypes) => (
  <h1 className='H1'>
    {children}

    <style jsx>{`
      font-weight: ${fontWeightBold};
      font-size: 2rem;
    `}</style>
  </h1>
)

export default H1
