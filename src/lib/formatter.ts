import { CURRENCY_LOCALES, FORMAT_STYLES } from '../config/constants.ts'
import { isNil, isObject } from '../utils/is.ts'

import type { CurrencyInput, FormatOptions } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class Formatter {
  static #instance: Formatter | null = null

  private constructor() {}
  public static get instance(): Formatter {
    if (!Formatter.#instance) {
      Formatter.#instance = new Formatter()
    }
    return Formatter.#instance
  }

  //#
  public format(value: CurrencyInput, options: FormatOptions = {}): string {
    if (isNil(value)) throw new Error('O valor não pode ser nulo ou indefinido')

    const extractedValue = this.extractNumericValue(value)

    const {
      currencyCode = 'BRL',
      locale = CURRENCY_LOCALES[currencyCode],
      showSymbol = true,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(locale, {
      style: showSymbol ? FORMAT_STYLES.CURRENCY : FORMAT_STYLES.DECIMAL,
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(extractedValue)
  }

  //#
  private extractNumericValue(value: CurrencyInput): number {
    if (isObject(value) && 'getValue' in value) return value.value
    return Number(value)
  }
}
