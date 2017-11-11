// @flow @jsx h
import { h } from 'preact'

import SocialMediaLink from '../social-media-link'

import type { Node } from 'react'

type PropTypes = {
  socialMedia: Array<{
    color: string,
    icon: Node,
    url: string
  }>
}

const Footer = ({ socialMedia }: PropTypes) => (
  <footer>
    <ul>
      {socialMedia.map(media => (
        <li>
          <SocialMediaLink {...media} />
        </li>
      ))}
    </ul>

    <p>&copy; 2017 Benjamin Johnson</p>

    <style jsx>{`
      footer {
        background-color: var(--gray-lightest);
        padding: 1rem;
      }

      ul {
        display: flex;
        justify-content: center;
      }

      p {
        text-align: center;
        font-size: 0.75rem;
      }
    `}</style>
  </footer>
)

export default Footer
