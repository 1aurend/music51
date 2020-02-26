import { Mode, degree } from '../generator/Mode'
import { randomChoice } from '../generator/chordGenerator.js'

test('Dorian mode note in Major key is 2nd degree', () => {
  expect(degree(Mode.MAJOR, Mode.DORIAN)).toBe(2)
})

test('Lydian mode note in Minor key is 6th degree', () => {
  expect(degree(Mode.MINOR, Mode.LYDIAN)).toBe(6)
})
