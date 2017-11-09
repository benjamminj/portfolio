// @flow @jsx h
import { h } from 'preact'
// import { fontWeightBold } from '../../styles/variables'
import { heading } from '../../styles/mixins'

import type { Node } from 'react'

type propTypes = {
  children: Node,
  color?: String
}

const H2 = ({ children, color }: propTypes) => (
  <h2 style={{ color }} className='H2'>
    {children}

    <style jsx>{`
      font-size: 1.5rem;
    `}</style>

    <style jsx>{heading}</style>
  </h2>
)

export default H2
