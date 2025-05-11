import { CENT_FACTOR, ROUNDING_MODES } from '../config/constants.ts'
import { Converter } from './converter.ts'
import { Formatter } from './formatter.ts'

import type { CurrencyInput, FormatOptions, RoundingModes } from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class Money {
  #cents: number
  private readonly converter: Converter
  private readonly formatter: Formatter
  private readonly formatOptions: FormatOptions

  constructor(value: CurrencyInput = 0, formatOptions: FormatOptions = {}) {
    this.converter = Converter.instance
    this.formatter = Formatter.instance
    this.formatOptions = formatOptions
    this.#cents = this.converter.toCents(value)
  }

  //# Construção
  private static fromCents(
    value: number,
    formatOptions: FormatOptions = {},
  ): Money {
    const currency = new Money(0, formatOptions)
    currency.#cents = Math.round(value)
    return currency
  }

  //# Obtenção de Valores
  get cents(): number {
    return this.#cents
  }

  get value(): number {
    return this.#cents / CENT_FACTOR
  }

  get integer(): number {
    return Math.floor(Math.abs(this.#cents) / CENT_FACTOR)
  }

  get decimal(): number {
    return (Math.abs(this.#cents) % CENT_FACTOR) / CENT_FACTOR
  }

  toString(): string {
    return this.value.toFixed(2)
  }

  valueOf(): number {
    return this.value
  }

  //# Verificações de Estado
  isZero(): boolean {
    return this.#cents === 0
  }

  isPositive(): boolean {
    return this.#cents > 0
  }

  isNegative(): boolean {
    return this.#cents < 0
  }

  //# Comparação
  equals(value: CurrencyInput): boolean {
    return this.#cents === this.converter.toCents(value)
  }

  greaterThan(value: CurrencyInput): boolean {
    return this.#cents > this.converter.toCents(value)
  }

  lessThan(value: CurrencyInput): boolean {
    return this.#cents < this.converter.toCents(value)
  }

  greaterThanOrEqual(value: CurrencyInput): boolean {
    return this.#cents >= this.converter.toCents(value)
  }

  lessThanOrEqual(value: CurrencyInput): boolean {
    return this.#cents <= this.converter.toCents(value)
  }

  max(value: CurrencyInput): Money {
    const otherCents = this.converter.toCents(value)
    return Money.fromCents(
      Math.max(this.#cents, otherCents),
      this.formatOptions,
    )
  }

  min(value: CurrencyInput): Money {
    const otherCents = this.converter.toCents(value)
    return Money.fromCents(
      Math.min(this.#cents, otherCents),
      this.formatOptions,
    )
  }

  //# Operações Básicas
  abs(): Money {
    if (this.isPositive() || this.isZero()) return this
    return Money.fromCents(Math.abs(this.#cents), this.formatOptions)
  }

  add(value: CurrencyInput): Money {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this

    return Money.fromCents(this.cents + valueCents, this.formatOptions)
  }

  subtract(value: CurrencyInput): Money {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this

    return Money.fromCents(this.cents - valueCents, this.formatOptions)
  }

  multiply(factor: number): Money {
    if (factor <= 0)
      throw new Error('O fator de multiplicação deve ser positivo.')
    if (factor === 1) return this
    return Money.fromCents(Math.round(this.#cents * factor), this.formatOptions)
  }

  divide(divisor: number): Money {
    if (divisor <= 0)
      throw new Error('Não é possível dividir por zero ou negativo.')

    if (Number.isNaN(divisor)) throw new Error('O divisor não pode ser NaN.')

    if (divisor === 1) return this

    return Money.fromCents(
      Math.round(this.#cents / divisor),
      this.formatOptions,
    )
  }

  negate(): Money {
    if (this.isZero()) return this
    return Money.fromCents(-this.#cents, this.formatOptions)
  }

  //# Percentuais e Descontos
  percentage(percentage: number): Money {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativo.')
    }
    return this.multiply(percentage / 100)
  }

  applyDiscount(discountPercentage: number): Money {
    if (discountPercentage <= 0) {
      throw new Error('O percentual de desconto não pode ser zero ou negativo.')
    }
    return this.subtract(this.percentage(discountPercentage))
  }

  applySurcharge(surchargePercentage: number): Money {
    if (surchargePercentage <= 0) {
      throw new Error(
        'O percentual de acréscimo não pode ser zero ou negativo.',
      )
    }
    return this.add(this.percentage(surchargePercentage))
  }

  //# Arredondamento
  round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): Money {
    if (precision <= 0) throw new Error('A precisão deve ser maior que zero.')

    if (precision === 1 && this.#cents % precision === 0) return this

    let roundedCents: number

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        roundedCents = Math.floor(this.#cents / precision) * precision
        break
      case ROUNDING_MODES.CEIL:
        roundedCents = Math.ceil(this.#cents / precision) * precision
        break
      case ROUNDING_MODES.ROUND:
      default:
        roundedCents = Math.round(this.#cents / precision) * precision
        break
    }

    if (roundedCents === this.#cents) return this
    return Money.fromCents(roundedCents, this.formatOptions)
  }

  //# Formatação
  format(options: FormatOptions = {}): string {
    const mergedOptions = { ...this.formatOptions, ...options }
    return this.formatter.format(this, mergedOptions)
  }
}
