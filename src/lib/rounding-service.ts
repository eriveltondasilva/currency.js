import { ROUNDING_MODES } from '../config/constants.ts'
import type { RoundingModes } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class RoundingService {
  private static _instance: RoundingService

  private constructor() {}
  public static get instance(): RoundingService {
    return (this._instance ??= new this())
  }

  //#
  round(cents: number, precision: number, mode: RoundingModes): number {
    if (precision <= 0) throw new Error('A precisão deve ser maior que zero.')

    if (precision === 1 && cents % precision === 0) return cents

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        return Math.floor(cents / precision) * precision
      case ROUNDING_MODES.CEIL:
        return Math.ceil(cents / precision) * precision
      case ROUNDING_MODES.ROUND:
      default:
        return Math.round(cents / precision) * precision
    }
  }
}
