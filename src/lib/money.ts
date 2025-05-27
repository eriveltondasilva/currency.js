import { CENT_FACTOR, ROUNDING_MODES } from '@/config/constants.js'
import { ConversionService } from './conversion-service.js'
import { FormattingService } from './formatting-service.js'
import { RoundingService } from './rounding-service.js'

import type {
  FormatOptions,
  IMoneyFacade,
  MoneyInput,
  RoundingModes,
} from '@/types.js'

/**
 * Classe MoneyFacade - Implementa operações aritméticas, comparações e formatação
 * para manipulação segura de valores monetários.
 *
 * Esta classe utiliza centavos como unidade interna para evitar problemas de precisão
 * com números de ponto flutuante em operações financeiras.
 */
export class MoneyFacade implements IMoneyFacade {
  /** Valor em centavos */
  private readonly _cents: number = 0
  private readonly converter: ConversionService
  private readonly formatter: FormattingService
  private readonly rounder: RoundingService
  private readonly options: FormatOptions

  /**
   * Cria uma nova instância de MoneyFacade.
   *
   * @param value - Valor monetário inicial (número, string ou instância MoneyFacade)
   * @param options - Opções de formatação para esta instância
   *
   * @example
   * // Diferentes formas de criar instâncias MoneyFacade
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade("10.50");
   * const c = new MoneyFacade("10,50");
   * const d = new MoneyFacade("$10.50");
   * const e = new MoneyFacade("R$ 10,50");
   * const f = new MoneyFacade(a);
   * const g = new MoneyFacade(1050, { currencyCode: 'BRL' });
   */
  constructor(value: MoneyInput = 0, options: FormatOptions = {}) {
    this.converter = ConversionService.instance
    this.formatter = FormattingService.instance
    this.rounder = RoundingService.instance
    this.options = { ...options }

    this._cents = !value ? 0 : this.converter.toCents(value)
  }

  /**
   * Cria uma instância de MoneyFacade a partir de um valor em centavos.
   *
   * @param value - Valor em centavos (inteiro)
   * @param options - Opções de formatação
   * @returns Nova instância de MoneyFacade
   *
   * @example
   * // Criar MoneyFacade a partir de 1050 centavos (equivalente a 10.50)
   * const money = MoneyFacade.fromCents(1050, { currencyCode: 'BRL' });
   */
  public static fromCents(
    value: number,
    options: FormatOptions = {},
  ): MoneyFacade {
    if (!Number.isFinite(value)) {
      throw new Error('O valor em centavos deve ser um número finito')
    }

    const currency = new MoneyFacade(0, options)
    Object.defineProperty(currency, '_cents', { value: Math.round(value) })
    return currency
  }

  /**
   * Cria uma instância de MoneyFacade com valor zero.
   *
   * @param options - Opções de formatação
   * @returns Nova instância de MoneyFacade com valor zero
   *
   * @example
   * const zero = MoneyFacade.zero({ currencyCode: 'EUR' });
   */
  public static zero(options: FormatOptions = {}): MoneyFacade {
    return new MoneyFacade(0, options)
  }

  /**
   * Obtém o valor em centavos.
   *
   * @returns Valor em centavos como número inteiro
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.cents); // 1050
   */
  public get cents(): number {
    return this._cents
  }

  /**
   * Obtém o valor monetário como número decimal.
   *
   * @returns Valor monetário (ex: 10.50)
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.value); // 10.5
   */
  public get value(): number {
    return this._cents / CENT_FACTOR
  }

  /**
   * Obtém a parte inteira do valor monetário.
   *
   * @returns Parte inteira do valor (ex: para 10.50 retorna 10)
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.integer); // 10
   */
  public get integer(): number {
    return Math.floor(Math.abs(this._cents) / CENT_FACTOR)
  }

  /**
   * Obtém a parte decimal do valor monetário.
   *
   * @returns Parte decimal como fração (ex: para 10.50 retorna 0.50)
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.decimal); // 0.5
   */
  public get decimal(): number {
    return (Math.abs(this._cents) % CENT_FACTOR) / CENT_FACTOR
  }

  /**
   * Obtém as opções de formatação.
   * @returns formatOptions
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.formatOptions); // { currencyCode: 'USD', locale: 'en-US' }
   */
  public get formatOptions(): FormatOptions {
    return this.options || {}
  }

  /**
   * Verifica se o valor monetário é zero.
   *
   * @returns true se o valor for zero, false caso contrário
   *
   * @example
   * const money = new MoneyFacade(0);
   * console.log(money.isZero); // true
   */
  public get isZero(): boolean {
    return this._cents === 0
  }

