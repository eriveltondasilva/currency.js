/**
 * Biblioteca especializada para manipulação de valores monetários,
 * evitando problemas de arredondamento com números de ponto flutuante e
 * oferecendo uma API rica para operações financeiras.
 *
 * @author Erivelton Silva
 * @version 0.0.1
 */

import { Money } from './index.ts'

const amount = Money(1234.56)
console.log('amount:', amount.format())

// Different currencies
const usd = amount.format({ currencyCode: 'USD', locale: 'en-US' }) // $1,234.56
const eur = amount.format({ currencyCode: 'EUR', locale: 'de-DE' }) // 1.234,56 €
const jpy = amount.format({ currencyCode: 'JPY', locale: 'ja-JP' }) // ¥1,235
const brl = amount.format({ currencyCode: 'BRL', locale: 'pt-BR' }) // R$ 1.234,56

console.log('usd: ', usd)
console.log('eur:', eur)
console.log('jpy:', jpy)
console.log('brl:', brl)
console.log('amount:', amount.format())
