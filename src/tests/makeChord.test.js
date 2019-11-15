import { ChordType } from '../generator/ChordType'
import { ChordStructure } from '../generator/ChordStructure'
import { makeChord, makeRomanNumeralContext } from '../generator/chordGenerator'
import { IndependentPitch } from '../generator/IP'
import { Accidental } from '../generator/Accidental'

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

// Independent Pitch Subsets are potential pools of pitches (represented by `Independent Pitch` values)
// which sound good together. They act as an interface between the notion of "sounding good" and
// conventional music contexts.
const IndependentPitchSubset = {
  // The "top" set of independent pitches.
  TOP: {
    NA: IndependentPitch.NA,
    FA: IndependentPitch.FA,
    VE: IndependentPitch.VE,
    PE: IndependentPitch.PE,
    KE: IndependentPitch.KE,
    TI: IndependentPitch.TI,
    BA: IndependentPitch.BA,
  },
  // The "bottom" set of independent pitches.
  BOTTOM: {
    RE: IndependentPitch.RE,
    MI: IndependentPitch.MI,
    FA: IndependentPitch.FA,
    SO: IndependentPitch.SO,
    LA: IndependentPitch.LA,
    TI: IndependentPitch.TI,
    DO: IndependentPitch.DO,
  }
}

test('make roman numeral context', () => {
  const chordStructure = ChordStructure.MAJOR
  const rootSyllable = IndependentPitchSubset.BOTTOM.FA
  const rootAccidental = Accidental.NATURAL
  makeRomanNumeralContext(chordStructure, rootSyllable, rootSyllable)
})
