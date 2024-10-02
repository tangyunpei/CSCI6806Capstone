/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    require.resolve('yeelight-fabric/dist/eslint'),
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'warn', // Warn when console statements are used
    'no-unused-vars': 'error', // Error when there are unused variables
    'semi': ['error', 'always'], // Enforce semicolons at the end of statements
    'quotes': ['error', 'single'], // Enforce single quotes for strings
    'indent': ['error', 2], // Enforce 2-space indentation
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [
          __dirname,
          ...getDirectories(path.resolve(__dirname, './packages')),
          ...getDirectories(path.resolve(__dirname, './apps')),
        ],
      },
    ],
  },
  ignorePatterns: ['basic.ts', 'dist/**/*'] 
};