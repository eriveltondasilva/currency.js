import { ROUNDING_MODES } from '../config/enums.ts'
import { Converter } from './converter.ts'
import { Formatter } from './formatter.ts'

import type { CurrencyInput, FormatOptions, RoundingModes } from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class Currency {
  private readonly cents: number

  constructor(value: CurrencyInput = 0) {
    this.cents = Converter.toCents(value)
  }

  //#
  static fromCents(cents: number): Currency {
    const currency = new Currency(0)
    Object.defineProperty(currency, 'cents', { value: Math.round(cents) })
    return currency
  }

  static fromValue(value: CurrencyInput): Currency {
    return new Currency(value)
  }

  static zero(): Currency {
    return new Currency(0)
  }

  //# Obtenção de Valores
  getCents(): number {
    return this.cents
  }

  getValue(): number {
    return this.cents / 100
  }

  toString(): string {
    return this.getValue().toFixed(2)
  }

  valueOf(): number {
    return this.getValue()
  }

  //# Verificações de Estado
  isZero(): boolean {
    return this.cents === 0
  }

  isPositive(): boolean {
    return this.cents > 0
  }

  isNegative(): boolean {
    return this.cents < 0
  }

  //# Comparação
  equals(value: CurrencyInput): boolean {
    return this.cents === Converter.toCents(value)
  }

  greaterThan(value: CurrencyInput): boolean {
    return this.cents > Converter.toCents(value)
  }

  lessThan(value: CurrencyInput): boolean {
    return this.cents < Converter.toCents(value)
  }

  greaterThanOrEqual(value: CurrencyInput): boolean {
    return this.cents >= Converter.toCents(value)
  }

  lessThanOrEqual(value: CurrencyInput): boolean {
    return this.cents <= Converter.toCents(value)
  }

  max(value: CurrencyInput): Currency {
    const otherCents = Converter.toCents(value)
    return Currency.fromCents(Math.max(this.cents, otherCents))
  }

  min(value: CurrencyInput): Currency {
    const otherCents = Converter.toCents(value)
    return Currency.fromCents(Math.min(this.cents, otherCents))
  }

  //# Operações Básicas
  abs(): Currency {
    return Currency.fromCents(Math.abs(this.cents))
  }

  add(value: CurrencyInput): Currency {
    return Currency.fromCents(this.cents + Converter.toCents(value))
  }

  subtract(value: CurrencyInput): Currency {
    return Currency.fromCents(this.cents - Converter.toCents(value))
  }

  multiply(factor: number): Currency {
    return Currency.fromCents(Math.round(this.cents * factor))
  }

  divide(divisor: number): Currency {
    if (divisor === 0) {
      throw new Error('Não é possível dividir por zero.')
    }

    if (Number.isNaN(divisor)) {
      throw new Error('O divisor não pode ser NaN.')
    }

    return Currency.fromCents(Math.round(this.cents / divisor))
  }

  negate(): Currency {
    return Currency.fromCents(-this.cents)
  }

  //# Percentuais e Descontos
  percentage(percentage: number): Currency {
    if (isNaN(percentage)) {
      throw new Error('A porcentagem não pode ser NaN.')
    }
    return this.multiply(percentage / 100)
  }

  applyDiscount(discountPercentage: number): Currency {
    if (discountPercentage < 0) {
      throw new Error('O percentual de desconto não pode ser negativo.')
    }
    return this.subtract(this.percentage(discountPercentage))
  }

  applySurcharge(surchargePercentage: number): Currency {
    if (surchargePercentage < 0) {
      throw new Error('O percentual de acréscimo não pode ser negativo.')
    }
    return this.add(this.percentage(surchargePercentage))
  }

  //# Arredondamento
  round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): Currency {
    if (precision <= 0) {
      throw new Error('A precisão deve ser maior que zero.')
    }

    let roundedCents: number

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        roundedCents = Math.floor(this.cents / precision) * precision
        break
      case ROUNDING_MODES.CEIL:
        roundedCents = Math.ceil(this.cents / precision) * precision
        break
      case ROUNDING_MODES.ROUND:
      default:
        roundedCents = Math.round(this.cents / precision) * precision
        break
    }

    return Currency.fromCents(roundedCents)
  }

  //# Formatação
  format(options: FormatOptions = {}): string {
    return Formatter.format(this, options)
  }
}
