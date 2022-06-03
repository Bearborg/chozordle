import { getGuessStatuses } from './statuses'
import { solutionIndex, unicodeSplit } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES, SymbolType, SYMBOL_TYPES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
  solution: string,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  symbolType: SymbolType,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `${GAME_TITLE} #${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
    generateEmojiGrid(solution, guesses, getEmojiTiles(symbolType))

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return i % 2 === 0 ? tiles[0] : tiles[1]
            case 'present':
              return i % 2 === 0 ? tiles[2] : tiles[3]
            default:
              return tiles[4]
          }
        })
        .join('')
    })
    .join('\n')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

const getEmojiTiles = (symbolType: SymbolType) => {
  let tiles: string[] = []
  if (symbolType === SYMBOL_TYPES.Thoha) {
    tiles.push('⏹')
    tiles.push('⏹')
    tiles.push('🟥')
    tiles.push('🟥')
    tiles.push('⬜')
  } else {
    tiles.push('🔽')
    tiles.push('🔼')
    tiles.push('🔻')
    tiles.push('🔺')
    tiles.push('⬜')
  }
  return tiles
}
