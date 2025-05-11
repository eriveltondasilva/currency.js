import type { CURRENCY_LOCALES, ROUNDING_MODES } from './config/constants.ts'
import type { Money } from './lib/money.ts'

export type CurrencyInput = number | string | Money
export type CurrencyCode = keyof typeof CURRENCY_LOCALES
export type CurrencyLocales =
  (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES]

export type RoundingModes = (typeof ROUNDING_MODES)[keyof typeof ROUNDING_MODES]

export interface PricedItem {
  price: CurrencyInput
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
