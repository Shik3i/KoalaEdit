import sveltePlugin from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'

export default ts.config(
  ...ts.configs.recommended,
  ...sveltePlugin.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: (await import('svelte-eslint-parser')).default,
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'svelte/no-at-html-tags': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  { ignores: ['dist/', 'node_modules/'] },
)
