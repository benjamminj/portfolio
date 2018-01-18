import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../components'
import Helmet from 'react-helmet'
import { css } from 'emotion'
import { aboveScreenSm, aboveScreenMd } from '../styles/mixins'

import '../styles/theme.js'
import '../styles/reset.js'

const TemplateWrapper = ({ children }) => (
  <div className={style}>
    {/* todo -- real metadata */}
    <Helmet
      title="Benjamin Johnson"
      meta={[
        {
          name: 'description',
          content:
            'Front-End Web Developer with a passion for clean UIs & elegant code'
        },
        { name: 'keywords', content: 'front-end developer, web, javascript' }
      ]}
    />
    <header className={headerStyle}>
      <Link to="/">benjaminjohnson.me</Link>
    </header>
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper


// style 
const style = css`
  padding: var(--body-padding, 1rem);
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;

  ${aboveScreenSm(css`
    --body-padding: 2rem;
  `)};

  ${aboveScreenMd(css`
    --body-padding: 1rem;
  `)};
`

const headerStyle = css`
  margin-bottom: 1rem;
  z-index: 100;
  text-align: left;
`