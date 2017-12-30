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
    <Helmet
      title="Playground"
      meta={[
        { name: 'description', content: 'Something cool about this' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <header className={style.header}>
      <Link to="/">benjaminjohnson.me</Link>
    </header>
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
