import { ROUNDING_MODES } from './config/constants.ts'
import { CalculationService } from './lib/calculation-service.ts'
import { MoneyFacade } from './lib/money-facade.ts'

import type { FormatOptions, MoneyInput } from './types.ts'

function createMoneyFactory(defaultOptions: FormatOptions = {}) {
  const factory = (value: MoneyInput = 0) =>
    new MoneyFacade(value, defaultOptions)

  factory.configure = (options: FormatOptions) =>
    createMoneyFactory({ ...defaultOptions, ...options })

  return factory
}

const Money = createMoneyFactory()
const Calculator = CalculationService.instance

export const USD = Money.configure({ currencyCode: 'USD' })
export const EUR = Money.configure({ currencyCode: 'EUR' })
export const BRL = Money.configure({ currencyCode: 'BRL' })

export { Calculator, Money, ROUNDING_MODES }
export type { FormatOptions, MoneyInput }
export default Money
