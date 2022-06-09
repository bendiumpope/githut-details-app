export const env = {
  browser: true,
  es2021: true,
};
export const extend = ['eslint:recommended', 'plugin:@typescript-eslint/recommended'];
export const parser = '@typescript-eslint/parser';
export const parserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};
export const plugins = ['@typescript-eslint'];
export const rules = {};
