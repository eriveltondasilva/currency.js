import type { CURRENCY_LOCALES, ROUNDING_MODES } from './config/constants.ts'
import type { Money } from './lib/money.ts'

export type CurrencyCode = keyof typeof CURRENCY_LOCALES
export type CurrencyLocales =
  (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES]
export type RoundingModes = (typeof ROUNDING_MODES)[keyof typeof ROUNDING_MODES]

export type MoneyInput = number | string | Money

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
  add(cents1: number, cents2: number): number
  subtract(cents1: number, cents2: number): number
  multiply(cents: number, factor: number): number
  divide(cents: number, divisor: number): number
  percentage(cents: number, percentage: number): number
  round(cents: number, precision: number, mode: RoundingModes): number
  calculateAveragePrice(items: PricedItem[] | null): number
  calculateTotal(items: PricedItem[] | null): number
  distributeInstallments(cents: number, numberOfInstallments: number): number[]
}
