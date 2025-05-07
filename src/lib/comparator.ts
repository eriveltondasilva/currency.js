import { Converter } from './converter.ts'
import { Currency } from './currency.ts'

import type { CurrencyInput } from '../types.ts'

/**
 * Classe responsável por comparações entre valores monetários
 */
export class Comparator {
  static equals(value1: CurrencyInput, value2: CurrencyInput): boolean {
    return Converter.toCents(value1) === Converter.toCents(value2)
  }

  static greaterThan(value1: CurrencyInput, value2: CurrencyInput): boolean {
    return Converter.toCents(value1) > Converter.toCents(value2)
  }

  static lessThan(value1: CurrencyInput, value2: CurrencyInput): boolean {
    return Converter.toCents(value1) < Converter.toCents(value2)
  }

  static greaterThanOrEqual(
    value1: CurrencyInput,
    value2: CurrencyInput,
  ): boolean {
    return Converter.toCents(value1) >= Converter.toCents(value2)
  }

  static lessThanOrEqual(
    value1: CurrencyInput,
    value2: CurrencyInput,
  ): boolean {
    return Converter.toCents(value1) <= Converter.toCents(value2)
  }

  static max(value1: CurrencyInput, value2: CurrencyInput): Currency {
    return Comparator.greaterThanOrEqual(value1, value2) ?
        new Currency(value1)
      : new Currency(value2)
  }

  static min(value1: CurrencyInput, value2: CurrencyInput): Currency {
    return Comparator.lessThanOrEqual(value1, value2) ?
        new Currency(value1)
      : new Currency(value2)
  }
}
