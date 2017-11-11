// @flow @jsx h
import { h } from 'preact';

import type { Node } from 'react'
type PropTypes = {
  url: string,
  color: string,
  icon: Node,
  name: string,
}

const SocialMediaLink = ({ url, color, icon, name }: PropTypes) => (
  <a href={url} target='_blank' title={name}>
    {icon}

    <style jsx>{`
      --fill: ${color ? String(color) : 'var(--gray-dark)'}

      display: inline-block;

      /* increase click area without impacting vertical size */
      padding: 1rem 1.25rem;

      :hover,
      :active,
      :focus {
        --local-accent: var(--fill);
      }
    `}</style>
  </a>
)

export default SocialMediaLink
