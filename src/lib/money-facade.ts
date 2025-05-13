import { CENT_FACTOR, ROUNDING_MODES } from '../config/constants.ts'
import { ConversionService } from './conversion-service.ts'
import { FormattingService } from './formatting-service.ts'
import { RoundingService } from './rounding-service.ts'

import type {
  FormatOptions,
  IMoneyFacade,
  MoneyInput,
  RoundingModes,
} from '../types.ts'

/**
 * Representa um valor monetário com precisão de 2 casas decimais
 */
export class MoneyFacade implements IMoneyFacade {
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
  public static fromCents(value: number, options: FormatOptions): MoneyFacade {
    const currency = new MoneyFacade(0, options)
    currency.cents = value
    return currency
  }

  public static zero(options: FormatOptions = {}): MoneyFacade {
    return new MoneyFacade(0, options)
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

  public max(value: MoneyInput): MoneyFacade {
    const otherCents = this.converter.toCents(value)
    if (this._cents >= otherCents) return this

    return MoneyFacade.fromCents(otherCents, this.formatOptions)
  }

  public min(value: MoneyInput): MoneyFacade {
    const otherCents = this.converter.toCents(value)
    if (this._cents <= otherCents) return this

    return MoneyFacade.fromCents(otherCents, this.formatOptions)
  }

  //* OPERAÇÕES BÁSICAS
  public abs(): MoneyFacade {
    if (this.isPositive || this.isZero) return this
    return MoneyFacade.fromCents(Math.abs(this._cents), this.formatOptions)
  }

  public plus(value: MoneyInput): MoneyFacade {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this
    return MoneyFacade.fromCents(this.cents + valueCents, this.formatOptions)
  }

  public minus(value: MoneyInput): MoneyFacade {
    const valueCents = this.converter.toCents(value)
    if (valueCents === 0) return this
    return MoneyFacade.fromCents(this.cents - valueCents, this.formatOptions)
  }

  public times(factor: number): MoneyFacade {
    if (factor <= 0) {
      throw new Error('O fator de multiplicação deve ser positivo.')
    }
    if (factor === 1) return this
    return MoneyFacade.fromCents(this._cents * factor, this.formatOptions)
  }

  public dividedBy(divisor: number): MoneyFacade {
    if (divisor <= 0) {
      throw new Error('Não é possível dividir por zero ou negativo.')
    }
    if (divisor === 1) return this
    return MoneyFacade.fromCents(this._cents / divisor, this.formatOptions)
  }

  public negate(): MoneyFacade {
    if (this.isZero) return this
    return MoneyFacade.fromCents(-this._cents, this.formatOptions)
  }

  //* PERCENTUAIS E DESCONTOS
  public percentage(percentage: number): MoneyFacade {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativo.')
    }
    return this.times(percentage / 100)
  }

  public applyDiscount(discount: number): MoneyFacade {
    if (discount <= 0) {
      throw new Error('O percentual de desconto não pode ser zero ou negativo.')
    }
    return this.minus(this.percentage(discount))
  }

  public applySurcharge(surcharge: number): MoneyFacade {
    if (surcharge <= 0) {
      throw new Error(
        'O percentual de acréscimo não pode ser zero ou negativo.',
      )
    }
    return this.plus(this.percentage(surcharge))
  }

  //* ARREDONDAMENTO
  public round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): MoneyFacade {
    const roundedCents = this.rounder.round(this._cents, precision, mode)

    if (roundedCents === this._cents) return this
    return MoneyFacade.fromCents(roundedCents, this.formatOptions)
  }

  //* FORMATAÇÃO
  public format(options: FormatOptions = {}): string {
    const mergedOptions = { ...this.formatOptions, ...options }
    return this.formatter.format(this, mergedOptions)
  }
}
