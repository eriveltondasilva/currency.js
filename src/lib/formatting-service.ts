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
    }).format(extractedMoney)
  }

  //#
  private extractNumericValue(money: MoneyInput): number {
    return isObject(money) && 'value' in money ? money.value : Number(money)
  }
}
