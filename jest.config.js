module.exports = {
  moduleFileExtensions: ['js', 'json'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~src(.*)$': '<rootDir>/src$1',
    '^~api(.*)$': '<rootDir>/src/api$1',
    '^~utils(.*)$': '<rootDir>/src/utils$1',
    '^~components(.*)$': '<rootDir>/src/components$1',
    '^~pages(.*)$': '<rootDir>/src/pages$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
