module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
  moduleNameMapper: {
      '^@Source/(.*)$': '<rootDir>/src/$1',
      '^@Test/(.*)$': '<rootDir>/tests/$1'
  },
};