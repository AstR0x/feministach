module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prefer-destructuring': 0,
    'class-methods-use-this': 0,
    'arrow-parens': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
  }
};
