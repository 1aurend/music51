import { ChordStructure, chordStructures } from '../generator/ChordStructure'
import { ChordType } from '../generator/ChordType'

test('triad chord type returns four chord structures', () => {
  const expected = new Set([
    ChordStructure.MAJOR_TRIAD,
    ChordStructure.MINOR_TRIAD,
    ChordStructure.AUGMENTED_TRIAD,
    ChordStructure.DIMINISHED_TRIAD
  ])
  expect(chordStructures(ChordType.TRIAD)).toEqual(expected)
})

test('seventh chord type returns five chord structures', () => {
  const expected = new Set([
    ChordStructure.DOMINANT_SEVENTH,
    ChordStructure.MAJOR_SEVENTH,
    ChordStructure.MINOR_SEVENTH,
    ChordStructure.HALF_DIMINISHED_SEVENTH,
    ChordStructure.FULLY_DIMINISHED_SEVENTH
  ])
  expect(chordStructures(ChordType.SEVENTH)).toEqual(expected)
})

test('Basic chord structures exist', () => {
  expect(ChordStructure.MAJOR_TRIAD).toBeDefined()
  expect(ChordStructure.MINOR_TRIAD).toBeDefined()
  expect(ChordStructure.DIMINISHED_TRIAD).toBeDefined()
  expect(ChordStructure.AUGMENTED_TRIAD).toBeDefined()
  expect(ChordStructure.DOMINANT_SEVENTH).toBeDefined()
  expect(ChordStructure.MAJOR_SEVENTH).toBeDefined()
  expect(ChordStructure.MINOR_SEVENTH).toBeDefined()
  expect(ChordStructure.HALF_DIMINISHED_SEVENTH).toBeDefined()
  expect(ChordStructure.FULLY_DIMINISHED_SEVENTH).toBeDefined()
})
