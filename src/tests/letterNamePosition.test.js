import { letterNamePosition } from '../generator/chordGenerator'
import { LetterName } from '../generator/LetterName'


test('verify that C has position 0', () => {
  expect(letterNamePosition(LetterName.C)).toBe(0)
  expect(letterNamePosition(LetterName.D)).toBe(1)
  expect(letterNamePosition(LetterName.E)).toBe(2)
  expect(letterNamePosition(LetterName.F)).toBe(3)
  expect(letterNamePosition(LetterName.G)).toBe(4)
  expect(letterNamePosition(LetterName.A)).toBe(5)
  expect(letterNamePosition(LetterName.B)).toBe(6)
})
