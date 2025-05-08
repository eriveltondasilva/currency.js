import { FORMAT_STYLE } from '../config/enums.ts'
import { isObject } from '../utils/is.ts'
import { Converter } from './converter.ts'

import type { CurrencyInput, FormatOptions } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class Formatter {
  static format(value: CurrencyInput, options: FormatOptions = {}): string {
    if (value === null || value === undefined) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    const numValue =
      isObject(value) && 'getValue' in value ? value.getValue() : Number(value)

    const {
      currencyCode = 'BRL',
      locale = Converter.getLocale(currencyCode),
      showSymbol = true,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(locale, {
      style: showSymbol ? FORMAT_STYLE.CURRENCY : FORMAT_STYLE.DECIMAL,
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numValue)
  }
}
