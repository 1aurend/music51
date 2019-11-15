import { ModeSubset, degree } from '../generator/Mode'
import { randomChoice } from '../generator/chordGenerator.js'

test('Dorian mode note in Major key is 2nd degree', () => {
  expect(degree(ModeSubset.MAJOR, 'DORIAN')).toBe(2)
})

test('Lydian mode note in Minor key is 6th degree', () => {
  expect(degree(ModeSubset.MINOR, 'LYDIAN')).toBe(6)
})