  /**
   * Verifica se o valor monetário é positivo.
   *
   * @returns true se o valor for maior que zero, false caso contrário
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.isPositive); // true
   */
  public get isPositive(): boolean {
    return this._cents > 0
  }

  /**
   * Verifica se o valor monetário é negativo.
   *
   * @returns true se o valor for menor que zero, false caso contrário
   *
   * @example
   * const money = new MoneyFacade(-10.50);
   * console.log(money.isNegative); // true
   */
  public get isNegative(): boolean {
    return this._cents < 0
  }

  /**
   * Retorna uma cópia desta instância de MoneyFacade.
   *
   * @returns Nova instância de MoneyFacade com o mesmo valor e opções
   *
   * @example
   * const original = new MoneyFacade(10.50, { currencyCode: 'BRL' });
   * const copy = original.clone();
   */
  public clone(): MoneyFacade {
    return MoneyFacade.fromCents(this._cents, this.options)
  }

  /**
   * Formata o valor monetário de acordo com as opções especificadas.
   *
   * @param options - Opções de formatação que substituem as opções padrão
   * @returns String formatada representando o valor monetário
   *
   * @example
   * const price = new MoneyFacade(1234.56);
   * console.log(price.format()); // R$ 1.234,56 (com opções padrão)
   * console.log(price.format({ currencyCode: 'USD', locale: 'en-US' })); // $1,234.56
   */
  public format(options: FormatOptions = {}): string {
    const mergedOptions = { ...this.options, ...options }
    return this.formatter.format(this, mergedOptions)
  }

  /**
   * Converte o valor monetário para string com duas casas decimais.
   *
   * @returns Representação do valor como string (ex: "10.50")
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(money.toString()); // "10.50"
   */
  public toString(): string {
    return this.value.toFixed(2)
  }

  /**
   * Retorna o valor primitivo para operações de coerção.
   *
   * @returns Valor numérico
   *
   * @example
   * const money = new MoneyFacade(10.50);
   * console.log(+money); // 10.5
   */
  public valueOf(): number {
    return this.value
  }

  /**
   * Verifica se este valor monetário é igual a outro.
   *
   * @param value - Valor a ser comparado
   * @returns true se os valores são iguais, false caso contrário
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(10.50);
   * console.log(a.equals(b)); // true
   */
  public equals(value: MoneyInput): boolean {
    return this._cents === this.converter.toCents(value)
  }

  /**
   * Verifica se o valor está dentro de um intervalo especificado (inclusivo).
   *
   * @param min - Valor mínimo do intervalo
   * @param max - Valor máximo do intervalo
   * @returns true se o valor estiver dentro do intervalo, false caso contrário
   *
   * @example
   * const price = new MoneyFacade(50);
   * console.log(price.isBetween(10, 100)); // true
   */
  public isBetween(min: MoneyInput, max: MoneyInput): boolean {
    const minCents = this.converter.toCents(min)
    const maxCents = this.converter.toCents(max)

    if (minCents > maxCents) {
      throw new Error('O valor mínimo não pode ser maior que o valor máximo')
    }

    return this._cents >= minCents && this._cents <= maxCents
  }

  /**
   * Verifica se este valor monetário é maior que outro.
   *
   * @param value - Valor a ser comparado
   * @returns true se este valor for maior, false caso contrário
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(5.25);
   * console.log(a.greaterThan(b)); // true
   */
  public greaterThan(value: MoneyInput): boolean {
    return this._cents > this.converter.toCents(value)
  }

  /**
   * Verifica se este valor monetário é menor que outro.
   *
   * @param value - Valor a ser comparado
   * @returns true se este valor for menor, false caso contrário
   *
   * @example
   * const a = new MoneyFacade(5.25);
   * const b = new MoneyFacade(10.50);
   * console.log(a.lessThan(b)); // true
   */
  public lessThan(value: MoneyInput): boolean {
    return this._cents < this.converter.toCents(value)
  }

  /**
   * Verifica se este valor monetário é maior ou igual a outro.
   *
   * @param value - Valor a ser comparado
   * @returns true se este valor for maior ou igual, false caso contrário
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(10.50);
   * console.log(a.greaterThanOrEqual(b)); // true
   */
  public greaterThanOrEqual(value: MoneyInput): boolean {
    return this._cents >= this.converter.toCents(value)
  }

