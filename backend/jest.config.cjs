module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@Source/(.*)$': '<rootDir>/src/$1',
    '^@Test/(.*)$': '<rootDir>/tests/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/__mocks__/utils/Supabase.service.ts',
    '<rootDir>/tests/__mocks__/utils/PrismaHandler.ts'
  ],
  coverageThreshold: {
    global: { // Raise these when we have testing setup
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  }
};