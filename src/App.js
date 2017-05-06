import React, {Component} from 'react'
import './App.css'

// Begin blog stuff

import 'github-markdown-css'

import BlogPreview from './layouts/BlogPreview'

// eslint-disable-next-line import/no-webpack-loader-syntax
const webpackRequireContext = require.context(
  '!markdown-with-front-matter!./_posts',
  false,
  /\.md$/
)

const blogs = webpackRequireContext
  .keys()
  .map(path => {
    const postData = webpackRequireContext(path)

    return {
      ...postData,
      path: path.slice(1), // remove the `.` at beginning of the path
      date: new Date(postData.date || Date.now())
    }
  })
  .sort((post1, post2) => post1.date > post2.date)

// End blog stuff

console.log(blogs)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <BlogPreview posts={blogs} />
      </div>
    )
  }
}

export default App
