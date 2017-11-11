module.exports = {
  moduleNameMapper: {
    '^react$': 'preact-compat',
    '^react-dom$': 'preact-compat'
  },
  transform: {
    '^.+\\.js$': './babel-configs/jest-transformer.js'
  }
}
