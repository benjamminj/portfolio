// @flow
import React from 'react'
import {Route} from 'react-router-dom'

import BlogPreview from './BlogPreview'
import BlogPost from './BlogPost'
import posts from '../get-posts'

const Blog = ({match}: {match: *}) => (
  <div>
    <Route
      exact
      path={`${match.url}`}
      render={() => <BlogPreview posts={posts} url={match.url} />}
    />
    {posts.map(post => (
      <Route
        key={post.id}
        path={`${match.url}/${post.id}`}
        render={() => <BlogPost post={post} />}
      />
    ))}
  </div>
)

export default Blog
