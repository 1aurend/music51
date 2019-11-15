import { ChordType } from '../generator/ChordType'
import { ChordStructure } from '../generator/ChordStructure'
import { makeChord } from '../generator/chordGenerator'

test('triad chord comes out when we generate a triad chord', () => {
  const chord = makeChord(ChordType.TRIAD)
  const triads = new Set([
    ChordStructure.MAJOR,
    ChordStructure.MINOR,
    ChordStructure.AUGMENTED,
    ChordStructure.DIMINISHED
  ])
  expect(triads.has(chord.structure)).toBeTruthy()
})

test('seventh chord comes out when we generate a seventh chord', () => {
  const chord = makeChord(ChordType.SEVENTH)
  const sevenths = new Set([
    ChordStructure.DOMINANT_SEVENTH,
    ChordStructure.MAJOR_SEVENTH,
    ChordStructure.MINOR_SEVENTH,
    ChordStructure.HALF_DIMINISHED_SEVENTH,
    ChordStructure.FULLY_DIMINISHED_SEVENTH
  ])
  expect(sevenths.has(chord.structure)).toBeTruthy()
})
