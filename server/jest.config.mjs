export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Use ESM for test files
  },
  testEnvironment: "node",
};
