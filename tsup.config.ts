import { defineConfig, type Format } from 'tsup'
import packageJson from './package.json'

const shouldMinify = process.env.NODE_ENV === 'production'

const extensions: Record<'esm' | 'cjs', string> = {
  esm: shouldMinify ? '.min.mjs' : '.mjs',
  cjs: shouldMinify ? '.min.cjs' : '.cjs',
}

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * @license ${packageJson.license}
 * @copyright ${new Date().getFullYear()} ${packageJson.author}
 * @see ${packageJson.homepage}
 */`

export default defineConfig({
  entry: ['./src/index.ts'],
  format: Object.keys(extensions) as Format[],
  minify: shouldMinify,
  clean: true,
  dts: true,
  treeshake: true,
  outExtension: ({ format }) => ({
    js: extensions[format],
  }),
  banner: {
    js: banner,
  },
})
