/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@payupnow/eslint-config/index.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
