// Exemplo de uso
import { money } from './index.ts'

// Configuração padrão
const price = money(55.99)
console.log('Valor padrão:', price.format()) // $55,99

// Configuração personalizada
const brMoney = money.configure({
  currencyCode: 'BRL',
})

const brPrice = brMoney(55.99)
const brSum = brPrice.plus(4.55)
console.log('Valor em reais:', brSum.format()) // R$ 60,54

// Outros exemplos
const eurMoney = money.configure({
  currencyCode: 'EUR',
})

const eurPrice = eurMoney(55.99)
const eurSum = eurPrice.plus(4.55)
console.log('Valor em euros:', eurSum.format()) // 55.99 €
