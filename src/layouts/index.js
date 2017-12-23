import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../styles/reset.css'
import '../styles/theme.scss'
import '../styles/base.scss'

const TemplateWrapper = ({ children }) => (
  <div style={{
    padding: '1rem'
  }}>
    <Helmet
      title="Playground"
      meta={[
        { name: 'description', content: 'Something cool about this' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
