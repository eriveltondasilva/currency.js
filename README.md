# @eriveltonsilva/currency.js - Currency Manipulation Library

A lightweight, robust JavaScript library for currency operations with precision and reliability. Designed to handle monetary values safely, avoiding floating point issues common in financial calculations.

![npm](https://img.shields.io/npm/v/@eriveltonsilva/currency.js)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- ✅ **Safe arithmetic operations**: Addition, subtraction, multiplication, division
- ✅ **Precise calculations**: Based on integer cents to avoid floating-point errors
- ✅ **Currency formatting**: Configurable formatting with internationalization support
- ✅ **Money comparison**: Easy value comparison with expressive methods
- ✅ **Business operations**: Discount, surcharge, percentage calculations
- ✅ **Payment helpers**: Installment distribution, subtotals, average calculations

## Installation

```bash
# npm
npm install @eriveltonsilva/currency.js
```

## Basic Usage

```javascript
import Money from '@eriveltonsilva/currency.js'

// Create money instances
const price = Money(19.99)
const discount = Money(5)

// Perform arithmetic operations
const finalPrice = price.minus(discount)

// Format with default options
console.log(finalPrice.format()) // $14.99

// Format with specific options
console.log(
  finalPrice.format({
    currencyCode: 'EUR',
    locale: 'de-DE',
    showSymbol: true,
  }),
) // 14,99 €
```

## API Documentation

### Creating Money Instances

```javascript
// Basic usage
const a = Money(10.50);       // From number
const b = Money("10.50");     // From string
const c = Money("10,50");     // From string with comma
const d = Money("R$ 10,50");  // From string with currency symbol
const e = Money(a);           // From another Money instance

// With options
const f = Money(1050, {
  currencyCode: 'BRL',
  locale: 'pt-BR'
  showSymbol: true,
}); // R$ 10,50

// Configure with defaults
const BRL = Money.configure({ currencyCode: 'BRL' });
const price = BRL(25.50);  // R$ 25,50

// Predefined currencies
import { USD, EUR, BRL } from '@eriveltonsilva/currency.js';
const usd = USD(99.99);  // $99.99
const eur = EUR(99.99);  // 99.99 €
const brl = BRL(99.99);  // R$ 99,99

// Static methods
const zero      = Money.zero();               // 0.00
const fromCents = Money.fromCents(1050, {});  // 10.50
```

### Properties

```javascript
const money = Money(10.5)

money.cents // 1050 (value in cents)
money.value // 10.5 (decimal value)
money.integer // 10 (integer part)
money.decimal // 0.5 (decimal part)
money.isZero // false
money.isPositive // true
money.isNegative // false
```

### Formatting

```javascript
const price = Money(1234.56)

// Basic formatting
price.format() // Default: $1,234.56 (depends on environment)

// Custom formatting
price.format({
  currencyCode: 'EUR',
  locale: 'fr-FR',
  showSymbol: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}) // 1 234,56 €

// String representation
price.toString() // "1234.56"
```

### Comparison Methods

```javascript
const price1 = Money(100)
const price2 = Money(200)

price1.equals(100) // true
price1.greaterThan(50) // true
price1.lessThan(price2) // true
price1.greaterThanOrEqual(100) // true
price1.lessThanOrEqual(price2) // true
price1.isBetween(50, 150) // true
```

### Arithmetic Operations

```javascript
const price = Money(100)

// All operations return new Money instances (immutable)
const sum = price.plus(50) // 150
const difference = price.minus(25) // 75
const doubled = price.times(2) // 200
const half = price.dividedBy(2) // 50

// Chaining operations
const result = price.plus(50).times(2).minus(25) // 275
```

### Transformation Methods

```javascript
const price = Money(-10.56)

const absolute = price.absolute() // 10.56
const negative = Money(50).negate() // -50
const maximum = price.max(Money(15)) // 15
const minimum = price.min(Money(5)) // -10.56
const rounded = price.round(1) // -10.6 (rounded to 1 decimal place)
```

### Business Operations

```javascript
const price = Money(100)

// Percentage-based operations
const tenPercent = price.percentage(10) // 10
const discounted = price.applyDiscount(20) // 80 (20% off)
const increased = price.applySurcharge(15) // 115 (15% added)

// Distribution
const parts = price.allocate(3) // [33.34, 33.33, 33.33]
```

### Calculator API

For more complex operations, you can use the Calculator API:

```javascript
import { Calculator } from '@eriveltonsilva/currency.js'

// Configure calculator
Calculator.setConfigure({
  currencyCode: 'USD',
  showSymbol: true,
})

// Basic operations
const sum = Calculator.addition(10.5, 5.25) // $15.75
const diff = Calculator.subtraction(10.5, 5.25) // $5.25
const product = Calculator.multiplication(10.5, 3) // $31.50
const quotient = Calculator.division(10.5, 2) // $5.25
const percentage = Calculator.percentage(100, 15) // $15.00

// Business operations
const installments = Calculator.distributeInstallments(100, 3)
// [$33.34, $33.33, $33.33]

// Shopping cart calculations
const items = [
  { name: 'Product 1', price: 10.5, quantity: 2 },
  { name: 'Product 2', price: 15.75, quantity: 1 },
  { name: 'Product 3', price: 20.0, quantity: 3 },
]

const subtotal = Calculator.calculateSubtotal(items[0]) // $21.00 (10.50 × 2)
const total = Calculator.calculateTotal(items) // $97.75
const average = Calculator.calculateAveragePrice(items) // $15.42
```

## Internationalization

Currency.js supports various currency codes and locales for formatting:

```javascript
const amount = Money(1234.56)

// Different currencies
amount.format({ currencyCode: 'USD', locale: 'en-US' }) // $1,234.56
amount.format({ currencyCode: 'EUR', locale: 'de-DE' }) // 1.234,56 €
amount.format({ currencyCode: 'JPY', locale: 'ja-JP' }) // ¥1,235
amount.format({ currencyCode: 'BRL', locale: 'pt-BR' }) // R$ 1.234,56

// Control display options
amount.format({
  showSymbol: false, // Hide currency symbol
  minimumFractionDigits: 2, // At least 2 decimals
  maximumFractionDigits: 2, // At most 2 decimals
})
```

## Rounding Methods

The library supports different rounding modes:

```javascript
import { Money, ROUNDING_MODES } from '@eriveltonsilva/currency.js'

const price = Money(10.56)

price.round(1, ROUNDING_MODES.ROUND) // 10.6 (standard rounding)
price.round(1, ROUNDING_MODES.FLOOR) // 10.5 (round down)
price.round(1, ROUNDING_MODES.CEIL) // 10.6 (round up)
price.round(1, ROUNDING_MODES.TRUNC) // 10.5 (truncate)
```

## Best Practices

### Avoid Floating Point Arithmetic

```javascript
// ❌ Bad: using floating point
const subtotal = 19.99
const tax = subtotal * 0.07 // 1.3993000000000002
const total = subtotal + tax // 21.389300000000002

// ✅ Good: using Money
const subtotal = Money(19.99)
const tax = subtotal.percentage(7)
const total = subtotal.plus(tax) // 21.39
```

### Chain Operations for Readability

```javascript
// ✅ Good: chaining for readability
const finalPrice = Money(100)
  .applyDiscount(10) // Apply 10% discount
  .applySurcharge(5) // Add 5% fee
  .times(2) // Double the amount
  .round(2) // Round to 2 decimal places
```

### Immutability

All operations return new Money instances, preserving the original value:

```javascript
const original = Money(100)
const discounted = original.applyDiscount(10)

console.log(original.value) // Still 100
console.log(discounted.value) // 90
```

## Running Tests

```bash
# Run the test suite
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
