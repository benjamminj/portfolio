export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]

  // insert rules for styled-jsx in correct order
  rule.options.plugins.splice(3, 0, 'styled-jsx/babel')
  rule.options.plugins.splice(5, 0, 'styled-jsx/babel')

  // mock node.process for 3rd-party components
  config.node.process = 'mock'
}
