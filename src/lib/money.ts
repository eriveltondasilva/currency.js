import { CENT_FACTOR, ROUNDING_MODES } from '../config/constants.ts'
import { CalculatorService } from './calculator-service.ts'
import { ConversionService } from './converter-service.ts'
import { FormattingService } from './formatting-service.ts'

import type {
  FormatOptions,
  MoneyInput,
  FormatOptions as options,
  RoundingModes,
} from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class Money {
  #cents: number
  private readonly calculator: CalculatorService
  private readonly converter: ConversionService
  private readonly formatter: FormattingService
  private readonly formatOptions: options

  constructor(value: MoneyInput = 0, options: FormatOptions = {}) {
    this.calculator = CalculatorService.instance
    this.converter = ConversionService.instance
    this.formatter = FormattingService.instance
    this.formatOptions = options
    this.#cents = this.converter.toCents(value)
  }

  //# Construção
  // private static fromCents(value: number, options: FormatOptions): Money {
  //   const currency = new Money(0, options)
  //   currency.#cents = Math.round(value)
  //   return currency
  // }

  //# Obtenção de Valores
  public get cents(): number {
    return this.#cents
  }

  public get value(): number {
    return this.#cents / CENT_FACTOR
  }

  public get integer(): number {
    return Math.floor(Math.abs(this.#cents) / CENT_FACTOR)
  }

  public get decimal(): number {
    return (Math.abs(this.#cents) % CENT_FACTOR) / CENT_FACTOR
  }

  public toString(): string {
    return this.value.toFixed(2)
  }

  public valueOf(): number {
    return this.value
  }

  //# Verificações de Estado
  public isZero(): boolean {
    return this.#cents === 0
  }

  public isPositive(): boolean {
    return this.#cents > 0
  }

  public isNegative(): boolean {
    return this.#cents < 0
  }

  //# COMPARAÇÃO
  public equals(value: MoneyInput): boolean {
    return this.#cents === this.converter.toCents(value)
  }

  public greaterThan(value: MoneyInput): boolean {
    return this.#cents > this.converter.toCents(value)
  }

  public lessThan(value: MoneyInput): boolean {
    return this.#cents < this.converter.toCents(value)
  }

  public greaterThanOrEqual(value: MoneyInput): boolean {
    return this.#cents >= this.converter.toCents(value)
  }

  public lessThanOrEqual(value: MoneyInput): boolean {
    return this.#cents <= this.converter.toCents(value)
  }

  public max(value: MoneyInput): Money {
    const otherCents = this.converter.toCents(value)
    return Money.fromCents(
      Math.max(this.#cents, otherCents),
      this.formatOptions,
    )
  }

  public min(value: MoneyInput): Money {
    const otherCents = this.converter.toCents(value)
    return Money.fromCents(
      Math.min(this.#cents, otherCents),
      this.formatOptions,
    )
  }

  //# Operações Básicas
  public abs(): Money {
    if (this.isPositive() || this.isZero()) return this
    return Money.fromCents(Math.abs(this.#cents), this.formatOptions)
  }

  public plus(value: MoneyInput): Money {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this

    return Money.fromCents(this.cents + valueCents, this.formatOptions)
  }

  public minus(value: MoneyInput): Money {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this

    return Money.fromCents(this.cents - valueCents, this.formatOptions)
  }

  public times(factor: number): Money {
    if (factor <= 0)
      throw new Error('O fator de multiplicação deve ser positivo.')
    if (factor === 1) return this
    return Money.fromCents(Math.round(this.#cents * factor), this.formatOptions)
  }

  public divideBy(divisor: number): Money {
    if (divisor <= 0)
      throw new Error('Não é possível dividir por zero ou negativo.')

    if (Number.isNaN(divisor)) throw new Error('O divisor não pode ser NaN.')

    if (divisor === 1) return this

    return Money.fromCents(
      Math.round(this.#cents / divisor),
      this.formatOptions,
    )
  }

  public negate(): Money {
    if (this.isZero()) return this
    return Money.fromCents(-this.#cents, this.formatOptions)
  }

  //# Percentuais e Descontos
  public percentage(percentage: number): Money {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativo.')
    }
    return this.multiply(percentage / 100)
  }

  public applyDiscount(discountPercentage: number): Money {
    if (discountPercentage <= 0) {
      throw new Error('O percentual de desconto não pode ser zero ou negativo.')
    }
    return this.subtract(this.percentage(discountPercentage))
  }

  public applySurcharge(surchargePercentage: number): Money {
    if (surchargePercentage <= 0) {
      throw new Error(
        'O percentual de acréscimo não pode ser zero ou negativo.',
      )
    }
    return this.add(this.percentage(surchargePercentage))
  }

  //# Arredondamento
  public round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): Money {
   const roundedCents = this.calculator.round(
      this.#cents,
      precision,
      mode,
    )

    if (roundedCents === this.#cents) return this
    return Money.fromCents(roundedCents, this.formatOptions)
  }

  //# Formatação
  public format(options: options = {}): string {
    const mergedOptions = { ...this.formatOptions, ...options }
    return this.formatter.format(this, mergedOptions)
  }
}
