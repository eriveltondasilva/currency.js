import { Money } from './lib/money.ts'

import type { FormatOptions, MoneyInput } from './types.ts'

function MoneyFactory(defaultOptions: FormatOptions = {}) {
  const configureMoney = (value: MoneyInput = 0): Money => {
    return new Money(value, defaultOptions)
  }

  configureMoney.configure = (
    options: FormatOptions,
  ): ((value?: MoneyInput) => Money) => {
    return MoneyFactory({ ...defaultOptions, ...options })
  }

  return configureMoney
}

const money = MoneyFactory()

export { money }
export default money
