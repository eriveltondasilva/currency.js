import { CENT_FACTOR } from '../config/constants.ts'
import { isNil, isObject, isString } from '../utils/is.ts'

import type { CurrencyInput } from '../types.ts'

/**
 * Classe responsável pela conversão de diferentes tipos de entrada para centavos
 */
export class Converter {
  static #instance: Converter | null = null

  private constructor() {}

  public static get instance(): Converter {
    if (!Converter.#instance) {
      Converter.#instance = new Converter()
    }
    return Converter.#instance
  }

  //#
  public toCents(value: CurrencyInput): number {
    if (isNil(value)) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    if (isObject(value) && 'getCents' in value) {
      return value.cents
    }

    if (isString(value)) {
      return this.stringToCents(value)
    }

    return this.numberToCents(Number(value))
  }

  //#
  private stringToCents(value: string): number {
    if (!value.trim()) return 0

    if (/^\d+$/.test(value)) {
      return Number.parseInt(value, 10) * CENT_FACTOR
    }

    if (/^\d+\.\d{1,2}$/.test(value)) {
      return Math.round(parseFloat(value) * CENT_FACTOR)
    }

    const cleanValue = value.replace(/[^\d.,+-]/g, '')
    if (!cleanValue) return 0

    const normalizedValue = this.normalizeDecimalFormat(cleanValue)
    return Math.round(parseFloat(normalizedValue) * CENT_FACTOR)
  }

  //
  private normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.indexOf(',') > value.indexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    if (hasBrazilianFormat) {
      return value.replace(/\./g, '').replace(',', '.')
    }

    return value.replace(/,/g, '')
  }

  //
  private numberToCents(value: number): number {
    if (isNaN(value)) throw new Error('O valor deve ser um número válido')

    if (Number.isInteger(value)) return value * CENT_FACTOR

    return Math.round(value * CENT_FACTOR)
  }
}
