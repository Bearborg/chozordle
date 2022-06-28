import { WORDS } from '../constants/wordlist'
import { getWordOfDay } from './words'

describe('getWordOfDay', () => {
  test('a playlist contains no repetitions', () => {
    const date = new Date(2022, 4, 19) // Chozordle start date
    date.setDate(date.getDate() + WORDS.size * 9) // start-date-aligned date, i.e. start of fresh playlist
    let words: string[] = []

    for (let i = 0; i < WORDS.size; i++) {
      words.push(getWordOfDay(date).solution)
      date.setDate(date.getDate() + 1)
    }

    expect(new Set(words).size).toBe(WORDS.size)
  })
  test('repetitions start at next playlist', () => {
    const date = new Date(2022, 4, 19) // Chozordle start date
    date.setDate(date.getDate() + WORDS.size * 9 + 1) // 1 day after the start of a new playlist
    let words: string[] = []

    for (let i = 0; i < WORDS.size; i++) {
      words.push(getWordOfDay(date).solution)
      date.setDate(date.getDate() + 1)
    }

    expect(new Set(words).size).toBe(WORDS.size - 1) // 1 duplicate word
  })
  test('a word is always chosen when there are exclusions', () => {
    const date = new Date(2022, 5, 26) // Date exclusions were added
    let words: string[] = []

    for (let i = 0; i < 45; i++) {
      const solution = getWordOfDay(date).solution
      if (new Set(words).has(solution)) {
        console.log(`Collision on ${date}`)
      }
      words.push(solution)
      date.setDate(date.getDate() + 1)
    }

    expect(new Set(words).size).toBe(words.length)
  })
})
