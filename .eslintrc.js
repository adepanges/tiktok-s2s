module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": ["error", "double"],
    "require-jsdoc": 0,
    "max-len": 0,
    "no-undef": 0,
    "camelcase": 0,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
