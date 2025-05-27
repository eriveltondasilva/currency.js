import { CENT_FACTOR } from '@/config/constants.js'
import { isNil, isObject, isString } from '@/utils/is.js'

import type { IConversionService, MoneyInput } from '@/types.js'

/** Classe responsável pela conversão de diferentes tipos de entrada para centavos. */
export class ConversionService implements IConversionService {
  private static _instance: ConversionService

  private constructor() {}
  public static get instance(): ConversionService {
    return (this._instance ??= new this())
  }

  /**
   * Converte um valor para centavos, independente do tipo de entrada.
   * @param value - O valor a ser convertido para centavos
   * @returns O valor em centavos
   * @throws Error se o valor for nulo, indefinido ou inválido
   */
  public toCents(value: MoneyInput): number {
    if (isNil(value)) throw new Error('O valor não pode ser nulo ou indefinido')

    if (isObject(value) && 'cents' in value) return value.cents

    if (isString(value)) return this.stringToCents(value)

    return this.numberToCents(Number(value))
  }

  /**
   * Converte um número para centavos.
   * @param value - O número a ser convertido
   * @returns O valor em centavos
   * @throws Error se o valor não for um número válido
   * @private
   */
  private numberToCents(value: number): number {
    if (Number.isNaN(value))
      throw new Error('O valor deve ser um número válido')

    if (value === 0) return 0

    return Math.round(value * CENT_FACTOR)
  }

  /**
   * Converte uma string para centavos.
   * @param value - A string a ser convertida
   * @returns O valor em centavos
   * @private
   */
  private stringToCents(value: string): number {
    if (!value.trim()) return 0

    const cleanValue = value.replace(/[^\d.,+-]/g, '')
    if (!cleanValue) return 0

    const normalizedValue = this.normalizeDecimalFormat(cleanValue)
    const numericValue = Number.parseFloat(normalizedValue)

    return this.numberToCents(numericValue)
  }

  /**
   * Normaliza o formato decimal da string, tratando formatos brasileiros e internacionais.
   * @param value - A string a ser normalizada
   * @returns A string normalizada no formato decimal padrão
   * @private
   */
  private normalizeDecimalFormat(value: string): string {
    const hasBrazilianFormat =
      value.lastIndexOf(',') > value.lastIndexOf('.') ||
      (value.indexOf('.') === -1 && value.indexOf(',') !== -1)

    return hasBrazilianFormat ?
        value.replace(/\./g, '').replace(',', '.')
      : value.replace(/,/g, '')
  }
}
