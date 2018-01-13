import React, { Component } from 'react'
import { css } from 'emotion'

import { Heading, Markdown } from '../../components'
import { aboveScreenMd } from '../../styles/mixins'
import { textMaxWidth } from '../../styles/variables'
// import style from './index.module.scss'

class PostTemplate extends Component {
  render() {
    const { data } = this.props

    const post = data.markdownRemark

    const { date, title } = post.frontmatter

    return (
      <article className={style}>
        <div className="heading">
          <Heading large>
            <h1>{post.frontmatter.title}</h1>
          </Heading>

          <span className="subheading">
            {date && `${date} — `}
            {post.timeToRead} min read
          </span>
        </div>

        <Markdown html={post.html} />
      </article>
    )
  }
}

export default PostTemplate
export const query = graphql`
  query LessonQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MM-DD-YYYY")
      }
    }
  }
`

// styles
const style = css`
  margin: 1rem 0;

  ${aboveScreenMd(css`
    max-width: ${textMaxWidth};
    margin: 0 auto 1rem;
  `)}
}

.heading {
  font-family: var(--font-secondary);
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.subheading {
  font-size: 0.825rem;
  color: rgba(0,0,0,0.5);
  margin-top: -1rem;
  display: block;
}
`
