import { defineConfig } from 'tsup'
import packageJson from './package.json'

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * @license ${packageJson.license}
 * @copyright ${new Date().getFullYear()}
 * @author ${packageJson.author}
 * @see ${packageJson.homepage}
 * @see ${packageJson.repository.url}
 */`

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  treeshake: true,
  minify: true,
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.mjs' : '.cjs',
  }),
  banner: {
    js: banner,
  },
})
