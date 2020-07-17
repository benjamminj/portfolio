const withMdxEnhanced = require('next-mdx-enhanced')
const withOptimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(
  withMdxEnhanced({
    fileExtensions: ['mdx', 'md']
  })(
    withOptimizedImages({
      env: {
        HOMEPAGE:
          // In the production environment, we want to use the actual configured
          // URL as a base URL.
          //
          // In non-production environments, we want to use the preview url.
          process.env.PRODUCTION_URL === 'true'
            ? process.env.URL
            : process.env.DEPLOY_PRIME_URL
      }
    })
  )
)
