import { describe, it, expect } from 'vitest'
import { RoundingService } from './rounding-service.ts'
import { ROUNDING_MODES } from '../config/constants.ts'

describe('RoundingService', () => {
  describe('Padrão Singleton', () => {
    it('deve retornar a mesma instância quando chamado múltiplas vezes', () => {
      const instance1 = RoundingService.instance
      const instance2 = RoundingService.instance

      expect(instance1).toBe(instance2)
    })
  })

  describe('método round', () => {
    const roundingService = RoundingService.instance

    it('deve retornar o mesmo valor quando precision é 1 e o valor é inteiro', () => {
      expect(roundingService.round(5, 1, ROUNDING_MODES.ROUND)).toBe(5)
      expect(roundingService.round(10, 1, ROUNDING_MODES.FLOOR)).toBe(10)
      expect(roundingService.round(15, 1, ROUNDING_MODES.CEIL)).toBe(15)
    })

    describe('ROUNDING_MODES.FLOOR', () => {
      it('deve arredondar para baixo com diferentes precisões', () => {
        expect(
          roundingService.round(1.29, 0.1, ROUNDING_MODES.FLOOR),
        ).toBeCloseTo(1.2, 5)
        expect(
          roundingService.round(1.99, 0.1, ROUNDING_MODES.FLOOR),
        ).toBeCloseTo(1.9, 5)
        expect(
          roundingService.round(1.99, 0.5, ROUNDING_MODES.FLOOR),
        ).toBeCloseTo(1.5, 5)
        expect(roundingService.round(1.99, 1, ROUNDING_MODES.FLOOR)).toBe(1)
        expect(roundingService.round(10.99, 5, ROUNDING_MODES.FLOOR)).toBe(10)
      })
    })

    describe('ROUNDING_MODES.CEIL', () => {
      it('deve arredondar para cima com diferentes precisões', () => {
        expect(
          roundingService.round(1.21, 0.1, ROUNDING_MODES.CEIL),
        ).toBeCloseTo(1.3, 5)
        expect(
          roundingService.round(1.91, 0.1, ROUNDING_MODES.CEIL),
        ).toBeCloseTo(2.0, 5)
        expect(
          roundingService.round(1.01, 0.5, ROUNDING_MODES.CEIL),
        ).toBeCloseTo(1.5, 5)
        expect(roundingService.round(1.01, 1, ROUNDING_MODES.CEIL)).toBe(2)
        expect(roundingService.round(11.01, 5, ROUNDING_MODES.CEIL)).toBe(15)
      })
    })

    describe('ROUNDING_MODES.ROUND', () => {
      it('deve arredondar para o mais próximo com diferentes precisões', () => {
        expect(
          roundingService.round(1.24, 0.1, ROUNDING_MODES.ROUND),
        ).toBeCloseTo(1.2, 5)
        expect(
          roundingService.round(1.25, 0.1, ROUNDING_MODES.ROUND),
        ).toBeCloseTo(1.3, 5)
        expect(
          roundingService.round(1.74, 0.5, ROUNDING_MODES.ROUND),
        ).toBeCloseTo(1.5, 5)
        expect(
          roundingService.round(1.75, 0.5, ROUNDING_MODES.ROUND),
        ).toBeCloseTo(2.0, 5)
        expect(roundingService.round(1.49, 1, ROUNDING_MODES.ROUND)).toBe(1)
        expect(roundingService.round(1.5, 1, ROUNDING_MODES.ROUND)).toBe(2)
        expect(roundingService.round(12.49, 5, ROUNDING_MODES.ROUND)).toBe(10)
        expect(roundingService.round(12.5, 5, ROUNDING_MODES.ROUND)).toBe(15)
      })
    })

    it('deve usar ROUND como padrão quando o modo não é especificado', () => {
      const resultWithInvalidMode = roundingService.round(
        1.75,
        0.5,
        undefined as any,
      )
      const resultWithRoundMode = roundingService.round(
        1.75,
        0.5,
        ROUNDING_MODES.ROUND,
      )

      expect(resultWithInvalidMode).toBe(resultWithRoundMode)
    })
  })
})
