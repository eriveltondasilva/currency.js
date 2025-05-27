import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['tests/**'],
    globals: true,
    environment: 'node',
    reporters: 'verbose',
    alias: {
      '@/': './src',
    },
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
