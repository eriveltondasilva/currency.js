import { CURRENCY_LOCALES } from '@/config/enums.js'
import { isNill, isObject } from '../utils/is.ts'

import type { CurrencyCode, CurrencyInput } from '../types.ts'

/**
 * Classe responsável pela conversão de diferentes tipos de entrada para centavos
 */
export class Converter {
  private static readonly CENT_FACTOR = 100

  public static toCents(value: CurrencyInput): number {
    if (isNill(value)) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    if (isObject(value) && 'getCents' in value) {
      return value.getCents()
    }

    if (typeof value === 'string') {
      return Converter.stringToCents(value)
    }

    return Converter.numberToCents(Number(value))
  }

  public static getLocale(currencyCode: CurrencyCode): string {
    return CURRENCY_LOCALES[currencyCode] || CURRENCY_LOCALES.USD
  }

  //#
  private static stringToCents(value: string): number {
    const cleanValue = value.replace(/[^\d.,+-]/g, '')

    if (!cleanValue) return 0

    const normalizedValue = Converter.normalizeDecimalFormat(cleanValue)
    return Math.round(parseFloat(normalizedValue) * Converter.CENT_FACTOR)
  }

  private static normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.indexOf(',') > value.indexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    if (hasBrazilianFormat) {
      return value.replace(/\./g, '').replace(',', '.')
    }

    return value.replace(/,/g, '')
  }

  private static numberToCents(value: number): number {
    if (isNaN(value)) {
      throw new Error('O valor deve ser um número válido')
    }
    return Math.round(value * Converter.CENT_FACTOR)
  }
}
