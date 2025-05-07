import { Currency } from './lib/currency.js'
import type { CURRENCY_LOCALES } from './config/enums.ts'

export type CurrencyInput = number | string | Currency

export type CurrencyCode = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'JPY'

export interface PricedItem {
  price?: CurrencyInput
  quantity?: number
}

export interface FormatOptions {
  currencyCode?: CurrencyCode
  locale?: CURRENCY_LOCALES
  showSymbol?: boolean
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}
