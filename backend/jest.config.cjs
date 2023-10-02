module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
      '^@Source/(.*)$': '<rootDir>/src/$1',
      '^@Test/(.*)$': '<rootDir>/tests/$1',
      '^@Prisma/(.*)$': '<rootDir>/prisma/$1',
  },
};