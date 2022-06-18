module.exports = {
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
  testPathIgnorePatterns: ['__tests__/helpers', '__tests__/builders'],
  // testEnvironment: 'node',
  // setupFilesAfterEnv: ['./__tests__/helpers/setup.ts'],
}
