module.exports = {
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  collectCoverageFrom: [
    '<rootDir>/{components,lib,pages,styles,src}/**/*.{ts,tsx,js,jsx}',
  ],
}
