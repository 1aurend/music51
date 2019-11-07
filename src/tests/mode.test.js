import { Mode, degree } from '../generator/Mode'

test('Dorian mode note in Major key is 2nd degree', () => {
  expect(degree(Mode.MAJOR, 'DORIAN')).toBe(2)
})

test('Lydian mode note in Minor key is 6th degree', () => {
  expect(degree(Mode.MINOR, 'LYDIAN')).toBe(6)
})
