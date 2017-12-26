import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './index.module.scss'

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { props } = this
    return (
      <button {...props} className={`${style.Button} ${props.className}`}>
        {props.children}
      </button>
    )
  }
}

export default Button
