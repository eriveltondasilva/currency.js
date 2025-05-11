import { Money } from './lib/money.ts'

import type { FormatOptions, MoneyInput } from './types.ts'

function currency(
  value: MoneyInput = 0,
  formatOptions: FormatOptions = {},
): Money {
  return new Money(value, formatOptions)
}

export { currency, Money }
export default currency
