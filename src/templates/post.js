import React, { Component } from 'react'
import { css } from 'emotion'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Heading, Markdown } from '../components'
import { aboveScreenMd } from '../styles/mixins'
import { textMaxWidth } from '../styles/variables'

class PostTemplate extends Component {
  render() {
    const { data } = this.props
    const post = data.markdownRemark

    const { date, title } = post.frontmatter
    const imageFile = data.file

    return (
      <article className={style}>
        <div className="heading">
          <Heading large>
            <h1>{title}</h1>
          </Heading>

          <span className="subheading">
            {date && `${date} — `}
            {post.timeToRead} min read
          </span>
        </div>

        {imageFile && <Img fluid={imageFile.childImageSharp.fluid} />}
        <Markdown html={post.html} />
      </article>
    )
  }
}

export default PostTemplate
export const query = graphql`
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

// styles
const style = css`
  margin: 1rem 0;

  ${aboveScreenMd(css`
    max-width: ${textMaxWidth};
    margin: 0 auto 3rem;
  `)}

  .heading {
    font-family: var(--font-secondary);
    padding-bottom: 2rem;
    padding-top: 2rem;
  }

  .subheading {
    font-size: 0.825rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: -1rem;
    display: block;
  }
`
