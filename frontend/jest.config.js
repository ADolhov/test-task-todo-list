// frontend/jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
};

module.exports = createJestConfig(customJestConfig);