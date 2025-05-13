import type { CURRENCY_LOCALES, ROUNDING_MODES } from './config/constants.ts'
import type { MoneyFacade } from './lib/money-facade.ts'

export type CurrencyCode = keyof typeof CURRENCY_LOCALES
export type CurrencyLocales =
  (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES]
export type RoundingModes = (typeof ROUNDING_MODES)[keyof typeof ROUNDING_MODES]

export type MoneyInput = number | string | MoneyFacade

export interface PricedItem {
  price: MoneyInput
  quantity: number
  [key: string]: unknown
}

export interface FormatOptions {
  currencyCode?: CurrencyCode
  locale?: CurrencyLocales
  showSymbol?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

//
export interface IConversionService {
  toCents(value: MoneyInput): number
}

export interface IFormattingService {
  format(value: MoneyInput, options?: FormatOptions): string
}

export interface ICalculationService {
  addition(firstValue: number, secondValue: number): MoneyFacade
  subtraction(firstValue: number, secondValue: number): MoneyFacade
  multiplication(value: number, factor: number): MoneyFacade
  division(value: number, divisor: number): MoneyFacade
  percentage(value: number, percentage: number): MoneyFacade
  //
  calculateSubtotal(item: PricedItem, quantity: number): MoneyFacade
  calculateTotal(items: PricedItem[] | null): MoneyFacade
  calculateAveragePrice(items: PricedItem[] | null): MoneyFacade
  distributeInstallments(
    value: MoneyInput,
    numberOfInstallments: number,
  ): MoneyFacade[]
}

export interface IRoundingService {
  round(value: number, precision: number, mode: RoundingModes): number
}

interface IMoneyProperties {
  cents: number
  value: number
  integer: number
  decimal: number
  isZero: boolean
  isPositive: boolean
  isNegative: boolean
}

interface IMoneyConversion {
  toString(): string
  valueOf(): number
}

interface IMoneyComparison {
  equals(value: MoneyInput): boolean
  greaterThan(value: MoneyInput): boolean
  lessThan(value: MoneyInput): boolean
  greaterThanOrEqual(value: MoneyInput): boolean
  lessThanOrEqual(value: MoneyInput): boolean
  max(value: MoneyInput): MoneyFacade
  min(value: MoneyInput): MoneyFacade
}

interface IMoneyTransformation {
  abs(): MoneyFacade
  negate(): MoneyFacade
  round(precision?: number, mode?: RoundingModes): MoneyFacade
}

interface IMoneyArithmetic {
  plus(value: MoneyInput): MoneyFacade
  minus(value: MoneyInput): MoneyFacade
  times(factor: number): MoneyFacade
  dividedBy(divisor: number): MoneyFacade
}

interface IMoneyBusiness {
  percentage(percentage: number): MoneyFacade
  applyDiscount(discount: number): MoneyFacade
  applySurcharge(surcharge: number): MoneyFacade
  format(options?: FormatOptions): string
}

export interface IMoneyFacade
  extends IMoneyProperties,
    IMoneyConversion,
    IMoneyComparison,
    IMoneyTransformation,
    IMoneyArithmetic,
    IMoneyBusiness {}
