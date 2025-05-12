import { Money } from './lib/money.ts'

// Criando uma instância de Money com valor 10.99
const price = new Money(10.99)

// Demonstração das propriedades básicas
console.log('Valor numérico:', price.value) // 10.99
console.log('Valor em centavos:', price.cents) // 1099
console.log('Parte decimal:', price.decimal) // 0.99
console.log('Parte inteira:', price.integer) // 10
console.log('Valor como string:', price.toString()) // "10.99"
console.log()

// Demonstração de formatação
console.log('Formato padrão:', price.format()) // R$ 10,99
console.log('Formato USD:', price.format({ currencyCode: 'USD' })) // $10,99
console.log('Formato EUR:', price.format({ currencyCode: 'EUR' })) // 10,99 €
console.log('Sem símbolo:', price.format({ showSymbol: false })) // 10,99
console.log()

// Demonstração de operações
const anotherPrice = new Money(5.5)
console.log('Valor novo:', anotherPrice.format()) // R$ 5,50
console.log('Soma:', price.plus(anotherPrice).format()) // R$ 16,49
console.log('Subtração:', price.minus(anotherPrice).format()) // R$ 5,49
console.log('Multiplicação:', price.times(2).format()) // R$ 21,98
console.log('Divisão:', price.divideBy(2).format()) // R$ 5,50
console.log()
