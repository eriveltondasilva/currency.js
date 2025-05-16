import { Money, ROUNDING_MODES } from './index.ts'

const money = Money(10.7)

console.log('round 25:\t', money.round(25).value)
console.log('ceil 25:\t', money.round(25, ROUNDING_MODES.CEIL).value)
console.log('floor 25:\t', money.round(25, ROUNDING_MODES.FLOOR).value)
console.log('trunc 25:\t', money.round(25, ROUNDING_MODES.TRUNC).value)

// Output:
// round 5: 10.55
// round 10: 10.60
// round 50: 10.50
// round 100: 11.00
