import prettierConfig from '@eriveltonsilva/prettier-config' with { type: "json" }

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierConfig,
  plugins: ["prettier-plugin-organize-imports"]
}

export default config
