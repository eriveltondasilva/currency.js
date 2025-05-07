import { ROUNDING_MODES } from '../config/enums.ts'
import { Converter } from './converter.ts'
import { Currency } from './currency.ts'

import type { CurrencyInput, PricedItem } from '../types.ts'

/**
 * Classe responsável por operações matemáticas com valores monetários
 */
export class Calculator {
  static calculateAveragePrice(items: Array<PricedItem> | null): Currency {
    if (!items || items.length === 0) {
      return new Currency(0)
    }

    const validItems = items.filter((item) => item.price !== undefined)

    if (validItems.length === 0) {
      return new Currency(0)
    }

    const total = validItems.reduce((sum: number, item: PricedItem) => {
      const price = item.price || 0
      return sum + Converter.toCents(price)
    }, 0)

    return new Currency(total / (100 * validItems.length))
  }

  static calculateSubtotal(
    unitPrice: CurrencyInput,
    quantity: number,
  ): Currency {
    const price = new Currency(unitPrice)
    return price.multiply(quantity)
  }

  static calculateTotal(items: Array<PricedItem> | null): Currency {
    if (!items || items.length === 0) {
      return new Currency(0)
    }

    return items.reduce((total, item) => {
      if (!item.price) return total
      const quantity = item.quantity || 1
      const itemTotal = Calculator.calculateSubtotal(item.price, quantity)
      return total.add(itemTotal)
    }, new Currency(0))
  }

  static calculatePercentage(
    baseValue: CurrencyInput,
    percentage: number,
  ): Currency {
    const base = new Currency(baseValue)
    return base.multiply(percentage / 100)
  }

  static applyDiscount(
    baseValue: CurrencyInput,
    discountPercentage: number,
  ): Currency {
    const base = new Currency(baseValue)
    const discount = Calculator.calculatePercentage(base, discountPercentage)
    return base.subtract(discount)
  }

  static applySurcharge(
    baseValue: CurrencyInput,
    surchargePercentage: number,
  ): Currency {
    const base = new Currency(baseValue)
    const surcharge = Calculator.calculatePercentage(base, surchargePercentage)
    return base.add(surcharge)
  }

  static distributeInstallments(
    totalValue: CurrencyInput,
    numberOfInstallments: number,
  ): Array<Currency> {
    if (numberOfInstallments <= 0) {
      throw new Error('O número de parcelas deve ser maior que zero.')
    }

    const total = new Currency(totalValue)
    const baseCents = Math.floor(total.getCents() / numberOfInstallments)
    const remainder = total.getCents() % numberOfInstallments

    const installments: Array<Currency> = []

    for (let i = 0; i < numberOfInstallments; i++) {
      const cents = baseCents + (i < remainder ? 1 : 0)
      installments.push(new Currency(cents / 100))
    }

    return installments
  }

  static round(
    value: CurrencyInput,
    precision: number = 1,
    mode: ROUNDING_MODES = ROUNDING_MODES.ROUND,
  ): Currency {
    if (precision <= 0) {
      throw new Error('A precisão deve ser maior que zero.')
    }

    const cents = Converter.toCents(value)
    let roundedCents: number

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        roundedCents = Math.floor(cents / precision) * precision
        break
      case ROUNDING_MODES.CEIL:
        roundedCents = Math.ceil(cents / precision) * precision
        break
      case ROUNDING_MODES.ROUND:
      default:
        roundedCents = Math.round(cents / precision) * precision
        break
    }

    return new Currency(roundedCents / 100)
  }
}
