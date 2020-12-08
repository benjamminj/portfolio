import { ThemeProvider } from '@emotion/react'
import Router from 'next/router'
import { useEffect } from 'react'
import * as analytics from '../lib/analytics'
import '../styles/index.css'

/**
 * Render the shell of the application, initialize client-side styles.
 */
export const App = ({ Component, pageProps }) => {
  // On every page change, trigger a pageview in GA
  useEffect(() => {
    const handleRouteChange = url => {
      analytics.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}

export default App
