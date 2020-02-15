import { Accidental, distanceFromNatural } from '../generator/Accidental'

test('Accidental offset does not blow up', () => {
	expect(Accidental.offset(Accidental.DOUBLEFLAT)).toBe(0)
	expect(Accidental.offset(Accidental.FLAT)).toBe(1)
	expect(Accidental.offset(Accidental.NATURAL)).toBe(2)
	expect(Accidental.offset(Accidental.SHARP)).toBe(3)
	expect(Accidental.offset(Accidental.DOUBLESHARP)).toBe(4)
})

test('Natural has a 0 distance from natural', () => {
	expect(Accidental.offsetFromNatural(Accidental.NATURAL)).toBe(0)
})

test('Sharp has a 1 distance from natural', () => {
	expect(Accidental.offsetFromNatural(Accidental.SHARP)).toBe(1)
})

test('Doubleflat has a -2 distance from natural', () => {
	expect(Accidental.offsetFromNatural(Accidental.DOUBLEFLAT)).toBe(-2)
})
