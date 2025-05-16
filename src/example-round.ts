import { RoundingService } from './lib/rounding-service.ts'

const rounder = RoundingService.instance
const cents = 1056

// .round(1056, 10, ROUNDING_MODES.ROUND)
console.log('round 5:', rounder.round(cents, 5))
console.log('round 10:', rounder.round(cents, 10))
console.log('round 15:', rounder.round(cents, 15))
console.log('round 20:', rounder.round(cents, 20))
console.log('round 25:', rounder.round(cents, 25))
console.log('round 30:', rounder.round(cents, 30))
console.log('round 50:', rounder.round(cents, 50))
console.log('round 60:', rounder.round(cents, 60))
console.log('round 75:', rounder.round(cents, 75))
console.log('round 100:', rounder.round(cents, 100))
