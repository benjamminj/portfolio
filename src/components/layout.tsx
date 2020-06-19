import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '.'
import Helmet from 'react-helmet'
import { css, jsx, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { aboveScreenSm, aboveScreenMd } from '../styles/mixins'
import { spacing } from '../styles/theme.js'
import reset from '../styles/reset.js'
/** @jsx jsx */ jsx

const Container = styled.div`
  padding: ${spacing.body.gutter};
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;

  ${aboveScreenSm(css`
    padding: 2rem;
  `)};

  ${aboveScreenMd(css`
    padding: 1rem;
  `)};
`

const Header = styled.header`
  margin-bottom: 1rem;
  z-index: 100;
  text-align: left;
`

export const TemplateWrapper = ({ children }) => (
  <Container>
    <Global styles={reset} />
    {/* todo -- real metadata */}
    <Helmet
      title="Benjamin Johnson"
      meta={[
        {
          name: 'description',
          content:
            'Front-end engineer with a passion for clean UIs & elegant code'
        },
        {
          name: 'keywords',
          content: 'front-end developer, web, javascript'
        }
      ]}
    />
    <Header>
      <Link href="/index" as="/">
        benjaminjohnson.me
      </Link>
    </Header>
    {children}
  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.node
}

export default TemplateWrapper
