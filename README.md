# 💰 @eriveltonsilva/currency.js

![npm](https://img.shields.io/npm/v/@eriveltonsilva/currency.js)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Typescript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Size](https://img.shields.io/bundlephobia/minzip/@eriveltonsilva/currency.js)
![Tests](https://img.shields.io/badge/tests-passing-success)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A lightweight, robust JavaScript library for precise currency operations. Designed to eliminate floating-point errors and simplify financial calculations in web applications.

<p align="center">
  <img src="https://raw.githubusercontent.com/eriveltondasilva/currency.js/main/assets/currency-banner.png" alt="Currency.js Banner" width="600">
</p>

## 🚀 Why Currency.js?

**Financial operations demand precision.** JavaScript's native floating-point math can lead to errors when handling currency values:

```javascript
// Native JS floating-point issues
0.1 + 0.2                   // 0.30000000000000004 ❌
19.99 * 0.07                // 1.3993000000000002 ❌
(10.25 * 3).toFixed(2)      // "30.75" ❌ (close, but doesn't handle rounding properly)

// With Currency.js
Money(0.1).plus(0.2).value  // 0.3 ✅
Money(19.99).percentage(7)  // 1.40 ✅ (properly rounded)
Money(10.25).times(3).value // 30.75 ✅
```

## 📦 Installation

```bash
npm install @eriveltonsilva/currency.js
```

## 🔍 Quick Start

```javascript
import Money from '@eriveltonsilva/currency.js'

// Create money instances
const price = Money(19.99)
const discount = Money(5)

// Basic operations
const finalPrice = price.minus(discount)
console.log(finalPrice.format())  // $14.99

// Chain operations
const total = Money(100)
  .applyDiscount(15)  // Apply 15% discount
  .plus(4.99)         // Add shipping
  .format({ currencyCode: 'EUR' })  // Format as euros

console.log(total)  // 89.99 €

// Business calculations
const subtotal = Money(125.99)
const installments = subtotal.allocate(3)  // [42.00, 42.00, 41.99]
```

## ✨ Key Features

- **Zero Dependencies**: Lightweight implementation (< 5KB min+gzip)
- **Type-Safe Operations**: Full TypeScript support with comprehensive type definitions
- **Immutable Values**: All operations return new Money instances
- **Precise Calculations**: Uses integer-based math to eliminate floating-point errors
- **Business Operations**: Support for discounts, taxes, installments, and more
- **Flexible Formatting**: Internationalization support for 100+ currencies and locales
- **Simple API**: Intuitive method names and chainable operations

## 🔧 Core APIs

### Creating Money Instances

```javascript
// Basic creation
const a = Money(10.50)          // From number
const b = Money("10.50")        // From string
const c = Money(a)              // From another Money instance

// With format options
const price = Money(99.99, {
  currencyCode: 'EUR',
  locale: 'de-DE',
})

// Pre-configured currencies
import { Currency } from '@eriveltonsilva/currency.js'

const usd = Currency.USD(99.99)  // $99.99
const eur = Currency.EUR(99.99)  // 99.99 €
const brl = Currency.BRL(99.99)  // R$ 99,99
```

### Essential Operations

```javascript
// Arithmetic
const sum = price.plus(20)           // Addition
const diff = price.minus(5.99)       // Subtraction
const doubled = price.times(2)       // Multiplication
const half = price.dividedBy(2)      // Division

// Comparison
price.equals(99.99)                  // true
price.greaterThan(50)                // true
price.lessThan(100)                  // false
price.isBetween(50, 150)             // true

// Business operations
const tenPercent = price.percentage(10)    // 10% of price
const discounted = price.applyDiscount(20) // 20% discount
const total = price.applySurcharge(15)     // 15% surcharge
```

## 📚 Documentation

For comprehensive guides and examples, explore our documentation:

- [API Reference](./docs/01.api-reference.md) - Complete method and property listing
- [Formatting Guide](./docs/02.formatting.md) - Currency formatting options
- [Best Practices](./docs/03.best-practices.md) - Recommended usage patterns
- [Advanced Examples](./docs/04.advanced-examples.md) - Real-world implementations
- [Important Warnings](./docs/05.important-warnings.md) - Limitations to be aware of

## 🧪 Testing

```bash
# Run the test suite
npm test

# Run the test suite with coverage
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [GitHub Repository](https://github.com/eriveltondasilva/currency.js)
- [Report Issues](https://github.com/eriveltondasilva/currency.js/issues)
- [NPM Package](https://www.npmjs.com/package/@eriveltonsilva/currency.js)