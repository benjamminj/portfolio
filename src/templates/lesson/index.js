import React from 'react'

import { Heading } from '../../components'
import style from './index.module.scss'

const LessonTemplate = ({ data }) => {
  console.log(data)
  const post = data.markdownRemark

  return (
    <article className={style.Lesson}>
      <div className="heading">
        <Heading large>
          <h1>{post.frontmatter.title}</h1>
        </Heading>
        <span>{post.frontmatter.date}</span>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className={style.content}
      />
    </article>
  )
}

export default LessonTemplate

export const query = graphql`
  query LessonQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        examples
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
