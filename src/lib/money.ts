import { CENT_FACTOR, ROUNDING_MODES } from '../config/constants.ts'
import { ConversionService } from './conversion-service.ts'
import { FormattingService } from './formatting-service.ts'
import { RoundingService } from './rounding-service.ts'

import type { FormatOptions, MoneyInput, RoundingModes } from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class Money {
  private _cents: number = 0
  private readonly converter: ConversionService
  private readonly formatter: FormattingService
  private readonly rounder: RoundingService
  private readonly formatOptions: FormatOptions

  constructor(value: MoneyInput = 0, options: FormatOptions = {}) {
    this.converter = ConversionService.instance
    this.formatter = FormattingService.instance
    this.rounder = RoundingService.instance
    this.formatOptions = options
    this._cents = value === 0 ? 0 : this.converter.toCents(value)
  }

  //# Construção
  private static fromCents(value: number, options: FormatOptions): Money {
    const currency = new Money(0, options)
    currency.cents = value
    return currency
  }

  public static fromValue(value: number, options: FormatOptions): Money {
    return new Money(value, options)
  }

  public static configure(options: FormatOptions): Money {
    return new Money(0, options)
  }

  //* 
  private set cents(value: number) {
    this._cents = Math.round(value)
  }

  //* OBTENÇÃO DE VALORES
  public get cents(): number {
    return this._cents
  }

  public get value(): number {
    return this._cents / CENT_FACTOR
  }

  public get integer(): number {
    return Math.floor(Math.abs(this._cents) / CENT_FACTOR)
  }

  public get decimal(): number {
    return (Math.abs(this._cents) % CENT_FACTOR) / CENT_FACTOR
  }

  public toString(): string {
    return this.value.toFixed(2)
  }

  public valueOf(): number {
    return this.value
  }

  //* VERIFICAÇÕES DE ESTADO
  public get isZero(): boolean {
    return this._cents === 0
  }

  public get isPositive(): boolean {
    return this._cents > 0
  }

  public get isNegative(): boolean {
    return this._cents < 0
  }

  //* COMPARAÇÃO
  public equals(value: MoneyInput): boolean {
    return this._cents === this.converter.toCents(value)
  }

  public greaterThan(value: MoneyInput): boolean {
    return this._cents > this.converter.toCents(value)
  }

  public lessThan(value: MoneyInput): boolean {
    return this._cents < this.converter.toCents(value)
  }

  public greaterThanOrEqual(value: MoneyInput): boolean {
    return this._cents >= this.converter.toCents(value)
  }

  public lessThanOrEqual(value: MoneyInput): boolean {
    return this._cents <= this.converter.toCents(value)
  }

  public max(value: MoneyInput): Money {
    const otherCents = this.converter.toCents(value)
    if (this._cents >= otherCents) return this

    return Money.fromCents(otherCents, this.formatOptions)
  }

  public min(value: MoneyInput): Money {
    const otherCents = this.converter.toCents(value)
    if (this._cents <= otherCents) return this

    return Money.fromCents(otherCents, this.formatOptions)
  }

  //* OPERAÇÕES BÁSICAS
  public abs(): Money {
    if (this.isPositive || this.isZero) return this
    return Money.fromCents(Math.abs(this._cents), this.formatOptions)
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
    if (factor <= 0) {
      throw new Error('O fator de multiplicação deve ser positivo.')
    }
    if (factor === 1) return this
    return Money.fromCents(this._cents * factor, this.formatOptions)
  }

  public divideBy(divisor: number): Money {
    if (divisor <= 0) {
      throw new Error('Não é possível dividir por zero ou negativo.')
    }
    if (divisor === 1) return this
    return Money.fromCents(this._cents / divisor, this.formatOptions)
  }

  public negate(): Money {
    if (this.isZero) return this
    return Money.fromCents(-this._cents, this.formatOptions)
  }

  //* PERCENTUAIS E DESCONTOS
  public percentage(percentage: number): Money {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativo.')
    }
    return this.times(percentage / 100)
  }

  public applyDiscount(discountPercentage: number): Money {
    if (discountPercentage <= 0) {
      throw new Error('O percentual de desconto não pode ser zero ou negativo.')
    }
    return this.minus(this.percentage(discountPercentage))
  }

  public applySurcharge(surchargePercentage: number): Money {
    if (surchargePercentage <= 0) {
      throw new Error(
        'O percentual de acréscimo não pode ser zero ou negativo.',
      )
    }
    return this.plus(this.percentage(surchargePercentage))
  }

  //* ARREDONDAMENTO
  public round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): Money {
    const roundedCents = this.rounder.round(this._cents, precision, mode)

    if (roundedCents === this._cents) return this
    return Money.fromCents(roundedCents, this.formatOptions)
  }

  //* FORMATAÇÃO
  public format(options: FormatOptions = {}): string {
    const mergedOptions = { ...this.formatOptions, ...options }
    return this.formatter.format(this, mergedOptions)
  }
}
