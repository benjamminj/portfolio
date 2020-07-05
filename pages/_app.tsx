import { CacheProvider } from '@emotion/core'
// Use only { cache } from 'emotion'. Don't use { css } in this file.
import { cache } from 'emotion'
import Router from 'next/router'
import { useEffect } from 'react'
import * as analytics from '../src/helpers/analytics'

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

  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default App
