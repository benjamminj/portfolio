const withMdxEnhanced = require('next-mdx-enhanced')
const withOptimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const BASE_URL =
  process.env.CONTEXT === 'production'
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL

module.exports = withBundleAnalyzer(
  withMdxEnhanced({
    fileExtensions: ['mdx', 'md']
  })(
    withOptimizedImages({
      env: {
        HOMEPAGE: BASE_URL
      }
    })
  )
)
