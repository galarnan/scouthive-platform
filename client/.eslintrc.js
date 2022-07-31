module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint/eslint-plugin'],
  rules: {
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        endOfLine: 'auto',
        arrowParens: 'avoid',
      },
    ],
  },
};
