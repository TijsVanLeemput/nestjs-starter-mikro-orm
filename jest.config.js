module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: false,
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node16',
          target: 'ES2021',
          esModuleInterop: true,
          resolvePackageJsonExports: false,
          ignoreDeprecations: '6.0',
        },
      },
    ],
    '^.+\\.jsx?$': [
      'ts-jest',
      {
        useESM: false,
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node16',
          target: 'ES2021',
          esModuleInterop: true,
          resolvePackageJsonExports: false,
          ignoreDeprecations: '6.0',
        },
      },
    ],
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^@mikro-orm/decorators$': '<rootDir>/__mocks__/@mikro-orm/decorators.js',
    '^@mikro-orm/decorators/legacy$':
      '<rootDir>/__mocks__/@mikro-orm/decorators/legacy.js',
    '^@libs/common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@libs/mikro-orm(|/.*)$': '<rootDir>/libs/mikro-orm/src/$1',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/libs/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  resetMocks: true,
};
