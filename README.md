# 💰 @eriveltonsilva/currency.js <!-- omit in toc -->

![npm](https://img.shields.io/npm/v/@eriveltonsilva/currency.js)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Typescript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Size](https://img.shields.io/bundlephobia/minzip/@eriveltonsilva/currency.js)
![Tests](https://img.shields.io/badge/tests-passing-success)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A lightweight, robust JavaScript library for currency operations with precision and reliability.

<p align="center">
  <img src="https://raw.githubusercontent.com/eriveltondasilva/currency.js/main/assets/currency-banner.png" alt="Currency.js Banner" width="600">
</p>

## 📋 Table of Contents <!-- omit in toc -->
- [1. 🚀 Features](#1--features)
- [2. 📦 Installation](#2--installation)
- [3. 🔍 Basic Usage](#3--basic-usage)
- [4. 📚 Documentation](#4--documentation)
- [5. 🔗 Resources](#5--resources)
- [6. 🧪 Running Tests](#6--running-tests)
- [7. 🤝 Contributing](#7--contributing)
- [8. 📄 License](#8--license)

## 1. 🚀 Features

- ✅ **Zero dependencies**: Lightweight implementation with no external dependencies
- ✅ **Safe arithmetic operations**: Addition, subtraction, multiplication, division
- ✅ **Precise calculations**: Based on integer cents to avoid floating-point errors
- ✅ **Currency formatting**: Configurable formatting with internationalization support
- ✅ **Business operations**: Discount, surcharge, percentage calculations
- ✅ **Payment helpers**: Installment distribution, subtotals, average calculations

## 2. 📦 Installation

```bash
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

## 4. 📚 Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [API Reference](./docs/01.api-reference.md) - Detailed information about all available methods
- [Formatting](./docs/02.formatting.md) - Currency formatting across different locales
- [Best Practices](./docs/03.best-practices.md) - Tips and guidelines for using Currency.js effectively
- [Advanced Examples](./docs/04.advanced-examples.md) - Real-world usage scenarios
- [Important Warnings](./docs/05.important-warnings.md) - Critical information to be aware of

## 5. 🔗 Resources

- [GitHub Repository](https://github.com/eriveltondasilva/currency.js)
- [Report Issues](https://github.com/eriveltondasilva/currency.js/issues)
- [NPM Package](https://www.npmjs.com/package/@eriveltonsilva/currency.js)

## 6. 🧪 Running Tests

```bash
# Run the test suite
npm test

# Run the test suite with coverage
npm run test:coverage
```

## 7. 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## 8. 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
