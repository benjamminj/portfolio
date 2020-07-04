import NextApp from 'next/app'
import Router from 'next/router'
import { CacheProvider } from '@emotion/core'

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion'
import { useEffect } from 'react'
import * as analytics from '../src/helpers/analytics'

// import { globalStyles } from '../shared/styles'

export const App = ({ Component, pageProps }) => {
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
