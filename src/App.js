// @flow
import React, {Component} from 'react'
import './App.css'
import 'github-markdown-css'

import {BrowserRouter, Route} from 'react-router-dom'

import BlogPreview from './layouts/BlogPreview'
import BlogPost from './layouts/BlogPost'
import posts from './get-posts'

const Blog = ({match}: {match: *}) => (
  <div>
    <Route
      exact
      path={`${match.url}`}
      render={() => <BlogPreview posts={posts} />}
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

const DefaultView = () => <h1>Default Path</h1>
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
