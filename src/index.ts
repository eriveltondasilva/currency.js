import { Money } from './lib/money.ts'

import type { CurrencyInput, FormatOptions } from './types.ts'

function currency(
  value: CurrencyInput = 0,
  formatOptions: FormatOptions = {},
): Money {
  return new Money(value, formatOptions)
}

export { currency, Money }
export default currency
