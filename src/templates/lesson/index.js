import React, { Component } from 'react'

import { Heading, Markdown } from '../../components'
import style from './index.module.scss'

class LessonTemplate extends Component {
  getExampleComponent = post => {
    const { example } = post.frontmatter

    if (example) {
      const Component = require(`../../examples/${example}/index.js`)
      return Component
    }
  }

  render() {
    const { data } = this.props

    const post = data.markdownRemark

    const Example = this.getExampleComponent(post)
    
    return (
      <article className={style.Lesson}>
        <div className={style.heading}>
          <Heading large accented>
            <h1>{post.frontmatter.title}</h1>
          </Heading>

          <span className={style.subheading}>{post.frontmatter.date} &mdash; {post.timeToRead} min read</span>
        </div>

        <Markdown html={post.html} />

        {Example && (
          <div className={style.example}>
            <Heading>
              <h2>Example</h2>
            </Heading>
            <Example />
          </div>
        )}
      </article>
    )
  }
}

export default LessonTemplate

export const query = graphql`
  query LessonQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        example
        date(formatString: "MM-DD-YYYY")
      }
    }
  }
`
