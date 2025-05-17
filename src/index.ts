import { ROUNDING_MODES } from './config/constants.ts'
import { CalculationService } from './lib/calculation-service.ts'
import { Money as MoneyLib } from './lib/money.ts'

import type { FormatOptions, MoneyInput } from './types.ts'

function createMoneyFactory(defaultOptions: FormatOptions = {}) {
  const factory = (value: MoneyInput = 0) => new MoneyLib(value, defaultOptions)

  factory.setConfigure = (options: FormatOptions) =>
    createMoneyFactory({ ...defaultOptions, ...options })

  return factory
}

const Money = createMoneyFactory()
const Calculator = CalculationService.instance

const Currency = {
  USD: Money.setConfigure({ currencyCode: 'USD' }),
  EUR: Money.setConfigure({ currencyCode: 'EUR' }),
  BRL: Money.setConfigure({ currencyCode: 'BRL' }),
}

export { Calculator, Currency, Money, ROUNDING_MODES }
export type { FormatOptions, MoneyInput }
export default Money
