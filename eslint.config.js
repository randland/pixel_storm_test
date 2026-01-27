import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Vue 3 recommended rules (includes template parsing)
  ...pluginVue.configs['flat/recommended'],

  // Our project-specific overrides
  {
    files: ['**/*.{js,vue}'],
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off', // Allow single-word names for demos
      'vue/no-unused-vars': 'error',

      // JS rules for graphics code
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',  // Allow _unused params (common in callbacks)
        varsIgnorePattern: '^_'
      }],

      // These are fine in graphics code
      'no-console': 'warn',  // Warn but don't error - debugging is important
    }
  },

  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js'  // Don't lint config files
    ]
  }
]
