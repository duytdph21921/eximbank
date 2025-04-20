module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'react-hooks', 'import', 'prettier', 'jsx-a11y'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'no-unsafe-optional-chaining': 'off',
    'react/no-this-in-sfc': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',

    // Alias import fixes
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/prefer-default-export': 'off',

    // Best practices
    'no-console': 'warn',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: false }],
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'prefer-destructuring': ['warn', { object: true, array: false }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@hooks', './src/hooks'],
          ['@navigations', './src/navigations'],
          ['@store', './src/store'],
          ['@theme', './src/theme'],
          ['@translations', './src/translations'],
          ['@utils', './src/utils'],
          ['@services', './src/services'],
          ['@base', './src/screens/base'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
