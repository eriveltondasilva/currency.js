/**
 * Opções de arredondamento
 */
export const ROUNDING_MODES = {
  ROUND: 'round',
  FLOOR: 'floor',
  CEIL: 'ceil',
} as const
export type ROUNDING_MODES =
  (typeof ROUNDING_MODES)[keyof typeof ROUNDING_MODES]

/**
 * Mapa de localização para moedas
 */
export const CURRENCY_LOCALES = {
  BRL: 'pt-BR',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
  DEFAULT: 'en-US',
} as const
export type CURRENCY_LOCALES =
  (typeof CURRENCY_LOCALES)[keyof typeof CURRENCY_LOCALES]
