import { ROUNDING_MODES } from '../config/enums.ts'
import { Calculator } from './calculator.ts'
import { Comparator } from './comparator.ts'
import { Converter } from './converter.ts'
import { Formatter } from './formatter.ts'

import type { CurrencyInput, FormatOptions } from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class Currency {
  private readonly cents: number

  constructor(value: CurrencyInput = 0) {
    // Converte o valor para centavos e armazena como inteiro
    this.cents = Converter.toCents(value)
  }

  static fromCents(cents: number): Currency {
    const currency = new Currency(0)
    Object.defineProperty(currency, 'cents', { value: Math.round(cents) })
    return currency
  }

  static zero(): Currency {
    return new Currency(0)
  }

  getCents(): number {
    return this.cents
  }

  getValue(): number {
    return this.cents / 100
  }

  isZero(): boolean {
    return this.cents === 0
  }

  isPositive(): boolean {
    return this.cents > 0
  }

  isNegative(): boolean {
    return this.cents < 0
  }

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
    return Currency.fromCents(Math.round(this.cents / divisor))
  }

  negate(): Currency {
    return Currency.fromCents(-this.cents)
  }

  percentage(percentage: number): Currency {
    return this.multiply(percentage / 100)
  }

  applyDiscount(discountPercentage: number): Currency {
    return this.subtract(this.percentage(discountPercentage))
  }

  applySurcharge(surchargePercentage: number): Currency {
    return this.add(this.percentage(surchargePercentage))
  }

  round(
    precision: number = 1,
    mode: ROUNDING_MODES = ROUNDING_MODES.ROUND,
  ): Currency {
    return Calculator.round(this, precision, mode)
  }

  format(options: FormatOptions = {}): string {
    return Formatter.format(this, options)
  }

  equals(value: CurrencyInput): boolean {
    return Comparator.equals(this, value)
  }

  greaterThan(value: CurrencyInput): boolean {
    return Comparator.greaterThan(this, value)
  }

  lessThan(value: CurrencyInput): boolean {
    return Comparator.lessThan(this, value)
  }

  greaterThanOrEqual(value: CurrencyInput): boolean {
    return Comparator.greaterThanOrEqual(this, value)
  }

  lessThanOrEqual(value: CurrencyInput): boolean {
    return Comparator.lessThanOrEqual(this, value)
  }

  max(value: CurrencyInput): Currency {
    return Comparator.max(this, value)
  }

  min(value: CurrencyInput): Currency {
    return Comparator.min(this, value)
  }

  toString(): string {
    return this.getValue().toFixed(2)
  }

  valueOf(): number {
    return this.getValue()
  }
}
