import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Home from '../routes/home'
import Profile from '../routes/profile'

import * as theme from '../styles/variables'

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render () {
    return (
      <div id='app'>
        <Router onChange={this.handleRoute}>
          <Home path='/' />
        </Router>

        <style jsx global>{`
          html, body {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            background: ${theme.white};
            font-family: ${theme.fontDefault};
            font-weight: ${theme.fontWeightDefault};
            color: ${theme.black};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          * {
            box-sizing: border-box;
          }

          #app {
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
