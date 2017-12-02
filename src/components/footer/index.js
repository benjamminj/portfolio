// @flow @jsx h
import { h } from 'preact'

import SocialMediaLink from '../social-media-link'

import type { Node } from 'react'

// css
import styles from './index.css'

type PropTypes = {
  socialMedia: Array<{
    color: string,
    icon: Node,
    name: string,
    url: string
  }>
}

const Footer = ({ socialMedia }: PropTypes) => (
  <footer class={`Footer ${styles.Footer}`}>
    <ul>
      {socialMedia.map(media => (
        <li>
          <SocialMediaLink {...media} />
        </li>
      ))}
    </ul>

    <p class={styles.p}>&copy; 2017 Benjamin Johnson</p>
  </footer>
)

export default Footer
