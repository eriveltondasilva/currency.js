import type { CURRENCY_LOCALES, ROUNDING_MODES } from './config/constants.js'
import type { MoneyFacade } from './lib/money.js'

export type CurrencyCode = keyof typeof CURRENCY_LOCALES
export type CurrencyLocales =
  (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES]
export type RoundingModes = (typeof ROUNDING_MODES)[keyof typeof ROUNDING_MODES]

export type MoneyInput = number | string | MoneyFacade

export interface PricedItem {
  price: MoneyInput
  quantity?: number
  [key: string]: unknown
}

export interface FormatOptions {
  currencyCode?: CurrencyCode
  locale?: CurrencyLocales
  showSymbol?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export interface IConversionService {
  toCents(value: MoneyInput): number
}

export interface IFormattingService {
  format(value: MoneyInput, options?: FormatOptions): string
}

export interface IRoundingService {
  round(value: number, precision: number, mode: RoundingModes): number
}

//# export interface ICalculationService {}
interface ICalculationArithmetic {
  addition(firstValue: number, secondValue: number): MoneyFacade
  subtraction(firstValue: number, secondValue: number): MoneyFacade
  multiplication(value: number, factor: number): MoneyFacade
  division(value: number, divisor: number): MoneyFacade
}

interface ICalculationBusiness {
  percentage(value: number, percentage: number): MoneyFacade
  calculateSubtotal(item: PricedItem, quantity: number): MoneyFacade
  calculateTotal(items: PricedItem[] | null): MoneyFacade
  calculateAveragePrice(items: PricedItem[] | null): MoneyFacade
  distributeInstallments(
    value: MoneyInput,
    numberOfInstallments: number,
  ): MoneyFacade[]
}

export interface ICalculationService
  extends ICalculationArithmetic,
    ICalculationBusiness {}

//# Interfaces para a classe MoneyFacade
interface IMoneyProperties {
  cents: number
  value: number
  integer: number
  decimal: number
  isZero: boolean
  isPositive: boolean
  isNegative: boolean
  formatOptions: FormatOptions
}

interface IMoneyConversion {
  toString(): string
  valueOf(): number
  format(options: FormatOptions): string
  clone(): MoneyFacade
}

interface IMoneyComparison {
  equals(value: MoneyInput): boolean
  isBetween(min: MoneyInput, max: MoneyInput): boolean
  greaterThan(value: MoneyInput): boolean
  lessThan(value: MoneyInput): boolean
  greaterThanOrEqual(value: MoneyInput): boolean
  lessThanOrEqual(value: MoneyInput): boolean
}

interface IMoneyTransformation {
  absolute(): MoneyFacade
  max(value: MoneyInput): MoneyFacade
  min(value: MoneyInput): MoneyFacade
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
  allocate(numberOfParts: number): MoneyFacade[]
  applyDiscount(discount: number): MoneyFacade
  applySurcharge(surcharge: number): MoneyFacade
  percentage(percentage: number): MoneyFacade
}

export interface IMoneyFacade
  extends IMoneyProperties,
    IMoneyConversion,
    IMoneyComparison,
    IMoneyTransformation,
    IMoneyArithmetic,
    IMoneyBusiness {}
