import { CURRENCY_LOCALES } from '@/config/enums.js'
import { Currency } from './currency.ts'

import type { CurrencyCode, CurrencyInput } from '../types.ts'

/**
 * Classe responsável pela conversão de diferentes tipos de entrada para centavos
 */
export class Converter {
  static toCents(value: CurrencyInput): number {
    if (value instanceof Currency) {
      return value.getCents()
    }

    if (typeof value === 'string') {
      return Converter.stringToCents(value)
    }

    return Math.round(Number(value) * 100)
  }

  private static stringToCents(value: string): number {
    const cleanValue = value.replace(/[^\d.,+-]/g, '')

    if (!cleanValue) return 0

    const normalizedValue = this.normalizeDecimalFormat(cleanValue)
    return Math.round(parseFloat(normalizedValue) * 100)
  }

  private static normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.indexOf(',') > value.indexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    return hasBrazilianFormat ?
        value.replace(/\./g, '').replace(',', '.')
      : value.replace(/,/g, '')
  }

  static getLocaleForCurrency(currencyCode: CurrencyCode): string {
    return CURRENCY_LOCALES[currencyCode] || CURRENCY_LOCALES.DEFAULT
  }
}
