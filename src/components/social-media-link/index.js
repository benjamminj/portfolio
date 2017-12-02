// @flow @jsx h
import { h, Component } from 'preact'

import type { Node } from 'react'

// css
import styles from './index.css'

type PropTypes = {
  url: string,
  color: string,
  icon: Node,
  name: string
}

class SocialMediaLink extends Component<PropTypes> {
  ref = undefined

  componentDidMount () {
    // TODO -- should be abstracted into some type of utility method probably
    const { color } = this.props

    if (this.ref) {
      const fillValue = color || 'var(--gray-normal)'

      this.ref.style.setProperty('--fill', fillValue)
    }
  }

  render () {
    const { url, name, icon } = this.props

    return (
      <a
        class={`SocialMediaLink ${styles.SocialMediaLink}`}
        href={url}
        target='_blank'
        title={name}
        ref={ref => {
          this.ref = ref
        }}
      >
        {icon}
      </a>
    )
  }
}

export default SocialMediaLink
