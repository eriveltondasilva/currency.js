import { Money } from './lib/money.ts'

import type { FormatOptions, MoneyInput } from './types.ts'

function currency(
  value: MoneyInput = 0,
): Money {
  return new Money(value)
}

currency.config = (options: FormatOptions): Money => {
  return new Money(0, options)
}

export { currency, Money }
export default currency
