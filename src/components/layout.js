import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../components'
import Helmet from 'react-helmet'
import styled, { css } from 'react-emotion'
import { aboveScreenSm, aboveScreenMd } from '../styles/mixins'

import '../styles/theme.js'
import '../styles/reset.js'

const Container = styled.div`
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

const Header = styled.header`
  margin-bottom: 1rem;
  z-index: 100;
  text-align: left;
`

const TemplateWrapper = ({ children }) => (
  <Container>
    {/* todo -- real metadata */}
    <Helmet
      title="Benjamin Johnson"
      meta={[
        {
          name: 'description',
          content:
            'Front-end engineer with a passion for clean UIs & elegant code'
        },
        { name: 'keywords', content: 'front-end developer, web, javascript' }
      ]}
    />
    <Header>
      <Link to="/">benjaminjohnson.me</Link>
    </Header>
    {children}
  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.node
}

export default TemplateWrapper