  /**
   * Verifica se este valor monetário é menor ou igual a outro.
   *
   * @param value - Valor a ser comparado
   * @returns true se este valor for menor ou igual, false caso contrário
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(10.50);
   * console.log(a.lessThanOrEqual(b)); // true
   */
  public lessThanOrEqual(value: MoneyInput): boolean {
    return this._cents <= this.converter.toCents(value)
  }

  /**
   * Retorna o valor absoluto deste valor monetário.
   *
   * @returns Nova instância de MoneyFacade com o valor absoluto
   *
   * @example
   * const negative = new MoneyFacade(-10.50);
   * const absolute = negative.absolute();
   * console.log(absolute.value); // 10.5
   */
  public absolute(): MoneyFacade {
    if (this.isPositive || this.isZero) return this.clone()
    return MoneyFacade.fromCents(Math.abs(this._cents), this.options)
  }

  /**
   * Retorna o maior valor entre este e outro valor monetário.
   *
   * @param value - Valor a ser comparado
   * @returns Nova instância de MoneyFacade com o maior valor
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(5.25);
   * const max = a.max(b);
   * console.log(max.value); // 10.5
   */
  public max(value: MoneyInput): MoneyFacade {
    const otherCents = this.converter.toCents(value)
    return this._cents >= otherCents ?
        this.clone()
      : MoneyFacade.fromCents(otherCents, this.options)
  }

  /**
   * Retorna o menor valor entre este e outro valor monetário.
   *
   * @param value - Valor a ser comparado
   * @returns Nova instância de MoneyFacade com o menor valor
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const b = new MoneyFacade(5.25);
   * const min = a.min(b);
   * console.log(min.value); // 5.25
   */
  public min(value: MoneyInput): MoneyFacade {
    const otherCents = this.converter.toCents(value)
    return this._cents <= otherCents ?
        this.clone()
      : MoneyFacade.fromCents(otherCents, this.options)
  }

  /**
   * Inverte o sinal do valor monetário.
   *
   * @returns Nova instância de MoneyFacade com o sinal invertido
   *
   * @example
   * const positive = new MoneyFacade(10.50);
   * const negative = positive.negate();
   * console.log(negative.value); // -10.5
   */
  public negate(): MoneyFacade {
    return this.isZero ?
        this.clone()
      : MoneyFacade.fromCents(-this._cents, this.options)
  }

  /**
   * Arredonda o valor monetário com a precisão e modo especificados.
   *
   * @param precision - Precisão do arredondamento (padrão: 1)
   * @param mode - Modo de arredondamento (padrão: 'round')
   * @returns Nova instância de MoneyFacade com o valor arredondado
   *
   * @example
   * const price = new MoneyFacade(10.56);
   * const rounded = price.round(10);
   * console.log(rounded.value); // 10.6
   */
  public round(
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): MoneyFacade {
    if (precision <= 0) {
      throw new Error('A precisão deve ser um número positivo')
    }

    if (precision === 1) return this.clone()

    const roundedCents = this.rounder.round(this._cents, precision, mode)

    return roundedCents === this._cents ?
        this.clone()
      : MoneyFacade.fromCents(roundedCents, this.options)
  }

  /**
   * Adiciona outro valor monetário a este.
   *
   * @param value - Valor a ser adicionado
   * @returns Nova instância de MoneyFacade com o resultado da adição
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const sum = a.plus(5.25);
   * console.log(sum.value); // 15.75
   */
  public plus(value: MoneyInput): MoneyFacade {
    const valueCents = this.converter.toCents(value)
    return valueCents === 0 ?
        this.clone()
      : MoneyFacade.fromCents(this.cents + valueCents, this.options)
  }

  /**
   * Subtrai outro valor monetário deste.
   *
   * @param value - Valor a ser subtraído
   * @returns Nova instância de MoneyFacade com o resultado da subtração
   *
   * @example
   * const a = new MoneyFacade(10.50);
   * const diff = a.minus(5.25);
   * console.log(diff.value); // 5.25
   */
  public minus(value: MoneyInput): MoneyFacade {
    const valueCents = this.converter.toCents(value)
    return valueCents === 0 ?
        this.clone()
      : MoneyFacade.fromCents(this.cents - valueCents, this.options)
  }

