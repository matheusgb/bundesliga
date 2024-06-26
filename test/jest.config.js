const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {
  ...rootConfig, ...{
    rootDir: root,
    displayName: "end2end",
    setupFilesAfterEnv: ["<rootDir>/test/jestSetup.ts"],
    testMatch: ["<rootDir>/test/**/*.test.ts"],
  }
}