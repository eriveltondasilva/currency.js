// Exemplo de uso
import { BRL, Calculator, EUR, Money } from './index.ts'

// Configuração padrão
const price = Money(55.99)
console.log('Valor padrão:', price.format()) // $55,99

// Configuração BR
const brPrice = BRL(55.99)
console.log('Valor em reais:', brPrice.format()) // R$ 55,99

// Configuração EUR
const eurPrice = EUR(55.99)
console.log('Valor em euros:', eurPrice.format()) // 55.99 €
console.log()

Calculator.setConfigure({ currencyCode: 'BRL' })

const sum = Calculator.addition(10, 5) // 15
console.log('Soma:', sum.format()) // $15,00

const sub = Calculator.subtraction(10.4, 5.1) // 5
console.log('Subtração:', sub.format()) // $5,00

Calculator.setConfigure({ currencyCode: 'EUR' })

const mul = Calculator.multiplication(10, 5) // 50
console.log('Multiplicação:', mul.format()) // $50,00

const div = Calculator.division(10, 5) // 2
console.log('Divisão:', div.format()) // $2,00
