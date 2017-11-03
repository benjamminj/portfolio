export default (config, env, helpers) => {
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]

  // insert rules for styled-jsx in correct order
  const head = rule.options.plugins.slice(0, 3)
  const tail = rule.options.plugins.slice(3)

  rule.options.plugins = [
    ...head,
    'styled-jsx/babel',
    'syntax-flow',
    'transform-flow-strip-types',
    ...tail,
    'styled-jsx/babel' // need to include twice for proper behavior
  ]

  console.log(rule.options.plugins)
  // mock node.process for 3rd-party components
  config.node.process = 'mock'
}
