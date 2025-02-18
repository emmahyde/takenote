/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
      alias: {
        map: [
          ['@', './src/client'],
          ['@resources', './src/resources'],
          ['utils', './src/client/utils'],
          ['types', './src/client/types']
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }],
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.js', '*.config.ts']
}
