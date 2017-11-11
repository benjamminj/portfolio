module.exports = {
  moduleNameMapper: {
    '^react$': 'preact-compat',
    '^react-dom$': 'preact-compat'
  },
  snapshotSerializers: ['jest-serializer-html-string'],
  transform: {
    '^.+\\.js$': './babel-configs/jest-transformer.js'
  }
}