  /**
   * Multiplica o valor monetário por um fator.
   *
   * @param factor - Fator de multiplicação (deve ser positivo)
   * @returns Nova instância de MoneyFacade com o resultado da multiplicação
   * @throws Error se o fator for zero ou negativo
   *
   * @example
   * const price = new MoneyFacade(10.50);
   * const doubled = price.times(2);
   * console.log(doubled.value); // 21.0
   */
  public times(factor: number): MoneyFacade {
    if (factor < 0) {
      throw new Error('O fator de multiplicação não pode ser negativo.')
    }

    if (factor === 0) return MoneyFacade.zero(this.options)
    if (factor === 1) return this.clone()

    return MoneyFacade.fromCents(this._cents * factor, this.options)
  }

  /**
   * Divide o valor monetário por um divisor.
   *
   * @param divisor - Valor pelo qual dividir (deve ser positivo)
   * @returns Nova instância de MoneyFacade com o resultado da divisão
   * @throws Error se o divisor for zero ou negativo
   *
   * @example
   * const price = new MoneyFacade(10.50);
   * const half = price.dividedBy(2);
   * console.log(half.value); // 5.25
   */
  public dividedBy(divisor: number): MoneyFacade {
    if (divisor <= 0) {
      throw new Error('Não é possível dividir por zero ou negativo.')
    }

    if (divisor === 1) return this.clone()

    return MoneyFacade.fromCents(this._cents / divisor, this.options)
  }

  /**
   * Distribui o valor atual em partes iguais.
   * Garante que a soma das partes seja igual ao valor original,
   * distribuindo os centavos restantes entre as primeiras partes.
   *
   * @param numberOfParts - Número de partes (deve ser positivo)
   * @returns Array de instâncias MoneyFacade representando as partes
   * @throws Error se o número de partes não for um inteiro positivo
   *
   * @example
   * // Distribuir R$ 10,00 em 3 partes
   * const money = new MoneyFacade(10);
   * const parts = money.allocate(3);
   * // Resultado: [R$ 3,34, R$ 3,33, R$ 3,33]
   */
  public allocate(numberOfParts: number): MoneyFacade[] {
    if (!Number.isInteger(numberOfParts) || numberOfParts <= 0) {
      throw new Error('O número de parcelas deve ser um inteiro positivo.')
    }

    if (this.isZero) {
      return Array(numberOfParts).fill(MoneyFacade.zero(this.options))
    }

    const base = Math.floor(this._cents / numberOfParts)
    const remainder = this._cents % numberOfParts

    return Array.from({ length: numberOfParts }, (_, i) => {
      const amount = base + (i < remainder ? 1 : 0)
      return MoneyFacade.fromCents(amount, this.options)
    })
  }

  /**
   * Aplica um desconto percentual ao valor atual.
   *
   * @param discount - Percentual de desconto (deve ser positivo)
   * @returns Nova instância de MoneyFacade com o desconto aplicado
   * @throws Error se o percentual de desconto for zero ou negativo
   *
   * @example
   * const price = new MoneyFacade(100);
   * const discounted = price.applyDiscount(20);
   * console.log(discounted.value); // 80
   */
  public applyDiscount(discount: number): MoneyFacade {
    if (discount <= 0) {
      throw new Error('O percentual de desconto não pode ser zero ou negativo.')
    }

    if (discount > 100) {
      throw new Error('O percentual de desconto não pode ser maior que 100%.')
    }

    return this.minus(this.percentage(discount))
  }

  /**
   * Aplica um acréscimo percentual ao valor atual.
   *
   * @param surcharge - Percentual de acréscimo (deve ser positivo)
   * @returns Nova instância de MoneyFacade com o acréscimo aplicado
   * @throws Error se o percentual de acréscimo for zero ou negativo
   *
   * @example
   * const price = new MoneyFacade(100);
   * const increased = price.applySurcharge(20);
   * console.log(increased.value); // 120
   */
  public applySurcharge(surcharge: number): MoneyFacade {
    if (surcharge <= 0) {
      throw new Error(
        'O percentual de acréscimo não pode ser zero ou negativo.',
      )
    }

    return this.plus(this.percentage(surcharge))
  }

  /**
   * Calcula uma porcentagem deste valor monetário.
   *
   * @param percentage - Valor percentual a ser calculado (deve ser positivo)
   * @returns Nova instância de MoneyFacade representando a porcentagem do valor
   * @throws Error se a porcentagem for zero ou negativa
   *
   * @example
   * const price = new MoneyFacade(100);
   * const tenPercent = price.percentage(10);
   * console.log(tenPercent.value); // 10
   */
  public percentage(percentage: number): MoneyFacade {
    if (percentage <= 0) {
      throw new Error('A porcentagem não pode ser zero ou negativo.')
    }

    if (percentage === 100) return this.clone()

    return this.times(percentage / 100)
  }
}
