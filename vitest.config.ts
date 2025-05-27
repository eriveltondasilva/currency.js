import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests'],
    globals: true,
    environment: 'node',
    reporters: 'verbose',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules',
        'dist',
        'tests',
        '.github',
        '.husky',
        'assets',
        'docs',
        'src/types.ts',
        'src/types/**',
        'src/config/**',
        '**/*.example.ts',
      ],
    },
  },
})
