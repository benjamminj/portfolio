const babelJest = require('babel-jest')

const preactCLIBabelRC = require('preact-cli/lib/lib/babel-config.js')
const insertCustomPlugins = require('./custom-plugins')

const transformer = () => {
  const babelConfig = preactCLIBabelRC.default('test', { modules: 'commonjs' })
  babelConfig.plugins = insertCustomPlugins(babelConfig.plugins)

  return babelJest.createTransformer(babelConfig)
}

module.exports = transformer()
