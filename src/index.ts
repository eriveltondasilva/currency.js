/**
 * Biblioteca aprimorada para manipulação de valores monetários,
 * evitando problemas de arredondamento com números de ponto flutuante e
 * oferecendo uma API rica para operações financeiras.
 *
 * @author Erivelton Silva
 * @version 0.0.1
 */

import { Currency } from './lib/currency.ts'

const currency = new Currency(10)
console.log(currency.add(0.55).getValue())
