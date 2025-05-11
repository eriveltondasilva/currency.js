// import { isEmpty } from '../utils/is.ts'
// import { Converter } from './converter.ts'
// import { Money } from './money.ts'

// import type { CurrencyInput, PricedItem } from '../types.ts'

// /**
//  * Classe responsável por operações matemáticas com valores monetários
//  */
// export class Calculator {
//   private readonly converter: Converter

//   private constructor() {
//     this.converter = Converter.instance
//   }

//   public static get instance(): Calculator {
//     return new Calculator()
//   }

//   //#
//   public calculateAveragePrice(items: PricedItem[] | null): Money {
//     if (!items || isEmpty(items)) {
//       return Money.zero()
//     }

//     const validItems = items.filter((item) => item.price !== undefined)

//     if (isEmpty(validItems)) {
//       return Money.zero()
//     }

//     const total = validItems.reduce((sum: number, item: PricedItem) => {
//       return sum + Converter.toCents(item.price || 0)
//     }, 0)

//     return Money.fromCents(Math.round(total / validItems.length))
//   }

//   static calculateSubtotal(unitPrice: CurrencyInput, quantity: number): Money {
//     if (quantity < 0) throw new Error('A quantidade não pode ser negativa.')

//     const price = new Money(unitPrice)
//     return price.multiply(quantity)
//   }

//   static calculateTotal(items: PricedItem[] | null): Money {
//     if (!items || isEmpty(items)) {
//       return Money.zero()
//     }

//     return items.reduce((total, item) => {
//       if (!item.price) return total

//       const quantity = item.quantity || 1
//       const itemPrice = new Money(item.price)
//       const itemTotal = itemPrice.multiply(quantity)

//       return total.add(itemTotal)
//     }, Money.zero())
//   }

//   static distributeInstallments(
//     totalValue: CurrencyInput,
//     numberOfInstallments: number,
//   ): Money[] {
//     if (numberOfInstallments <= 0) {
//       throw new Error('O número de parcelas deve ser maior que zero.')
//     }

//     const total = new Money(totalValue)
//     const baseCents = Math.floor(total.getCents() / numberOfInstallments)
//     const remainder = total.getCents() % numberOfInstallments

//     return Array.from({ length: numberOfInstallments }, (_, i) => {
//       const cents = baseCents + (i < remainder ? 1 : 0)
//       return Money.fromCents(cents)
//     })
//   }
// }
