import React from 'react'
import style from './index.module.scss'

const Markdown = props => (
  <div
    dangerouslySetInnerHTML={{ __html: props.html }}
    className={style.Markdown}
  />
)

export default Markdown