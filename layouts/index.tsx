import Head from 'next/head'
import { Layout } from '../src/components'
import { css, jsx } from '@emotion/core'
import { textMaxWidth } from '../src/styles/variables'
/** @jsx jsx */ jsx

// TODO: central type def for post front matter
const DefaultLayout = frontMatter => {
  return ({ children: content }) => {
    console.log('FM >>', frontMatter)
    const { date, title, description, publisher, externalLink } = frontMatter
    return (
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="author" content="Benjamin Johnson" />
          <meta name="description" content={description} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@benjamminj" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:creator" content="@benjamminj" />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />

          {/* TODO: base URL + slug */}
          {/* <meta property="og:url" content={HOMEPAGE + pageContext.slug} /> */}
        </Head>

        <main
          css={{
            '@media (min-width: 35rem)': {
              maxWidth: textMaxWidth,
              margin: '0 auto 3rem'
            }
          }}
        >
          content
        </main>
        <pre style={{ padding: '1rem', background: '#ddd' }}>
          <code>{JSON.stringify(frontMatter, null, 4)}</code>
        </pre>

        {content}
      </Layout>
    )
  }
}

export default DefaultLayout
