import { ROUNDING_MODES } from '../config/constants.ts'

import type { IRoundingService, RoundingModes } from '../types.ts'

/** Classe responsável pelo arredondamento de valores monetários. */
export class RoundingService implements IRoundingService {
  private static _instance: RoundingService

  private constructor() {}
  public static get instance(): RoundingService {
    return (this._instance ??= new this())
  }

  /**
   * Arredonda um valor numérico de acordo com a precisão e o modo de arredondamento especificados.
   *
   * @param value - O valor a ser arredondado
   * @param precision - A precisão do arredondamento (deve ser maior que zero)
   * @param mode - O modo de arredondamento a ser utilizado
   * @returns O valor arredondado de acordo com os parâmetros especificados
   */
  public round(value: number, precision: number, mode: RoundingModes): number {
    if (precision === 1 && Number.isInteger(value)) return value

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
