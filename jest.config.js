module.exports = {
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  collectCoverageFrom: [
    '<rootDir>/{components,lib,pages,styles,src}/**/*.{ts,tsx,js,jsx}',
  ],
}
