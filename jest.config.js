module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  // modulePathIgnorePatterns: ['cypress'],
  collectCoverageFrom: ['<rootDir>/src/**']
}
