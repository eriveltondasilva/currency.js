import { Converter } from './lib/converter.ts'
import { Currency as CurrencyLib } from './lib/currency.ts'
import { Formatter } from './lib/formatter.ts'

import type { CurrencyInput, FormatOptions } from './types.ts'

export function Currency(
  value: CurrencyInput = 0,
  formatOptions: FormatOptions = {},
): CurrencyLib {
  return new CurrencyLib(value, new Converter(), new Formatter(), formatOptions)
}

export default Currency
