module.exports = {
  moduleNameMapper: {
    '^react$': 'preact-compat',
    '^react-dom$': 'preact-compat'
  },
  snapshotSerializers: ['preact-render-spy/snapshot', 'jest-serializer-html-string'],
  transform: {
    '^.+\\.js$': './babel-configs/jest-transformer.js'
  }
}
