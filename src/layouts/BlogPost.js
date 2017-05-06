import React from 'react'

const BlogPost = ({ post }) => (
  <article dangerouslySetInnerHTML={{ __html: post.__content }} />
)

export default BlogPost
