/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'

import { Heading, Markdown } from '../../components'
import { textMaxWidth } from '../../styles/variables'
import { fonts } from '../../styles/theme'

function PostTemplate(props) {
  const { data } = props
  const post = data.markdownRemark

  const { date, title, description: frontMatterDesc } = post.frontmatter
  const imageFile = data.file
  const imageAltText = get(post, 'frontmatter.image.alt', null)

  const description = frontMatterDesc || post.excerpt

  return (
    <Layout>
      <Helmet
        title={title}
        meta={[
          {
            name: 'description',
            content: description
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:site',
            content: '@benjamminj'
          },
          {
            name: 'twitter:title',
            content: title
          },
          {
            name: 'twitter:description',
            content: description
          },
          ...(imageFile
            ? [
                {
                  name: 'twitter:image',
                  content: imageFile.childImageSharp.fixed.src
                },
                {
                  name: 'twitter:image:alt',
                  content: imageAltText
                }
              ]
            : []),
          {
            name: 'twitter:creator',
            content: '@benjamminj'
          }
        ]}
      />
      <article
        css={css`
          @media (min-width: 35rem) {
            max-width: ${textMaxWidth};
            margin: 0 auto 3rem;
          }
        `}
      >
        <div
          css={css`
            font-family: ${fonts.secondary};
            padding: 2rem 0;
          `}
        >
          <Heading large>
            <h1>{title}</h1>
          </Heading>

          <span
            css={css`
              font-size: 0.825rem;
              color: rgba(0, 0, 0, 0.5);
              margin-top: -1rem;
              display: block;
            `}
          >
            {date && `${date} — `}
            {post.timeToRead} min read
          </span>
        </div>

        {imageFile && (
          <Img alt={imageAltText} fluid={imageFile.childImageSharp.fluid} />
        )}

        <div
          css={css`
            padding: 0;
          `}
        >
          <Markdown html={post.html} />
        </div>
      </article>
    </Layout>
  )
}

export default PostTemplate
export const pageQuery = graphql`
  query PostQuery($slug: String!, $bannerUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      frontmatter {
        title
        description
        date(formatString: "MM-DD-YYYY")
        image {
          url
          alt
        }
      }
    }
    file(relativePath: { eq: $bannerUrl }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed_noBase64
        }
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_noBase64
          presentationWidth
        }
      }
    }
  }
`
