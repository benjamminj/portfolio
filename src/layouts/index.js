import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../components'
// import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../styles/reset.css'
import '../styles/theme.scss'
import '../styles/base.scss'
import style from './index.module.scss'

// todo -- figure out dynamic imports
require('prismjs/themes/prism.css')

const TemplateWrapper = ({ children }) => (
  <div className={style.TemplateWrapper}>
    {/* todo -- real metadata */}
    <Helmet
      title="Benjamin Johnson"
      meta={[
        {
          name: 'description',
          content:
            'Front-End Web Developer with a passion for clean UIs & elegant code',
        },
        { name: 'keywords', content: 'front-end developer, web, javascript' },
      ]}
    />
    <header className={style.header}>
      <Link to="/">benjaminjohnson.me</Link>
    </header>
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
