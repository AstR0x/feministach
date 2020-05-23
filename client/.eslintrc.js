module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "prefer-destructuring": 0,
    'indent': ['error', 2],
    'no-trailing-spaces': 0,
    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }],
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
