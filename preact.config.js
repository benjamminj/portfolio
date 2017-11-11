const insertCustomPlugins = require('./babel-configs/custom-plugins')

export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]

  rule.options.plugins = insertCustomPlugins(rule.options.plugins)

  // mock node.process for 3rd-party components
  config.node.process = 'mock'
}
