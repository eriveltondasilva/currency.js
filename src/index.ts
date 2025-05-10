import { Converter } from './lib/converter.ts'
import { Currency as CurrencyLib } from './lib/currency.ts'
import { Formatter } from './lib/formatter.ts'

import type { CurrencyInput } from './types.ts'

export function Currency(value: CurrencyInput = 0): CurrencyLib {
  return new CurrencyLib(value, new Converter(), new Formatter())
}

export default Currency
