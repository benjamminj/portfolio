/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../../components/layout'

import { Heading, Markdown } from '../../components'
import { textMaxWidth } from '../../styles/variables'
import { fonts } from '../../styles/theme'

function PostTemplate(props) {
  const { data } = props
  const post = data.markdownRemark

  const { date, title } = post.frontmatter
  const imageFile = data.file

  return (
    <Layout>
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

        {imageFile && <Img fluid={imageFile.childImageSharp.fluid} />}

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
      timeToRead
      frontmatter {
        title
        date(formatString: "MM-DD-YYYY")
        image {
          url
          alt
        }
      }
    }
    file(relativePath: { eq: $bannerUrl }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_noBase64
          presentationWidth
        }
      }
    }
  }
`
