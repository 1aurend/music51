import { staffPosition } from '../generator/chordGenerator'
import { LetterName } from '../generator/LetterName'
import { Clef } from '../generator/Clef'


test('middle C in treble clef is -2', () => {
  expect(staffPosition(LetterName.C, 4, Clef.TREBLE)).toBe(-2)
})

test('C above middle C in treble clef is 5', () => {
  expect(staffPosition(LetterName.C, 5, Clef.TREBLE)).toBe(5)
})


test('middle C in bass clef is -2', () => {
  expect(staffPosition(LetterName.C, 4, Clef.BASS)).toBe(10)
})

test('C below middle C in bass clef is 5', () => {
  expect(staffPosition(LetterName.C, 3, Clef.BASS)).toBe(3)
})


test('D above middle C in treble is -1', () => {
  expect(staffPosition(LetterName.D, 4, Clef.TREBLE)).toBe(-1)
})

test('B below middle C in treble is -3', () => {
  expect(staffPosition(LetterName.B, 3, Clef.TREBLE)).toBe(-3)
})


test('D above middle C in bass is 11', () => {
  expect(staffPosition(LetterName.D, 4, Clef.BASS)).toBe(11)
})

test('B below middle C in bass is 9', () => {
  expect(staffPosition(LetterName.B, 3, Clef.BASS)).toBe(9)
})
