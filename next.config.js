const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  fileExtensions: ['mdx', 'md']
})()
