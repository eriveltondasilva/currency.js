import { defineConfig } from 'tsup'
import packageJson from './package.json'

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * @license ${packageJson.license}
 * @copyright ${new Date().getFullYear()} ${packageJson.author}
 * @see ${packageJson.homepage}
 * @see ${packageJson.repository}
 */`

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  sourcemap: true,
  treeshake: true,
  minify: true,
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
  }),
  banner: {
    js: banner,
  },
})
