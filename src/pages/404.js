/** @jsx jsx */
import { Heading, Link, Section, Layout } from '../components'
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/theme'

const NotFoundPage = () => (
  <Layout>
    <Section
      css={css`
        align-items: center;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: 0;
        padding: 1rem;
        position: absolute;
        right: 0;
        text-align: center;
        top: 0;
      `}
    >
      <Heading
        css={css`
          color: ${colors.gray[500]};
          font-size: 7rem;
          margin-bottom: 0;
          margin-top: 0;
        `}
      >
        <h1>404</h1>
      </Heading>
      <p>
        Looks like the page you're looking for doesn't exist...so sorry about
        that!
      </p>

      {
        // todo -- go back one entry in browser history OR to home page?
      }
      <Link href="/index" as="/">
        Go back to the home page
      </Link>
    </Section>
  </Layout>
)

export default NotFoundPage
