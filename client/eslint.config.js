import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-namespace': 'off',

      // Import restrictions for internal modules
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Prevent imports from examples (they are just examples)
            {
              target: './src/**',
              from: './src/components/examples/**',
              message:
                'Imports from examples directory are not allowed - these are just examples.',
            },
            // Prevent cross-domain service imports (category service shouldn't import from other domains)
            {
              target: './src/store/category/service/**',
              from: './src/store/!(category)/service/**',
              message:
                'Cross-domain service imports are not allowed. Services should be self-contained within their domain.',
            },
            // Prevent cross-domain view imports
            {
              target: './src/store/category/view/**',
              from: './src/store/!(category)/view/**',
              message:
                'Cross-domain view imports are not allowed. Views should be self-contained within their domain.',
            },
            // Prevent view layer from directly accessing other domain services
            {
              target: './src/store/category/view/**',
              from: './src/store/!(category)/service/**',
              message:
                'View layer should not directly import from other domain services. Use the domain index instead.',
            },
          ],
        },
      ],

      // Enforce consistent import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Prevent circular dependencies
      'import/no-cycle': [
        'error',
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],

      // Prevent importing from self
      'import/no-self-import': 'error',

      // Custom rule to enforce domain encapsulation
      'import/no-relative-packages': 'error',
    },
  }
);
