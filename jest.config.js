const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const createConfig = (
  directory,
) => ({
  clearMocks: true,
  coverageDirectory: `coverage/${directory}`,
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      compilerOptions.paths,
      { prefix: '<rootDir>/' },
    ),
  },
  preset: 'ts-jest',
  roots: [ `<rootDir>/${directory}` ],
  testEnvironment: 'node',
});

const src = createConfig('src/');

module.exports = {
  collectCoverage: true,
  projects: [ src ],
};
