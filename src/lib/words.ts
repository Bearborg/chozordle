import { WORDS } from '../constants/wordlist'
import { USED_WORDS } from '../constants/usedWords'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { default as seedrandom } from 'seedrandom'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.has(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

const daysElapsedBetween = (start: Date, end: Date) => {
  return Math.floor((end.valueOf() - start.valueOf()) / (24 * 60 * 60 * 1000))
}

const shufflePlaylist = (
  playlist: Array<number>,
  seeded_rng: seedrandom.PRNG
) => {
  let currentIndex = playlist.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.abs(seeded_rng.int32()) % currentIndex
    currentIndex--

    // And swap it with the current element.
    ;[playlist[currentIndex], playlist[randomIndex]] = [
      playlist[randomIndex],
      playlist[currentIndex],
    ]
  }

  return playlist
}

export const getWordOfDay = (today: Date = new Date()) => {
  // April 19, 2022 was the first day of Chozordle
  const firstDay = new Date(2022, 4, 19)

  today.setHours(0, 0, 0, 0)

  // Number of days elapsed since first day
  const daysElapsed = daysElapsedBetween(firstDay, today)
  const startOfCurrentPlaylist = Math.floor(daysElapsed / WORDS.size)
  const index = daysElapsed % WORDS.size

  // Equivalent to python range(WORDS.size)
  let playlist = [...Array(WORDS.size).keys()]
  const prng = seedrandom.alea(startOfCurrentPlaylist.toString())

  // Filter out any words that have been used previously,
  // to avoid duplicates after a reshuffle
  if (USED_WORDS.has(startOfCurrentPlaylist)) {
    playlist = playlist.filter((i) => {
      const exclusions = USED_WORDS.get(startOfCurrentPlaylist) as string[]
      return exclusions.find((x) => x === Array.from(WORDS)[i][0]) === undefined
    })
  }
  shufflePlaylist(playlist, prng)

  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)

  const solutionPair = Array.from(WORDS)[playlist[index]]

  return {
    solution: localeAwareUpperCase(solutionPair[0]),
    solutionMeaning: localeAwareUpperCase(solutionPair[1]),
    solutionIndex: daysElapsedBetween(firstDay, today),
    tomorrow: nextDay.valueOf(),
  }
}

export const { solution, solutionMeaning, solutionIndex, tomorrow } =
  getWordOfDay()
