import { defineConfig } from 'tsup'
import packageJson from './package.json'

const banner =
`/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * @license ${packageJson.license}
 * @copyright ${new Date().getFullYear()}
 * @author ${packageJson.author}
 * @see ${packageJson.homepage}
 */
`

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    treeshake: true,
    format: 'esm',
    clean: true,
    dts: {
      only: true,
      banner: banner,
    },
  },
  {
    entry: ['./src/index.ts'],
    treeshake: true,
    format: ['esm', 'cjs'],
    outExtension: ({ format }) => ({
      js: format === 'esm' ? '.mjs' : '.cjs',
    }),
    banner: {
      js: banner,
    },
  },
])
