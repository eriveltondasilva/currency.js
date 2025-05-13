import { ROUNDING_MODES } from '../config/constants.ts'

import type { RoundingModes, IRoundingService } from '../types.ts'

/**
 * Classe responsável pela formatação de valores monetários
 */
export class RoundingService implements IRoundingService {
  private static _instance: RoundingService

  private constructor() {}
  public static get instance(): RoundingService {
    return (this._instance ??= new this())
  }

  //#
  round(value: number, precision: number, mode: RoundingModes): number {
    if (precision <= 0) throw new Error('A precisão deve ser maior que zero.')

    if (precision === 1 && value % precision === 0) return value

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        return Math.floor(value / precision) * precision
      case ROUNDING_MODES.CEIL:
        return Math.ceil(value / precision) * precision
      case ROUNDING_MODES.ROUND:
      default:
        return Math.round(value / precision) * precision
    }
  }
}
