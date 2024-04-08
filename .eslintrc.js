/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  root: true,
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/unbound-method": "off",
    "no-console": "warn",
    "no-empty-function": "warn",
  },
};
