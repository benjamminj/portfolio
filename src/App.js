// @flow
import React, {Component} from 'react'
import './App.css'
import 'github-markdown-css'

import {BrowserRouter, Link, Route} from 'react-router-dom'

import BlogPreview from './layouts/BlogPreview'
import BlogPost from './layouts/BlogPost'
import posts from './get-posts'

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

const DefaultView = () => (
  <div>
    <h1>Default View</h1>
    <Link to='/blog'>Blog</Link>
  </div>
)
class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/' component={DefaultView} />
          <Route path='/blog' component={Blog} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
