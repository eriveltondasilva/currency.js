import { beforeEach, describe, expect, it } from 'vitest'
import { CalculationService } from './calculation-service'
import { Money } from './money'

describe('CalculationService', () => {
  let calculator: CalculationService

  beforeEach(() => {
    calculator = CalculationService.instance
    calculator.setConfigure({
      currencyCode: 'BRL',
      locale: 'pt-BR',
      showSymbol: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  })

  describe('Padrão Singleton', () => {
    it('deve retornar a mesma instância quando chamado múltiplas vezes', () => {
      const instance1 = CalculationService.instance
      const instance2 = CalculationService.instance

      expect(instance1).toBe(instance2)
    })
  })

  describe('Operações básicas', () => {
    it('deve somar dois valores monetários corretamente', () => {
      const result = calculator.addition('10.50', 5.75)
      expect(result.value).toBe(16.25)
      expect(result.format().replace(' ', '')).toBe('R$16,25')
    })

    it('deve subtrair valores monetários corretamente', () => {
      const result = calculator.subtraction('10.50', 5.75)
      expect(result.value).toBe(4.75)
      expect(result.format().replace(' ', '')).toBe('R$4,75')
    })

    it('deve multiplicar um valor monetário por um fator', () => {
      const result = calculator.multiplication('10.50', 3)
      expect(result.value).toBe(31.5)
      expect(result.format()).toBe('R$ 31,50')
    })

    it('deve lançar erro ao multiplicar por zero ou número negativo', () => {
      expect(() => calculator.multiplication('10.50', 0)).toThrow()
      expect(() => calculator.multiplication('10.50', -1)).toThrow()
    })

    it('deve dividir um valor monetário por um divisor', () => {
      const result = calculator.division('10.50', 2)
      expect(result.value).toBe(5.25)
      expect(result.format()).toBe('R$ 5,25')
    })

    it('deve lançar erro ao dividir por zero ou número negativo', () => {
      expect(() => calculator.division('10.50', 0)).toThrow()
      expect(() => calculator.division('10.50', -1)).toThrow()
    })

    it('deve calcular porcentagem de um valor monetário', () => {
      const result = calculator.percentage('100.00', 15)
      expect(result.value).toBe(15)
      expect(result.format()).toBe('R$ 15,00')
    })

    it('deve lançar erro ao calcular porcentagem zero ou negativa', () => {
      expect(() => calculator.percentage('100.00', 0)).toThrow()
      expect(() => calculator.percentage('100.00', -5)).toThrow()
    })
  })

  describe('Cálculos com listas de itens', () => {
    it('deve calcular o preço médio de uma lista de itens', () => {
      const items = [
        { name: 'Produto 1', price: '10.50' },
        { name: 'Produto 2', price: '15.75' },
        { name: 'Produto 3', price: '20.00' },
      ]
      const result = calculator.calculateAveragePrice(items)
      expect(result.value).toBeCloseTo(15.42, 2)
    })

    it('deve retornar zero para lista vazia ou nula ao calcular preço médio', () => {
      expect(calculator.calculateAveragePrice(null).value).toBe(0)
      expect(calculator.calculateAveragePrice([]).value).toBe(0)
    })

    it('deve calcular o subtotal de um item baseado no preço e quantidade', () => {
      const item = { name: 'Produto', price: '10.50', quantity: 3 }
      const result = calculator.calculateSubtotal(item)
      expect(result.value).toBe(31.5)
      expect(result.format()).toBe('R$ 31,50')
    })

    it('deve assumir quantidade 1 se não especificada ao calcular subtotal', () => {
      const item = { name: 'Produto', price: '10.50', quantity: 1 }
      const result = calculator.calculateSubtotal(item)
      expect(result.value).toBe(10.5)
    })

    it('deve calcular o total de uma lista de itens com quantidades', () => {
      const items = [
        { name: 'Produto 1', price: '10.50', quantity: 2 },
        { name: 'Produto 2', price: '15.75', quantity: 1 },
        { name: 'Produto 3', price: '20.00', quantity: 3 },
      ]
      const result = calculator.calculateTotal(items)
      expect(result.value).toBe(97.75)
    })

    it('deve retornar zero para lista vazia ou nula ao calcular total', () => {
      expect(calculator.calculateTotal(null).value).toBe(0)
      expect(calculator.calculateTotal([]).value).toBe(0)
    })

    it('deve ignorar itens sem preço ao calcular total', () => {
      const items = [
        { name: 'Produto 1', price: '10.50', quantity: 2 },
        { name: 'Produto 2', price: '12.99', quantity: 1 },
        { name: 'Produto 3', price: '20.00', quantity: 1 },
      ]
      const result = calculator.calculateTotal(items)
      expect(result.value).toBe(41)
    })
  })

  describe('Distribuição de parcelas', () => {
    it('deve distribuir um valor em parcelas iguais', () => {
      const installments = calculator.distributeInstallments('100.00', 3)

      expect(installments.length).toBe(3)
      expect(installments[0].value).toBe(33.34)
      expect(installments[1].value).toBe(33.33)
      expect(installments[2].value).toBe(33.33)

      // Verifica se a soma das parcelas é igual ao valor original
      const total = installments.reduce((sum, inst) => sum + inst.value, 0)
      expect(total).toBeCloseTo(100, 2)
    })

    it('deve lançar erro se o número de parcelas for menor ou igual a zero', () => {
      expect(() => calculator.distributeInstallments('100.00', 0)).toThrow()
      expect(() => calculator.distributeInstallments('100.00', -1)).toThrow()
    })
  })

  describe('Configuração', () => {
    it('deve aplicar as opções de formatação corretamente', () => {
      calculator.setConfigure({
        currencyCode: 'USD',
        locale: 'en-US',
        showSymbol: true,
      })

      const result = calculator.addition('10.50', 5.75)
      expect(result.format()).toBe('$16.25')
    })

    it('deve permitir encadeamento de métodos após configuração', () => {
      const result = calculator
        .setConfigure({ currencyCode: 'EUR' })
        .addition('10.50', 5.75)

      expect(result).toBeInstanceOf(Money)
      expect(result.value).toBe(16.25)
    })
  })
})
