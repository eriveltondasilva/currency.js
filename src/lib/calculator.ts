import { isEmpty } from '../utils/is.ts'
import { Converter } from './converter.ts'
import { Currency } from './currency.ts'

import type { CurrencyInput, PricedItem } from '../types.ts'

/**
 * Classe responsável por operações matemáticas com valores monetários
 */
export class Calculator {
  static calculateAveragePrice(items: PricedItem[] | null): Currency {
    if (!items || isEmpty(items)) {
      return Currency.zero()
    }

    const validItems = items.filter((item) => item.price !== undefined)

    if (isEmpty(validItems)) {
      return Currency.zero()
    }

    const total = validItems.reduce((sum: number, item: PricedItem) => {
      return sum + Converter.toCents(item.price || 0)
    }, 0)

    return Currency.fromCents(Math.round(total / validItems.length))
  }

  static calculateSubtotal(
    unitPrice: CurrencyInput,
    quantity: number,
  ): Currency {
    if (quantity < 0) throw new Error('A quantidade não pode ser negativa.')

    const price = new Currency(unitPrice)
    return price.multiply(quantity)
  }

  static calculateTotal(items: PricedItem[] | null): Currency {
    if (!items || isEmpty(items)) {
      return Currency.zero()
    }

    return items.reduce((total, item) => {
      if (!item.price) return total

      const quantity = item.quantity || 1
      const itemPrice = new Currency(item.price)
      const itemTotal = itemPrice.multiply(quantity)

      return total.add(itemTotal)
    }, Currency.zero())
  }

  static distributeInstallments(
    totalValue: CurrencyInput,
    numberOfInstallments: number,
  ): Currency[] {
    if (numberOfInstallments <= 0) {
      throw new Error('O número de parcelas deve ser maior que zero.')
    }

    const total = new Currency(totalValue)
    const baseCents = Math.floor(total.getCents() / numberOfInstallments)
    const remainder = total.getCents() % numberOfInstallments

    return Array.from({ length: numberOfInstallments }, (_, i) => {
      const cents = baseCents + (i < remainder ? 1 : 0)
      return Currency.fromCents(cents)
    })
  }
}
