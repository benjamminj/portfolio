import { h, Component } from 'preact'
import { Router } from 'preact-router'

// components
import Home from '../routes/home'
import Footer from '../components/footer'
import NavigationHeader from '../components/navigation-header'

import { aboveScreenLg } from '../styles/breakpoints'

// data
import socialMedia from '../constants/social-media'

// css
import styles from './app.css'

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render () {
    return (
      <div id='app' className={styles.app}>
        <NavigationHeader />

        <div id='appBody' class={styles.appBody}>
          <Router onChange={this.handleRoute}>
            <Home path='/' />
          </Router>
        </div>

        <Footer socialMedia={socialMedia} />
      </div>
    )
  }
}
