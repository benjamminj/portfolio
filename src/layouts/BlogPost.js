// @flow
import React from 'react'

/* eslint-disable */
type Post = {
  __content: string,
  id: string,
  date: Date,
  title: string
}
/* eslint-enable */

const BlogPost = ({post}: {post: Post}) => (
  <article>
    <h1 id={post.id}>{post.title}</h1>
    <div className='info'>
      <span>{post.date.toDateString()}</span>
    </div>
    <div
      className='content'
      dangerouslySetInnerHTML={{__html: post.__content}}
    />
  </article>
)

export default BlogPost
