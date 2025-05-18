import { ROUNDING_MODES } from './config/constants.ts'
import { CalculationService } from './lib/calculation-service.ts'
import { Money as MoneyBase } from './lib/money.ts'

import type { FormatOptions, MoneyInput, RoundingModes } from './types.ts'

/**
 * Cria uma fábrica de instâncias Money com opções de formatação padrão
 * @param defaultOptions - Opções de formatação padrão
 * @returns Função fábrica configurada
 */
function createMoneyFactory(defaultOptions: FormatOptions = {}) {
  const factory = (value: MoneyInput = 0): MoneyBase =>
    new MoneyBase(value, defaultOptions)

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
