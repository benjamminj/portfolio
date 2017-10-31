export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  const babelConfig = rule.options

  babelConfig.plugins.push([
    'styled-jsx/babel'
  ])

  // mock node.process for 3rd-party components
  config.node.process = 'mock'
}
