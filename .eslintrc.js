module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['prettier'],
  extends: ['prettier', 'prettier/standard', 'prettier/unicorn'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/no-named-as-default': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
  },
}
