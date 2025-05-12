import { CURRENCY_LOCALES, FORMAT_STYLES } from '../config/constants.ts'
import { isNil, isObject } from '../utils/is.ts'

import type { FormatOptions, IFormattingService, MoneyInput } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class FormattingService implements IFormattingService {
  private static _instance: FormattingService

  private constructor() {}
  public static get instance(): FormattingService {
    return (this._instance ??= new this())
  }

  //#
  public format(value: MoneyInput, options: FormatOptions = {}): string {
    if (isNil(value)) throw new Error('O valor não pode ser nulo ou indefinido')

    const extractedMoney = this.extractNumericValue(value)

    const DEFAULT_FRACTION_DIGITS = 2
    const DEFAULT_CURRENCY = 'USD'

    const {
      currencyCode = DEFAULT_CURRENCY,
      locale = CURRENCY_LOCALES[currencyCode],
      showSymbol = true,
      minimumFractionDigits = DEFAULT_FRACTION_DIGITS,
      maximumFractionDigits = DEFAULT_FRACTION_DIGITS,
    } = options

    return new Intl.NumberFormat(locale, {
      style: showSymbol ? FORMAT_STYLES.CURRENCY : FORMAT_STYLES.DECIMAL,
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(extractedMoney)
  }

  //#
  private extractNumericValue(money: MoneyInput): number {
    return isObject(money) && 'value' in money ? money.value : Number(money)
  }
}
