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
   * Arredonda um valor em centavos de acordo com o modo e precisão especificados.
   *
   * @param cents - O valor em centavos a ser arredondado
   * @param precision - A precisão do arredondamento (padrão: 1)
   * @param mode - O modo de arredondamento a ser utilizado (padrão: "round")
   * @returns O valor arredondado em centavos
   *
   * @example
   * // Arredondar 1056 centavos (10.56) para a próxima dezena (10.60)
   * RoundingService.instance.round(1056, 10, ROUNDING_MODES.CEIL); // Retorna 1060
   *
   * @example
   * // Arredondar 1056 centavos (10.56) para baixo com precisão 10 (10.50)
   * RoundingService.instance.round(1056, 10, ROUNDING_MODES.FLOOR); // Retorna 1050
   */
  public round(
    cents: number,
    precision: number = 1,
    mode: RoundingModes = ROUNDING_MODES.ROUND,
  ): number {
    if (!Number.isFinite(precision) || precision <= 0) {
      throw new Error('A precisão deve ser um número positivo')
    }

    if (precision === 1 || cents === 0) return cents

    const isNegative = cents < 0
    const absoluteCents = Math.abs(cents)
    let result: number

    switch (mode) {
      case ROUNDING_MODES.FLOOR:
        result = Math.floor(absoluteCents / precision) * precision
        break

      case ROUNDING_MODES.CEIL:
        result = Math.ceil(absoluteCents / precision) * precision
        break

      case ROUNDING_MODES.TRUNC:
        result = Math.trunc(absoluteCents / precision) * precision
        break

      case ROUNDING_MODES.ROUND:
      default:
        result = Math.round(absoluteCents / precision) * precision
        break
    }

    return isNegative ? -result : result
  }
}
