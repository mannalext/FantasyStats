const tsconfig = require('./tsconfig.paths.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

module.exports = {
  moduleNameMapper,
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit'],
  testPathIgnorePatterns: ['__tests__/helpers', '__tests__/builders'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./__tests__/helpers/setup.ts'],
}
