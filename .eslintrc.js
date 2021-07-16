module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
  },
};
