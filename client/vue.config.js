/**
 * Need extras in the Vue config? Just add them here...
 */
// const gitBranchName = require("child_process").execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

const commonConfig = {
  transpileDependencies: ["vuetify"],
  outputDir: "../dist",
  // publicPath: '/microservices/____YOUR_SERVICE_NAME_____'
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      // definitions[0]["process.env"].GIT_BRANCH = `"${gitBranchName}"`;
      // definitions[0]["process.env"].BUILD_TIME = `"${new Date().toISOString()}"`;
      return definitions;
    });
  },
};
module.exports = commonConfig;
