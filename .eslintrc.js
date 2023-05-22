module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
    "comma-dangle": ["off", "always"],
    "indent": ["warn", 2, { SwitchCase: 1 }],
    "no-console": "warn",
    "no-debugger": "warn",
    "no-extra-semi": "warn",
    "no-multiple-empty-lines": "warn",
    "quote-props": ["warn", "consistent"],
    "quotes": ["warn", "double"],
    "semi": ["error", "always"],
    "space-before-function-paren": "off",
  },
  globals: {
    BigInt: true,
  },
};
