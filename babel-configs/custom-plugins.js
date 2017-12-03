module.exports = plugins => {
  // insert rules for styled-jsx in correct order
  const head = plugins.slice(0, 3)
  const tail = plugins.slice(3)

  return [...head, 'syntax-flow', 'transform-flow-strip-types', ...tail]
}
