import { ROUNDING_MODES } from './config/constants.js'
import { CalculationService } from './lib/calculation-service.js'
import { MoneyFacade } from './lib/money.js'

import type { FormatOptions, MoneyInput, RoundingModes } from './types.js'

/**
 * Cria uma fábrica de instâncias MoneyFacade com opções de formatação padrão
 * @param defaultOptions - Opções de formatação padrão
 * @returns Função fábrica configurada
 */
function createMoneyFactory(defaultOptions: FormatOptions = {}) {
  const factory = (value: MoneyInput = 0): MoneyFacade =>
    new MoneyFacade(value, defaultOptions)

  factory.configure = (options: FormatOptions) =>
    createMoneyFactory({ ...defaultOptions, ...options })

  return factory
}

const Money = createMoneyFactory()
const Calculator = CalculationService.instance

const Currency = {
  USD: Money.configure({ currencyCode: 'USD' }),
  EUR: Money.configure({ currencyCode: 'EUR' }),
  BRL: Money.configure({ currencyCode: 'BRL' }),
}

export { Calculator, Currency, Money, ROUNDING_MODES }
export type { FormatOptions, MoneyInput, RoundingModes }
export default Money
