/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const defaultConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
    'lcov',
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statement: 100,
    }
  },
  maxWorkers: '50%',
  watchPathIgnorePatterns: ['node_modules'],
  transformPathIgnorePatterns: ['node_modules'],
}

export default {
  projects: [
    {
      ...defaultConfig,
      testEnvironment: 'node',
      displayName: 'backend',
      collectCoverageFrom: [
        'server/',
        '!server/index.js'
      ],
      transformPathIgnorePatterns: [
        ...defaultConfig.transformPathIgnorePatterns,
        'public'
      ],
      testMatch: [
        '**/tests/**/server/**/*.test.js',
      ]
    },
    {
      ...defaultConfig,
      testEnvironment: 'jsdom',
      displayName: 'frontend',
      collectCoverageFrom: [
        'public/',
      ],
      transformPathIgnorePatterns: [
        ...defaultConfig.transformPathIgnorePatterns,
        'server'
      ],
      testMatch: [
        '**/tests/**/public/**/*.test.js',
      ]
    }
  ]
};
