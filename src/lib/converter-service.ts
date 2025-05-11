import { CENT_FACTOR } from '../config/constants.ts'
import { isNil, isObject, isString } from '../utils/is.ts'

import type { IConversionService, MoneyInput } from '../types.ts'

/**
 * Classe responsável pela conversão de diferentes tipos de entrada para centavos
 */
export class ConversionService implements IConversionService {
  private static _instance: ConversionService

  private constructor() {}
  public static get instance(): ConversionService {
    return (this._instance ??= new this())
  }

  //###
  public toCents(value: MoneyInput): number {
    if (isNil(value)) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    if (isObject(value) && 'cents' in value) {
      return value.cents
    }

    if (isString(value)) {
      return this.stringToCents(value)
    }

    return this.numberToCents(Number(value))
  }

  //#
  private numberToCents(value: number): number {
    if (Number.isNaN(value))
      throw new Error('O valor deve ser um número válido')

    if (value === 0) return 0

    return Number.isInteger(value) ?
        value * CENT_FACTOR
      : Math.round(value * CENT_FACTOR)
  }

  //
  private stringToCents(value: string): number {
    if (!value.trim()) return 0

    const cleanValue = value.replace(/[^\d.,+-]/g, '')
    if (!cleanValue) return 0

    const normalizedValue = this.normalizeDecimalFormat(cleanValue)
    const numberValue = Number.parseFloat(normalizedValue)
    return this.numberToCents(numberValue)
  }

  //
  private normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.lastIndexOf(',') > value.lastIndexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    return hasBrazilianFormat ?
        value.replace(/\./g, '').replace(',', '.')
      : value.replace(/,/g, '')
  }
}
