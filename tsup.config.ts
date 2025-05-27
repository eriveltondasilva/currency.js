import { defineConfig } from 'tsup'
import packageJson from './package.json'

const banner = `/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * @license ${packageJson.license}
 * @copyright ${new Date().getFullYear()}
 * @author ${packageJson.author}
 * @see ${packageJson.homepage}
 */
`

const commonConfig = {
  entry: ['./src/index.ts'],
  treeshake: true,
}

export default defineConfig([
  {
    ...commonConfig,
    format: 'esm',
    clean: true,
    dts: {
      only: true,
      banner: banner,
    },
  },
  {
    ...commonConfig,
    sourcemap: true,
    format: ['esm', 'cjs'],
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
    banner: {
      js: banner,
    },
  },
])
