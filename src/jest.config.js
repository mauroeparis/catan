module.exports = {
  "collectCoverage": true,
  jest: {
    verbose: true,
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 10
      },
      "./src/components/": {
        branches: 40,
        statements: 40
      }
    }
  }
};
