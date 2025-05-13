import { isEmpty, isNil } from '../utils/is.ts'
import { ConversionService } from './conversion-service.ts'
import { MoneyFacade } from './money-facade.ts'

import type {
  FormatOptions,
  ICalculationService,
  MoneyInput,
  PricedItem,
} from '../types.ts'

/**
 * Classe responsável por operações matemáticas com valores monetários.
 * Implementa o padrão Singleton para garantir uma única instância em toda a aplicação.
 *
 * @example
 * // Obter a instância do serviço
 * const calculator = CalculationService.instance
 *
 * // Configurar opções de formatação
 * calculator.setConfigure({ currencyCode: 'BRL' })
 *
 * // Realizar operações
 * const total = calculator.addition('10.50', 5.75)
 */
export class CalculationService implements ICalculationService {
  static _instance: CalculationService
  private readonly converter: ConversionService = ConversionService.instance
  private formatOptions: FormatOptions = {}

  private constructor() {}

  public static get instance(): CalculationService {
    return (this._instance ??= new this())
  }

  // ###

  /**
   * Configura as opções de formatação para os resultados
   *
   * @example
   * calculator.setConfigure({
   *   currencyCode?: 'BRL',
   *   locale?: 'pt-BR',
   *   showSymbol?: true,
   *   minimumFractionDigits?: 2,
   *   maximumFractionDigits?: 2,
   * });
   *
   * @param options Opções de formatação
   * @returns A instância atual para encadeamento de métodos
   */
  public setConfigure(options: FormatOptions = {}): CalculationService {
    this.formatOptions = { ...this.formatOptions, ...options }
    return this
  }

  /**
   * Soma dois valores monetários
   *
   * @example
   * // Soma R$ 10,50 + R$ 5,75 = R$ 16,25
   * const total = calculator.addition('10.50', 5.75);
   * console.log(total.format()); // R$ 16,25
   *
   * @param firstValue Primeiro valor
   * @param secondValue Segundo valor
   * @returns Resultado da soma como MoneyFacade
   */
  public addition(
    firstValue: MoneyInput,
    secondValue: MoneyInput,
  ): MoneyFacade {
    const result =
      this.converter.toCents(firstValue) + this.converter.toCents(secondValue)
    return MoneyFacade.fromCents(result, this.formatOptions)
  }

  /**
   * Subtrai o segundo valor do primeiro
   *
   * @example
   * // Subtrai R$ 5,75 de R$ 10,50 = R$ 4,75
   * const difference = calculator.subtraction('10.50', 5.75);
   * console.log(difference.format()); // R$ 4,75
   *
   * @param firstValue Valor base
   * @param secondValue Valor a ser subtraído
   * @returns Resultado da subtração como MoneyFacade
   */
  public subtraction(
    firstValue: MoneyInput,
    secondValue: MoneyInput,
  ): MoneyFacade {
    const result =
      this.converter.toCents(firstValue) - this.converter.toCents(secondValue)
    return MoneyFacade.fromCents(result, this.formatOptions)
  }

  /**
   * Multiplica um valor monetário por um fator
   *
   * @example
   * // Multiplica R$ 10,50 por 3 = R$ 31,50
   * const tripled = calculator.multiplication('10.50', 3);
   * console.log(tripled.format()); // R$ 31,50
   *
   * @param value Valor monetário
   * @param factor Fator de multiplicação
   * @returns Resultado da multiplicação como MoneyFacade
   */
  public multiplication(value: MoneyInput, factor: number): MoneyFacade {
    if (factor <= 0) {
      throw new Error(
        'Não é possível multiplicar por zero ou um número negativo.',
      )
    }

    const cents = this.converter.toCents(value)
    return MoneyFacade.fromCents(cents * factor, this.formatOptions)
  }

  /**
   * Divide um valor monetário por um divisor
   *
   * @example
   * // Divide R$ 10,50 por 2 = R$ 5,25
   * const half = calculator.division('10.50', 2);
   * console.log(half.format()); // R$ 5,25
   *
   * @param value Valor monetário
   * @param divisor Divisor
   * @returns Resultado da divisão como MoneyFacade
   */
  public division(value: MoneyInput, divisor: number): MoneyFacade {
    if (divisor <= 0) {
      throw new Error('Não é possível dividir por zero ou um número negativo.')
    }

    const cents = this.converter.toCents(value)
    return MoneyFacade.fromCents(cents / divisor, this.formatOptions)
  }

