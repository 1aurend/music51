import { ChordStructure, chordStructures } from '../generator/ChordStructure'
import { ChordType } from '../generator/ChordType'

test('triad chord type returns four chord structures', () => {
  const expected = new Set([
  ChordStructure.MAJOR,
    ChordStructure.MINOR,
    ChordStructure.AUGMENTED,
    ChordStructure.DIMINISHED
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
