module.exports = {
  setupFiles: ["<rootDir>/test/setupTests.js"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10
    },
    "./src/components/": {
      branches: 40,
      statements: 40
    }
  }
};
