const withMdxEnhanced = require('next-mdx-enhanced')
const withOptimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(
  withMdxEnhanced({
    fileExtensions: ['mdx', 'md']
  })(withOptimizedImages({}))
)
