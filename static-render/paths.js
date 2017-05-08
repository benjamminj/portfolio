const fs = require('fs')

const rootLevelPages = ['/', '/blog']
const blogPages = fs
  .readdirSync('_posts/')
  .map(filename => `/blog/${filename.slice(0, -3)}`)

module.exports = [...rootLevelPages, ...blogPages]
