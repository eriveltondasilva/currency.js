import { isEmpty, isNil } from '../utils/is.ts'
import { ConversionService } from './conversion-service.ts'

import type { MoneyInput, PricedItem } from '../types.ts'

/**
 * Classe responsável por operações matemáticas com valores monetários
 */
export class CalculationService {
  static _instance: CalculationService
  private readonly converter: ConversionService

  private constructor() {
    this.converter = ConversionService.instance
  }

  public static get instance(): CalculationService {
    return (this._instance ??= new this())
  }

  //###
  public addition(firstValue: number, secondValue: number): number {
    if (Number.isNaN(firstValue) || Number.isNaN(secondValue)) {
      throw new Error('Os valores devem ser números válidos.')
    }
    return (
      this.converter.toCents(firstValue) + this.converter.toCents(secondValue)
    )
  }

  public subtraction(firstValue: number, secondValue: number): number {
    if (Number.isNaN(firstValue) || Number.isNaN(secondValue)) {
      throw new Error('Os valores devem ser números válidos.')
    }
    return (
      this.converter.toCents(firstValue) - this.converter.toCents(secondValue)
    )
  }

  public multiplication(value: number, factor: number): number {
    if (Number.isNaN(value) || Number.isNaN(factor)) {
      throw new Error('Os valores devem ser números válidos.')
    }
    if (factor <= 0) {
      throw new Error(
        'Não é possível multiplicar por zero ou um número negativo.',
      )
    }

    const cents = this.converter.toCents(value)

    if (factor === 1) return cents
    return cents * factor
  }

  public division(value: number, divisor: number): number {
    if (Number.isNaN(value) || Number.isNaN(divisor)) {
      throw new Error('Os valores devem ser números válidos.')
    }
    if (divisor <= 0) {
      throw new Error('Não é possível dividir por zero ou um número negativo.')
    }

    const cents = this.converter.toCents(value)

    if (divisor === 1) return cents
    return cents / divisor
  }

  public percentage(value: number, percentage: number): number {
    return this.multiplication(value, percentage / 100)
  }

  public calculateAveragePrice(items: PricedItem[] | null): number {
    if (!items || isEmpty(items)) {
      return 0
    }

    const validItems = items.filter((item) => !isNil(item.price))

    if (isEmpty(validItems)) {
      return 0
    }

    const total = validItems.reduce((sum, item) => {
      return sum + this.converter.toCents(item.price || 0)
    }, 0)

    return this.division(total, validItems.length)
  }

  public calculateSubtotal(unitPrice: MoneyInput, quantity: number): number {
    if (quantity <= 0) throw new Error('A quantidade não pode ser negativa.')

    const price = this.converter.toCents(unitPrice)
    return this.multiplication(price, quantity)
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

    const cents = this.converter.toCents(value)
    const baseCents = Math.floor(cents / numberOfInstallments)
    const remainder = cents % numberOfInstallments

    return Array.from({ length: numberOfInstallments }, (_, i) => {
      return baseCents + (i < remainder ? 1 : 0)
    })
  }
}
