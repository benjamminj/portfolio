// @flow
import React, {Component} from 'react'
import './App.css'
import 'github-markdown-css'

import {BrowserRouter, Route} from 'react-router-dom'

import Home from './layouts/Home'
import Blog from './layouts/Blog'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route path='/blog' component={Blog} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
