import { ChordType } from '../generator/ChordType'
import { ChordStructure } from '../generator/ChordStructure'
import { makeChord, randomRomanNumeralContext, allowedModesByChordStructure, concretizeRoot } from '../generator/chordGenerator'
import { IndependentPitch } from '../generator/IP'
import { Accidental } from '../generator/Accidental'
import { Mode } from '../generator/Mode'


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

test('make roman numeral context', () => {
  for (var i = 0; i < Object.keys(ChordStructure).length; i++) {
    const chordStructure = Object.values(ChordStructure)[i]
    expect(randomRomanNumeralContext(chordStructure)).toBeTruthy()
  }
})

test('concretizeRoot returns DO NATURAL for MAJOR mode note in C major', () => {
  const keySignature = 'B' /*B means bottom shape*/
  const modeNote = Mode.MAJOR
  const concretizedRoot = concretizeRoot(keySignature, modeNote)
  expect(concretizedRoot.independentPitch).toBe(IndependentPitch.DO)
  expect(concretizedRoot.accidental).toBe(Accidental.NATURAL)
})

test('concretizeRoot returns XXX FLAT for MAJOR mode note in F major', () => {
  const keySignature = 'R1' /*B means bottom shape*/
  const modeNote = Mode.LYDIAN
  const concretizedRoot = concretizeRoot(keySignature, modeNote)
  expect(concretizedRoot.independentPitch).toBe(IndependentPitch.TI)
  expect(concretizedRoot.accidental).toBe(Accidental.FLAT)
})
