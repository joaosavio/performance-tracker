module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'import',
  ],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'global-require': ['off'],
  },
};
