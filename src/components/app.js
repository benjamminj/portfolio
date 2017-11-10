import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Home from '../routes/home'

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

        <footer>footer</footer>

        <style jsx global>{`
          /* TODO -- move to external sheet somewhere? */
          :root {
            /* colors */
            --white: #fefefe;
            --black: #222;

            --gray-lightest: #fafafa;
            --gray-normal: #aaa;

            --accent-primary: lightseagreen;

            /* fonts */
            --font-default: 'Andale Mono', 'Lucida Console', 'Consolas',
              monospace;
          }

          html,
          body {
            min-height: 100%;
            width: 100%;
            background: var(--white);
            font-family: var(--font-default);
            font-weight: normal;
            color: var(--black);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #app {
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
