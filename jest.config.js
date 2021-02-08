module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~utils(.*)$': '<rootDir>/src/utils$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
