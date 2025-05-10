import { CURRENCY_LOCALES, FORMAT_STYLES } from '../config/constants.ts'
import { isNil, isObject } from '../utils/is.ts'
import { singleton } from '../utils/singleton.ts'

import type { CurrencyInput, FormatOptions } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
@singleton
export class Formatter {
  public format(value: CurrencyInput, options: FormatOptions = {}): string {
    if (isNil(value)) {
      throw new Error('O valor não pode ser nulo ou indefinido')
    }

    const numValue =
      isObject(value) && 'getValue' in value ? value.getValue() : Number(value)

    const {
      currencyCode = 'BRL',
      locale = CURRENCY_LOCALES[currencyCode],
      showSymbol = true,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = options

    return new Intl.NumberFormat(locale, {
      style: showSymbol ? FORMAT_STYLES.CURRENCY : FORMAT_STYLES.DECIMAL,
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numValue)
  }
}
