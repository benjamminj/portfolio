import React, { Component } from 'react'

import { Heading, Markdown } from '../../components'
import style from './index.module.scss'

class PostTemplate extends Component {
  render() {
    const { data } = this.props

    const post = data.markdownRemark

    const { date, title } = post.frontmatter

    return (
      <article className={style.Lesson}>
        <div className={style.heading}>
          <Heading large>
            <h1>{post.frontmatter.title}</h1>
          </Heading>

          <span className={style.subheading}>
            {date && `${date} — `}{post.timeToRead} min read
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
