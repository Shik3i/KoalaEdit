import sveltePlugin from 'eslint-plugin-svelte'
import ts from 'typescript-eslint'

export default ts.config(
  ...ts.configs.recommended,
  ...sveltePlugin.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'svelte/no-at-html-tags': 'off',
    },
  },
  { ignores: ['dist/', 'node_modules/'] },
)
