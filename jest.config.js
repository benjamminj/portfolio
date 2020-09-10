module.exports = {
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  collectCoverageFrom: [
    '<rootDir>/lib/**',
    '<rootDir>/pages/**',
    '<rootDir>/src/**',
  ],
}
