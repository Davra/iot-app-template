module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended"],
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
    "vue/html-self-closing": "off",
    "vue/no-mutating-props": "warn", // should actually be an error, but already in several places here
    "vue/multi-word-component-names": "warn",
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
  },
};
