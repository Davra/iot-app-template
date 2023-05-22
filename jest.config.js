/*
 * NOTE: JEST is included here for developer unit tests.
 * Playwright is for the QA led integration tests.
 *
 */
const includeAll = ["!**/playwright/**", "**/unittests/**", "**/?(*.)+(spec|test).[jt]s?(x)"];
const exludeAll = ["/node_modules/", "/client/", "/dist/", "/playwright/"];
const includeCoverage = true;

/*
 * For all config options:
 * https://jestjs.io/docs/configuration
 */
const config = {
  bail: 10, // if we hit 10 failed tests, then crap out and die...
  testMatch: includeAll,
  testPathIgnorePatterns: exludeAll,
};
if (includeCoverage) {
  config.collectCoverage = true;
  config.coverageDirectory = "coverage";
  config.coverageReporters = ["text-summary"];
  config.coverageProvider = "babel";
  config.coveragePathIgnorePatterns = exludeAll;
}

module.exports = config;
