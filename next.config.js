const withOptimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withOptimizedImages({
    env: {
      HOMEPAGE: process.env.URL || process.env.VERCEL_URL,
      NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    },
    async redirects() {
      return [
        {
          source: '/blog',
          destination: '/writing',
          permanent: true,
        },
        {
          source: '/blog/:path',
          destination: '/:path',
          permanent: true,
        },
      ]
    },
  })
)
