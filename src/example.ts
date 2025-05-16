/**
 * Biblioteca especializada para manipulação de valores monetários,
 * evitando problemas de arredondamento com números de ponto flutuante e
 * oferecendo uma API rica para operações financeiras.
 *
 * @author Erivelton Silva
 * @version 0.0.1
 */

import { Calculator, Money, ROUNDING_MODES } from './index.ts'

//# Demonstração das funcionalidades da biblioteca

//* Obtenção de valores monetários em diferentes formatos
const price = Money(10.99)

console.log('Valor numérico:', price.value) // 10.99 (número)
console.log('Valor em centavos:', price.cents) // 1099 (centavos)
console.log('Valor como string:', price.toString()) // "10.99" (string)
console.log('Valor primitivo:', price.valueOf()) // "10.99" (string)
console.log()

//* Criação de instâncias monetárias a partir de diferentes fontes
const price1 = Money(150.75)
const price2 = Money('1.599,99')
const price3 = Money(price1) // Cria a partir de outra instância Currency

console.log('Valor 1:', price1.format()) // R$ 150,75
console.log('Valor 2:', price2.format()) // R$ 1.599,99
console.log('Valor 3:', price3.format()) // R$ 150,75
console.log()

//* Operações aritméticas com valores monetários
const sum = price1.plus(price2)
const difference = price2.minus(price1)
const doubled = price1.times(2)
const half = price1.dividedBy(2)

console.log('Soma:', sum.format()) // R$ 1.750,74
console.log('Diferença:', difference.format()) // R$ 1.449,24
console.log('Dobro:', doubled.format()) // R$ 301,50
console.log('Metade:', half.format()) // R$ 75,38
console.log()

//* Comparações entre valores monetários
console.log('price1 > price2:', price1.greaterThan(price2)) // false
console.log('price1 < price2:', price1.lessThan(price2)) // true
console.log('price1 = price1:', price1.equals(price1)) // true
console.log()

//* Opções de formatação para diferentes moedas e estilos
console.log('BRL:', price1.format({ currencyCode: 'BRL' })) // R$ 150,75
console.log('USD:', price1.format({ currencyCode: 'USD' })) // $ 150.75
console.log('Sem símbolo monetário:', price1.format({ showSymbol: false })) // 150,75
console.log()

//* Cálculos com coleções de itens comerciais
const items = [
  { name: 'Produto 1', price: 99.99, quantity: 2 },
  { name: 'Produto 2', price: 149.9, quantity: 1 },
  { name: 'Produto 3', price: 299.99, quantity: 3 },
]

const total = Calculator.calculateTotal(items)
const average = Calculator.calculateAveragePrice(items)

console.log('Total da compra:', total.format()) // R$ 1.249,85
console.log('Preço médio:', average.format()) // R$ 183,29
console.log()

//* Estratégias de arredondamento para valores monetários
const value = Money(123.45)
console.log('Valor original:', value.format()) // R$ 123,45
console.log('Arredondado para múltiplo de 10:', value.round(10).value) // R$ 120,00
console.log(
  'Arredondado para cima (múltiplo de 10):',
  value.round(10, ROUNDING_MODES.CEIL).format(),
) // R$ 130,00
console.log(
  'Arredondado para baixo (múltiplo de 10):',
  value.round(10, ROUNDING_MODES.FLOOR).format(),
) // R$ 120,00
console.log()

//* Cálculo e distribuição de parcelas
const totalValue = Money(100)
const installments = Calculator.distributeInstallments(totalValue, 3)

installments.forEach((inst, index) => {
  console.log(`Parcela ${index + 1}: ${inst.format()}`)
})
// Parcela 1: R$ 33,34
// Parcela 2: R$ 33,33
// Parcela 3: R$ 33,33

const money = Money(10.56)

console.log(money.round(0.2, ROUNDING_MODES.ROUND).format()) // 10.6 (standard rounding)
console.log(money.round(0.2, ROUNDING_MODES.FLOOR).value) // 10.5 (round down)
console.log(money.round(0.2, ROUNDING_MODES.CEIL).value) // 10.6 (round up)
// money.round(1, ROUNDING_MODES.TRUNC);  // 10.5 (truncate)
console.log()

const division = Money(11.0).dividedBy(3)
console.log('Divisão:', division.format()) // 3.67
