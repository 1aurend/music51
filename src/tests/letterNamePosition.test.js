import { letterNamePosition, letterNames } from '../generator/chordGenerator'


test('verify that C has position 0', () => {
  expect(letterNamePosition(letterNames.C)).toBe(0)
  expect(letterNamePosition(letterNames.D)).toBe(1)
  expect(letterNamePosition(letterNames.E)).toBe(2)
  expect(letterNamePosition(letterNames.F)).toBe(3)
  expect(letterNamePosition(letterNames.G)).toBe(4)
  expect(letterNamePosition(letterNames.A)).toBe(5)
  expect(letterNamePosition(letterNames.B)).toBe(6)
})
