const withMdxEnhanced = require('next-mdx-enhanced')
const withOptimizedImages = require('next-optimized-images')

module.exports = withMdxEnhanced({
  fileExtensions: ['mdx', 'md']
})(withOptimizedImages({}))
