import { CENT_FACTOR } from '../config/constants.ts'
import { isNil, isObject, isString } from '../utils/is.ts'
import { singleton } from '../utils/singleton.ts'

import type { CurrencyInput } from '../types.ts'

/**
 * Classe responsável pela conversão de diferentes tipos de entrada para centavos
 */
@singleton
export class Converter {
  public toCents(value: CurrencyInput): number {
    if (isNil(value)) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    if (isObject(value) && 'getCents' in value) {
      return value.getCents()
    }

    if (isString(value)) {
      return this.stringToCents(value)
    }

    return this.numberToCents(Number(value))
  }

  //#
  private stringToCents(value: string): number {
    const cleanValue = value.replace(/[^\d.,+-]/g, '')

    if (!cleanValue) return 0

    const normalizedValue = this.normalizeDecimalFormat(cleanValue)
    return Math.round(parseFloat(normalizedValue) * CENT_FACTOR)
  }

  private normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.indexOf(',') > value.indexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    if (hasBrazilianFormat) {
      return value.replace(/\./g, '').replace(',', '.')
    }

    return value.replace(/,/g, '')
  }

  private numberToCents(value: number): number {
    if (isNaN(value)) {
      throw new Error('O valor deve ser um número válido')
    }
    return Math.round(value * CENT_FACTOR)
  }
}
