#!/usr/bin/env node
/**
 * Helper script: build for all designated targets.
 *
 * 1. stash away any local/dev env files
 * 2. for each other .env.$TARGET:
 * 3. build with that mode, and save in dist
 * 4. unstash the local/dev env files
 *
 * If no targets, build as normal, output to root of dist folder
 * If only 1 target, build for that and output to root of dist folder
 * If multiple targets, build for each and output to a named folder in dist.
 *
 */
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const _ = require("lodash");

const vueCli = path.resolve(__dirname + "/node_modules/.bin/vue-cli-service");
const outputDirectory = path.resolve(__dirname + "/../dist/");

if (!fs.existsSync(vueCli)) {
  console.error("Local vue-cli-service service not found. Run 'npm install' and try again...");
  process.exit(1);
}

const renameMap = {
  ".env": ".NOPE",
  ".env.local": ".NOPE.local",
};
const stashLocalEnvs = () => {
  _.each(renameMap, (value, key) => {
    if (fs.existsSync(key)) {
      fs.renameSync(key, value);
    }
  });
};
const returnLocalEnvs = () => {
  _.each(renameMap, (value, key) => {
    if (fs.existsSync(value)) {
      fs.renameSync(value, key);
    }
  });
};

const findTargetEnvs = () => {
  const allFiles = fs.readdirSync(__dirname);
  const envFiles = _.filter(allFiles, (fname) => fname.startsWith(".env."));
  return _.map(envFiles, (fname) => fname.replace(".env.", ""));
};

const doBuild = () => {
  stashLocalEnvs();
  try {
    const targets = findTargetEnvs();
    if (targets.length == 0) {
      const cmd = `${vueCli} build --dest=${outputDirectory}`;
      childProcess.execSync(cmd, { stdio: "inherit" });
    } else if (targets.length == 1) {
      const cmd = `${vueCli} build --mode=${targets[0]} --dest=${outputDirectory}`;
      childProcess.execSync(cmd, { stdio: "inherit" });
    } else {
      for (let t of targets) {
        const cmd = `${vueCli} build --mode=${t} --dest=--dest=${outputDirectory}`;
        childProcess.execSync(cmd, { stdio: "inherit" });
      }
    }
  } catch (err) {
    if (err.stderr) {
      console.error(err.stderr.toString());
    } else {
      console.error(err);
    }
  }
  returnLocalEnvs();
};

if (require.main === module) {
  doBuild();
}
module.exports = doBuild;
