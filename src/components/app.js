import { h, Component } from 'preact'
import { Router } from 'preact-router'

// components
import Home from '../routes/home'
import Footer from '../components/footer'
import NavigationHeader from '../components/navigation-header'

import { screenMd, aboveScreenLg } from '../styles/breakpoints'

// data
import socialMedia from '../constants/social-media'

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render () {
    return (
      <div id='app'>
        <NavigationHeader />

        <div id='appBody'>
          <Router onChange={this.handleRoute}>
            <Home path='/' />
          </Router>
        </div>

        <Footer socialMedia={socialMedia} />
        <style jsx global>{`
          /* TODO -- move to external sheet somewhere? */
          :root {
            /* colors */
            --white: #fefefe;
            --black: #222;

            --gray-lightest: #f5f5f5;
            --gray-normal: #aaa;
            --gray-dark: #757575;

            --accent-primary: #03a9f4;

            /* fonts */
            --font-default: Menlo, 'Andale Mono', 'Lucida Console', monospace;

            /* layout */
            --header-height: 3rem;

            /* larger screen sizes */
            --max-width: ${screenMd};
            --nav-desktop-width: 9rem;
          }

          html,
          body {
            min-height: 100%;
            width: 100%;
            background: var(--white);
            font-family: var(--font-default);
            font-weight: normal;
            font-size: 18px;
            color: var(--black);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #app {
            height: 100%;
          }

          #appBody {
            margin-top: var(--header-height);
          }

          @media (${aboveScreenLg}) {
            #appBody {
              margin: 0 auto;
              max-width: var(--max-width);
            }
          }
        `}</style>
      </div>
    )
  }
}