  /**
   * Calcula uma porcentagem de um valor monetário
   *
   * @example
   * // Calcula 15% de R$ 100,00 = R$ 15,00
   * const tax = calculator.percentage('100.00', 15);
   * console.log(tax.format()); // R$ 15,00
   *
   * @param value Valor monetário
   * @param percentage Porcentagem a ser calculada
   * @returns Resultado do cálculo como MoneyFacade
   */
  public percentage(value: MoneyInput, percentage: number): MoneyFacade {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativa.')
    }
    return this.multiplication(value, percentage / 100)
  }

  /**
   * Calcula o preço médio de uma lista de itens
   *
   * @example
   * // Calcula o preço médio de uma lista de produtos
   * const items = [
   *   { name: 'Produto 1', price: '10.50' },
   *   { name: 'Produto 2', price: '15.75' },
   *   { name: 'Produto 3', price: '20.00' }
   * ];
   * const average = calculator.calculateAveragePrice(items);
   * console.log(average.format()); // R$ 15,42
   *
   * @param items Lista de itens com preço
   * @returns Preço médio como MoneyFacade
   */
  public calculateAveragePrice(items: PricedItem[] | null): MoneyFacade {
    if (!items || isEmpty(items)) {
      return MoneyFacade.zero(this.formatOptions)
    }

    const validItems = items.filter(({ price }) => !isNil(price))

    if (isEmpty(validItems)) {
      return MoneyFacade.zero(this.formatOptions)
    }

    const total = validItems.reduce((sum, { price }) => {
      return sum + this.converter.toCents(price || 0)
    }, 0)

    return MoneyFacade.fromCents(total / validItems.length, this.formatOptions)
  }

  /**
   * Calcula o subtotal de um item baseado no preço unitário e quantidade
   *
   * @example
   * // Calcula o subtotal de 3 unidades de um produto de R$ 10,50 = R$ 31,50
   * const item = { name: 'Produto', price: '10.50', quantity: 3 };
   * const subtotal = calculator.calculateSubtotal(item);
   * console.log(subtotal.format()); // R$ 31,50
   *
   * @param item item com preço e quantidade
   * @returns Subtotal como MoneyFacade
   */
  public calculateSubtotal({ price, quantity = 1 }: PricedItem): MoneyFacade {
    const cents = this.converter.toCents(price || 0)
    return MoneyFacade.fromCents(cents * quantity, this.formatOptions)
  }

  /**
   * Calcula o total de uma lista de itens
   *
   * @example
   * // Calcula o total de uma lista de produtos com quantidades
   * const items = [
   *   { name: 'Produto 1', price: '10.50', quantity: 2 },
   *   { name: 'Produto 2', price: '15.75', quantity: 1 },
   *   { name: 'Produto 3', price: '20.00', quantity: 3 }
   * ];
   * const total = calculator.calculateTotal(items);
   * console.log(total.format()); // R$ 97,75
   *
   * @param items Lista de itens com preço e quantidade
   * @returns Total como MoneyFacade
   */
  public calculateTotal(items: PricedItem[] | null): MoneyFacade {
    if (!items || isEmpty(items)) {
      return MoneyFacade.zero(this.formatOptions)
    }

    const total = items.reduce((sum, { price, quantity = 1 }) => {
      if (!price) return sum

      const cents = this.converter.toCents(price || 0)
      const itemTotal = cents * quantity

      return sum + itemTotal
    }, 0)

    return MoneyFacade.fromCents(total, this.formatOptions)
  }

  /**
   * Distribui um valor em parcelas iguais, ajustando centavos restantes nas primeiras parcelas
   *
   * @example
   * // Divide R$ 100,00 em 3 parcelas: [R$ 33,34, R$ 33,33, R$ 33,33]
   * const installments = calculator.distributeInstallments('100.00', 3);
   * installments.forEach((inst, i) => {
   *   console.log(`Parcela ${i+1}: ${inst.format()}`);
   * });
   * // Parcela 1: R$ 33,34
   * // Parcela 2: R$ 33,33
   * // Parcela 3: R$ 33,33
   *
   * @param value Valor total a ser parcelado
   * @param numberOfInstallments Número de parcelas
   * @returns Array de parcelas como MoneyFacade[]
   * @throws Error se o número de parcelas for menor ou igual a zero
   */
  public distributeInstallments(
    value: MoneyInput,
    numberOfInstallments: number,
  ): MoneyFacade[] {
    if (numberOfInstallments <= 0) {
      throw new Error('O número de parcelas deve ser maior que zero.')
    }

    const cents = this.converter.toCents(value)
    const baseCents = Math.floor(cents / numberOfInstallments)
    const remainder = cents % numberOfInstallments

    return Array.from({ length: numberOfInstallments }, (_, i) => {
      const installmentValue = baseCents + (i < remainder ? 1 : 0)
      return MoneyFacade.fromCents(installmentValue, this.formatOptions)
    })
  }
}
