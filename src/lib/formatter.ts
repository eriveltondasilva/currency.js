import { Converter } from './converter.ts'
import { Currency } from './currency.ts'

import type { CurrencyInput, FormatOptions } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class Formatter {
  static format(value: CurrencyInput, options: FormatOptions = {}): string {
    const numValue =
      value instanceof Currency ? value.getValue() : Number(value)
    const {
      currencyCode = 'BRL',
      locale = Converter.getLocaleForCurrency(currencyCode),
      showSymbol = true,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(locale, {
      style: showSymbol ? 'currency' : 'decimal',
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numValue)
  }
}
