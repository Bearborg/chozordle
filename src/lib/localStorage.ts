import { SYMBOL_TYPES, SymbolType } from '../constants/settings'

const gameStateKey = 'gameState'
const highContrastKey = 'highContrast'
const chozoModeKey = 'chozoMode' // Legacy setting
const symbolTypeKey = 'symbolType'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}

export const setStoredSymbolType = (symbolType: SymbolType) => {
  localStorage.setItem(symbolTypeKey, symbolType)
}

export const getStoredSymbolType = () => {
  // Read legacy "Chozo Mode" setting just in case
  const symbolVal = localStorage.getItem(symbolTypeKey)
  const chozoModeVal = localStorage.getItem(chozoModeKey)
  if (symbolVal === null) {
    if (chozoModeVal === null) {
      return SYMBOL_TYPES.Mawkin
    } else {
      return chozoModeVal === '0' ? SYMBOL_TYPES.English : SYMBOL_TYPES.Mawkin
    }
  } else {
    return symbolVal as SymbolType
  }
}
