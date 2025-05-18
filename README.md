# 💰 Currency.js — Currency Manipulation Library <!-- omit in toc -->

![npm](https://img.shields.io/npm/v/@eriveltonsilva/currency.js)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Typescript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Tests](https://img.shields.io/badge/tests-passing-success)
![Size](https://img.shields.io/bundlephobia/minzip/@eriveltonsilva/currency.js)

A lightweight, robust JavaScript library for currency operations with precision and reliability. Designed to handle monetary values safely, avoiding floating point issues common in financial calculations.

<p align="center">
  <img src="https://raw.githubusercontent.com/eriveltondasilva/currency.js/main/assets/currency-banner.png" alt="Currency.js Banner" width="600">
</p>

## 📋 Table of Contents <!-- omit in toc -->

- [1. 🚀 Features](#1--features)
- [2. 📦 Installation](#2--installation)
- [3. 🔍 Basic Usage](#3--basic-usage)
- [4. 📚 API Documentation](#4--api-documentation)
  - [4.1. Library Exports](#41-library-exports)
  - [4.2. Creating Money Instances](#42-creating-money-instances)
  - [4.3. Properties](#43-properties)
  - [4.4. Formatting](#44-formatting)
  - [4.5. Comparison Methods](#45-comparison-methods)
  - [4.6. Arithmetic Operations](#46-arithmetic-operations)
  - [4.7. Transformation Methods](#47-transformation-methods)
  - [4.8. Business Operations](#48-business-operations)
  - [4.9. Calculator API](#49-calculator-api)
- [5. 🌎 Internationalization](#5--internationalization)
- [6. 🔄 Rounding Methods](#6--rounding-methods)
- [7. 💡 Best Practices](#7--best-practices)
  - [7.1. Avoid Floating Point Arithmetic](#71-avoid-floating-point-arithmetic)
  - [7.2. Chain Operations for Readability](#72-chain-operations-for-readability)
  - [7.3. Immutability](#73-immutability)
- [8. ⚠️ Important Warnings](#8-️-important-warnings)
  - [8.1. Two Decimal Places Limitation](#81-two-decimal-places-limitation)
  - [8.2. Internal Rounding](#82-internal-rounding)
  - [8.3. Preference for the allocate Method](#83-preference-for-the-allocate-method)
- [9. ⚡ Advanced Examples](#9--advanced-examples)
  - [9.1. Processing Payments\*\*](#91-processing-payments)
  - [9.2. Shopping Cart](#92-shopping-cart)
  - [9.3. Tax Calculation](#93-tax-calculation)
- [10. 🧪 Running Tests](#10--running-tests)
- [11. 🤝 Contributing](#11--contributing)
- [12. 📊 Similar Libraries](#12--similar-libraries)
- [13. 🔗 Useful Links](#13--useful-links)
- [14. 📄 License](#14--license)

## 1. 🚀 Features

- ✅ Zero dependencies: Lightweight implementation with no external dependencies
- ✅ **Safe arithmetic operations**: Addition, subtraction, multiplication, division
- ✅ **Precise calculations**: Based on integer cents to avoid floating-point errors
- ✅ **Currency formatting**: Configurable formatting with internationalization support
- ✅ **Money comparison**: Easy value comparison with expressive methods
- ✅ **Business operations**: Discount, surcharge, percentage calculations
- ✅ **Payment helpers**: Installment distribution, subtotals, average calculations

## 2. 📦 Installation

```bash
# npm
npm install @eriveltonsilva/currency.js
```

## 3. 🔍 Basic Usage

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

## 4. 📚 API Documentation

### 4.1. Library Exports

The `@eriveltonsilva/currency.js` library offers several exports for use in your project:

```javascript
// Default import - Money function
import Money from '@eriveltonsilva/currency.js';

// Named imports
import {
  Money,          // Money function (alternative to default import)
  Calculator,     // Calculator API for complex operations
  Currency,       // Pre-configured currencies (USD, EUR, BRL)
  ROUNDING_MODES  // Constants for rounding modes
} from '@eriveltonsilva/currency.js';

// Type imports (for TypeScript)
import type {
  FormatOptions,  // Formatting options
  MoneyInput,     // Input types accepted by the Money function
  RoundingModes   // Types of rounding modes
} from '@eriveltonsilva/currency.js';
```

### 4.2. Creating Money Instances

```javascript
// Basic usage
const a = Money(10.50);       // From number
const b = Money("10.50");     // From string
const c = Money("10,50");     // From string with comma (Brazilian format)
const d = Money("$10.50");    // From string with currency symbol
const e = Money("R$ 10,50");  // From string with currency symbol (Brazilian format)
const f = Money(a);           // From another Money instance

// With options
const g = Money(10.50, {
  currencyCode: 'BRL',
  locale: 'pt-BR'
  showSymbol: true,
}); // R$ 10,50

// Configure with defaults
const BRL = Money.configure({ currencyCode: 'BRL' });
const price = BRL(25.50);  // R$ 25,50

// Predefined currencies
import { Currency } from '@eriveltonsilva/currency.js';

const usd = Currency.USD(99.99);  // $99.99
const eur = Currency.EUR(99.99);  // 99.99 €
const brl = Currency.BRL(99.99);  // R$ 99,99
```

### 4.3. Properties

```javascript
const money = Money(10.5)

money.cents          // 1050 (value in cents)
money.value          // 10.5 (decimal value)
money.integer        // 10 (integer part)
money.decimal        // 0.5 (decimal part)
money.formatOptions  // { currencyCode: 'USD', locale: 'en-US', showSymbol: true }
money.isZero         // false
money.isPositive     // true
money.isNegative     // false
```

### 4.4. Formatting

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

### 4.5. Comparison Methods

```javascript
const price1 = Money(100)
const price2 = Money(200)

price1.equals(100)              // true
price1.greaterThan(50)          // true
price1.lessThan(price2)         // true
price1.greaterThanOrEqual(100)  // true
price1.lessThanOrEqual(price2)  // true
price1.isBetween(50, 150)       // true
```

### 4.6. Arithmetic Operations

```javascript
const price = Money(100)

// All operations return new Money instances (immutable)

const sum = price.plus(50)          // 150
const difference = price.minus(25)  // 75
const doubled = price.times(2)      // 200
const half = price.dividedBy(2)     // 50

// Chaining operations
const result = price.plus(50).times(2).minus(25) // 275
```

### 4.7. Transformation Methods

```javascript
const price = Money(-10.56)

const absolute = price.absolute()    // 10.56
const negative = Money(50).negate()  // -50
const maximum = price.max(Money(15)) // 15
const minimum = price.min(Money(5))  // -10.56
const rounded = price.round(10)      // -10.6 (rounded to 1 decimal place)
```

### 4.8. Business Operations

```javascript
const price = Money(100)

// Percentage-based operations
const tenPercent = price.percentage(10)    // 10
const discounted = price.applyDiscount(20) // 80 (20% off)
const increased = price.applySurcharge(15) // 115 (15% added)

// Distribution
const parts = price.allocate(3) // [Money(33.34), Money(33.33), Money(33.33)]
```

### 4.9. Calculator API

For more complex operations, you can use the Calculator API:

```javascript
import { Calculator } from '@eriveltonsilva/currency.js'

// Configure calculator
Calculator.configure({
  currencyCode: 'USD',
  showSymbol: true,
})

// Basic operations
const sum = Calculator.addition(10.5, 5.25)        // $15.75
const diff = Calculator.subtraction(10.5, 5.25)    // $5.25
const product = Calculator.multiplication(10.5, 3) // $31.50
const quotient = Calculator.division(10.5, 2)      // $5.25
const percentage = Calculator.percentage(100, 15)  // $15.00

// Business operations
const installments = Calculator.distributeInstallments(100, 3) // [33.34, 33.33, 33.33]

// Shopping cart calculations
const items = [
  { name: 'Product 1', price: 10.5, quantity: 2 },
  { name: 'Product 2', price: 15.75, quantity: 1 },
  { name: 'Product 3', price: 20.0, quantity: 3 },
]

const subtotal = Calculator.calculateSubtotal(items[0]) // $21.00 (10.50 × 2)
const total = Calculator.calculateTotal(items)          // $97.75
const average = Calculator.calculateAveragePrice(items) // $15.42
```

## 5. 🌎 Internationalization

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
  showSymbol: false,        // Hide currency symbol
  minimumFractionDigits: 2, // At least 2 decimals
  maximumFractionDigits: 2, // At most 2 decimals
})
```

## 6. 🔄 Rounding Methods

The library supports different rounding modes:

```javascript
import { Money, ROUNDING_MODES } from '@eriveltonsilva/currency.js'

const price = Money(10.56)

price.round(10, ROUNDING_MODES.ROUND) // 10.6 (standard rounding)
price.round(10, ROUNDING_MODES.FLOOR) // 10.5 (round down)
price.round(10, ROUNDING_MODES.CEIL)  // 10.6 (round up)
price.round(10, ROUNDING_MODES.TRUNC) // 10.5 (truncate)
```

## 7. 💡 Best Practices

### 7.1. Avoid Floating Point Arithmetic

```javascript
// ❌ Bad: using floating point
const subtotal = 19.99
const tax = subtotal * 0.07   // 1.3993000000000002
const total = subtotal + tax  // 21.389300000000002

// ✅ Good: using Money
const subtotal = Money(19.99)
const tax = subtotal.percentage(7)
const total = subtotal.plus(tax) // 21.39
```

### 7.2. Chain Operations for Readability

```javascript
// ✅ Good: chaining for readability
const finalPrice = Money(100)
  .applyDiscount(10)  // Apply 10% discount
  .applySurcharge(5)  // Add 5% fee
  .times(2)           // Double the amount
  .round(20)          // Round to 2 decimal places
```

### 7.3. Immutability

All operations return new Money instances, preserving the original value:

```javascript
const original = Money(100)
const discounted = original.applyDiscount(10)

console.log(original.value)   // Still 100
console.log(discounted.value) // 90
```

## 8. ⚠️ Important Warnings

### 8.1. Two Decimal Places Limitation

The Currency.js library has been optimized to work with monetary values containing up to two decimal places. Using the library with values that have more than two decimal places may result in inaccuracies.

```javascript
// ✅ Recommended: values with up to 2 decimal places
const price1 = Money(19.99)
const price2 = Money(100.5)

// ⚠️ Not recommended: values with more than 2 decimal places
const price3 = Money(19.999)  // Will be rounded to 20.00
const price4 = Money(100.505) // Will be rounded to 100.51
```

### 8.2. Internal Rounding

The library performs internal rounding to preserve the precision of operations. It's important to be aware of these rounding when performing calculations in sequence.

```javascript
// Example of internal rounding
const price = Money(10.565) // Internally rounded to 10.57

// Rounding in mathematical operations
const resultA = Money(10.51).times(0.33)  // 3.47 (not 3.4683)
const resultB = Money(99.99).dividedBy(3) // 33.33 (not 33.33...)

// To visualize the rounding behavior
const value = Money(10.516)
console.log(value.value) // 10.52 (rounded)
console.log(value.cents) // 1052 (value in cents after rounding)
```

### 8.3. Preference for the allocate Method

To distribute values with greater precision (such as in payment installments), always prefer to use the allocate method instead of dividedBy. The allocate method ensures that the sum of the parts is exactly equal to the original value, avoiding rounding problems.

```javascript
// ❌ Less precise: using dividedBy for installments
const totalAmount = Money(100)
const installments = 3
const eachInstallment = totalAmount.dividedBy(installments) // 33.33
const totalSum = eachInstallment.times(installments)        // 99.99 (loss of 0.01)

// ✅ More precise: using allocate for installments
const totalAmount = Money(100)
const installments = totalAmount.allocate(3) // [33.34, 33.33, 33.33]
console.log(installments[0].format()) // $33.34
console.log(installments[1].format()) // $33.33
console.log(installments[2].format()) // $33.33

// The sum of the installments is exactly equal to the original value
const totalSum = installments.reduce(
  (sum, amount) => sum.plus(amount),
  Money(0),
) // 100.00
```

## 9. ⚡ Advanced Examples

### 9.1. Processing Payments

```javascript
function processPayment(totalAmount, numberOfInstallments, discount = 0) {
  // Apply discount if available
  let finalAmount = Money(totalAmount)

  if (discount > 0) {
    finalAmount = finalAmount.applyDiscount(discount)
    console.log(`Discount applied: ${finalAmount.format()}`)
  }

  // Calculate installments
  const installments = finalAmount.allocate(numberOfInstallments)

  console.log(`Total amount: ${finalAmount.format()}`)
  console.log(`Payment in ${numberOfInstallments} installments:`)

  installments.forEach((installment, index) => {
    console.log(`Installment ${index + 1}: ${installment.format()}`)
  })

  return {
    totalAmount: finalAmount,
    installments,
  }
}

// Usage
const result = processPayment(1299.99, 5, 10)
```

### 9.2. Shopping Cart

```javascript
class ShoppingCart {
  items = []

  addItem(name, price, quantity = 1) {
    this.items.push({
      name: name,
      price: price,
      quantity: quantity,
    })
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1)
    }
  }

  calculateSubtotals() {
    return this.items.map((item) => ({
      ...item,
      subtotal: Calculator.calculateSubtotal(item),
    }))
  }

  calculateTotal() {
    return Calculator.calculateTotal(this.items)
  }

  applyCoupon(discountPercentage) {
    return this.calculateTotal().applyDiscount(discountPercentage)
  }

  summary() {
    const itemsWithSubtotal = this.calculateSubtotals()
    const total = this.calculateTotal()

    console.log('=== CART SUMMARY ===')

    itemsWithSubtotal.forEach((item, index) => {
      console.log(
        `${item.name} (${item.quantity}x) - ${item.subtotal.format()}`,
      )
    })

    console.log('-----------------------')
    console.log(`TOTAL: ${total.format()}`)

    return {
      items: itemsWithSubtotal,
      total,
    }
  }
}

// Usage
const cart = new ShoppingCart()
cart.addItem('Laptop', 4599.9, 1)
cart.addItem('Mouse', 89.9, 2)
cart.addItem('Keyboard', 199.9, 1)

const summary = cart.summary()
const totalWithDiscount = cart.applyCoupon(15)
console.log(`TOTAL WITH DISCOUNT (15%): ${totalWithDiscount.format()}`)
```

### 9.3. Tax Calculation

```javascript
class TaxCalculator {
  static calculateSalesTax(productValue, icmsRate = 18, issRate = 5) {
    const value = Money(productValue);

    const icms = value.percentage(icmsRate);
    const iss = value.percentage(issRate);
    const totalTaxes = icms.plus(iss);
    const valueWithTaxes = value.plus(totalTaxes);

    return {
      productValue: value,
      icms,
      iss,
      totalTaxes,
      valueWithTaxes
    };
  }

  static generateTaxSummary(product) {
    const result = this.calculateSalesTax(product.price);

    console.log(`=== TAX SUMMARY: ${product.name} ===`);
    console.log(`Product value: ${result.productValue.format()}`);
    console.log(`ICMS (18%): ${result.icms.format()}`);
    console.log(`ISS (5%): ${result.iss.format()}`);
    console.log(`Total taxes: ${result.totalTaxes.format()}`);
    console.log(`Value with taxes: ${result.valueWithTaxes.format()}`);

    return result;
  }
}

// Usage
const product = { name: 'Smartphone', price: 1299.99 };
const taxSummary = TaxCalculator.generateTaxSummary(product);
```

## 10. 🧪 Running Tests

```bash
# Run the test suite
npm test

# Run the test suite with coverage
npm run test:coverage
```

## 11. 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## 12. 📊 Similar Libraries

Here's how Currency.js compares to other popular currency and money handling libraries:

- **[Dinero.js](https://dinerojs.com/)**: A more feature-rich library with immutable API. Currency.js offers a simpler API with focus on practical business operations while Dinero.js provides more comprehensive formatting options and currency conversion.

- **[accounting.js](http://openexchangerates.github.io/accounting.js/)**: Focuses primarily on formatting rather than calculations. Currency.js provides both precise calculations and formatting in a single package.

- **[money.js](https://openexchangerates.github.io/money.js/)**: Specializes in currency conversion between different currencies. Currency.js focuses on arithmetic operations and formatting within a single currency.

- **[decimal.js](https://github.com/MikeMcl/decimal.js/)**: Provides arbitrary-precision decimal arithmetic. Currency.js offers a more focused API specifically for currency operations rather than general mathematical calculations.

Currency.js differentiates itself through its business-oriented features like discount calculations, installment distribution, and shopping cart helpers, while maintaining a lightweight footprint and intuitive API.

## 13. 🔗 Useful Links

- [GitHub Repository](https://github.com/eriveltondasilva/currency.js)
- [Report Issues](https://github.com/eriveltondasilva/currency.js/issues)
- [Complete Documentation](https://github.com/eriveltondasilva/currency.js#readme)
- [NPM Package](https://www.npmjs.com/package/@eriveltonsilva/currency.js)

## 14. 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
