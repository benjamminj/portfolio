// @flow @jsx h
import { h } from 'preact'

type PropTypes = {
  open: boolean
}

const MenuIcon = ({ open }: PropTypes) => (
  <svg style='width:24px;height:24px' viewBox='0 0 24 24'>
    {open ? (
      <path
        fill='#000000'
        d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
      />
    ) : (
      <path fill='#000000' d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
    )}
  </svg>
)

export default MenuIcon
