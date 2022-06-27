import { WORDS } from '../constants/wordlist'
import { getWordOfDay } from './words'

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
