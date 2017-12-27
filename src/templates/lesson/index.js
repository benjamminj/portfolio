import React, { Component } from 'react'

import { Heading } from '../../components'
import style from './index.module.scss'

class LessonTemplate extends Component {
  getExampleComponent = post => {
    const { example } = post.frontmatter

    console.log(post.frontmatter)
    if (example) {
      const Component = require(`../../examples/${example}/index.js`)
      return Component
    }
  }

  render() {
    const { data } = this.props

    const post = data.markdownRemark

    const Example = this.getExampleComponent(post)
    console.log(Example)
    return (
      <article className={style.Lesson}>
        <div className={style.heading}>
          <Heading large accented>
            <h1>{post.frontmatter.title}</h1>
          </Heading>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className={style.content}
        />

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
      frontmatter {
        title
        example
        date(formatString: "MM-DD-YYYY")
      }
    }
  }
`
