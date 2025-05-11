import { isEmpty } from '../utils/is.ts'
import { ConversionService } from './converter-service.ts'
import { Money } from './money.ts'

import type { MoneyInput, PricedItem } from '../types.ts'

/**
 * Classe responsável por operações matemáticas com valores monetários
 */
export class CalculatorService {
  static #instance: CalculatorService | null = null
  private readonly converter: ConversionService

  private constructor() {
    this.converter = ConversionService.instance
  }

  public static get instance(): CalculatorService {
    if (!CalculatorService.#instance) {
      CalculatorService.#instance = new CalculatorService()
    }
    return CalculatorService.#instance
  }

  //###
  public addition(firstValue: number, secondValue: number): number {
    return firstValue + secondValue
  }

  public subtraction(firstValue: number, secondValue: number): number {
    return firstValue - secondValue
  }

  public multiplication(value: number, factor: number): number {
    return value * factor
  }

  public division(value: number, divisor: number): number {
    if (divisor === 0) {
      throw new Error('Não é possível dividir por zero.')
    }
    return value / divisor
  }

  percentage(cents: number, percentage: number): number {
    return this.multiplication(cents, percentage / 100)
  }

  public calculateAveragePrice(items: PricedItem[] | null): number {
    if (!items || isEmpty(items)) {
      return 0
    }

    const validItems = items.filter((item) => item.price !== undefined)

    if (isEmpty(validItems)) {
      return 0
    }

    const total = validItems.reduce((sum: number, item: PricedItem) => {
      return sum + this.converter.toCents(item.price || 0)
    }, 0)

    return Math.round(total / validItems.length)
  }

  public calculateSubtotal(unitPrice: MoneyInput, quantity: number): Money {
    if (quantity < 0) throw new Error('A quantidade não pode ser negativa.')

    const price = new Money(unitPrice)
    return price.multiply(quantity)
  }

  public calculateTotal(items: PricedItem[] | null): number {
    if (!items || isEmpty(items)) {
      return 0
    }

    return items.reduce((total, item) => {
      if (!item.price) return total

      const quantity = item.quantity || 1
      const itemPrice = this.converter.toCents(item.price)
      const itemTotal = this.multiplication(itemPrice, quantity)

      return this.addition(total, itemTotal)
    }, 0)
  }

  public distributeInstallments(
    value: MoneyInput,
    numberOfInstallments: number,
  ): number[] {
    if (numberOfInstallments <= 0) {
      throw new Error('O número de parcelas deve ser maior que zero.')
    }

    const total = new Money(value)
    const baseCents = Math.floor(total.cents / numberOfInstallments)
    const remainder = total.cents % numberOfInstallments

    return Array.from({ length: numberOfInstallments }, (_, i) => {
      return baseCents + (i < remainder ? 1 : 0)
    })
  }
}
