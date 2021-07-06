module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.ts?$',
  collectCoverageFrom: ["src/**/{!(netshoes),}.ts"]
};
