export const MAX_CHALLENGES = 6
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const WELCOME_INFO_MODAL_MS = 350
export const DISCOURAGE_INAPP_BROWSERS = true
export const SYMBOL_TYPES = {
  Mawkin: 'Mawkin',
  Thoha: 'Thoha',
  English: 'English',
} as const
export type SymbolType = typeof SYMBOL_TYPES[keyof typeof SYMBOL_TYPES]
