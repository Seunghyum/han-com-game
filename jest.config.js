module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
