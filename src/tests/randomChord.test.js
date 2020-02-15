import { 
  randomChord, 
  chooseChordType,
  chooseChordStructure, 
  chooseInversion,
  chooseKeySignature,
  randomRomanNumeralContext,
  makeChordDescription,
  partiallyConcretizeChord,
  concretizeRoot
} from '../generator/chordGenerator'
import { IndependentPitch } from '../generator/IP'
import { Accidental } from '../generator/Accidental'
import { LetterName } from '../generator/LetterName'
import { ChordType } from '../generator/ChordType'
import { ChordTypesOption } from '../generator/ChordTypesOption'
import { ChordStructure } from '../generator/ChordStructure'

test('chooseChordStructure returns a value for all valid inputs', () => {
  expect(chooseChordStructure(ChordType.TRIAD)).toBeDefined()
  expect(chooseChordStructure(ChordType.SEVENTH)).toBeDefined()
  // TODO: Add tests for borrowed and applied chords
})

test('chooseInversion returns a value for all valid inputs', () => {
  expect(chooseInversion(ChordType.TRIAD)).toBeDefined()
  expect(chooseInversion(ChordType.SEVENTH)).toBeDefined()
})

test('chooseKeySignature returns something', () => {
  expect(chooseKeySignature()).toBeDefined()
})

test('makeChordDescription makes a chordDescription', () => {
  const chordType = chooseChordType(ChordTypesOption.BOTH)
  const chordStructure = chooseChordStructure(chordType)
  const inversion = chooseInversion(chordType)
  const keySignature = chooseKeySignature()
  const romanNumeralContext = randomRomanNumeralContext(chordStructure)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  expect(chordDescription).toBeDefined()
})

test('partially concretize chord notes makes three notes for a triad', () => {
  const chordType = ChordType.TRIAD
  const chordStructure = chooseChordStructure(chordType)
  const inversion = chooseInversion(chordType)
  const keySignature = chooseKeySignature()
  const romanNumeralContext = randomRomanNumeralContext(chordStructure)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext) 
  expect(partiallyConcretizeChord(chordDescription, keySignature).length).toBe(3)
})

test('partially concretize major chord on c natural in root position in c major', () => {
  const chordStructure = ChordStructure.MAJOR
  const inversion = ""
  const keySignature = 'B' // "Bottom", i.e., C major
  const romanNumeralContext = {
    "mode": "Maj",
    "modeNote": "Maj",
    "degree": 1,
    "romanNumeral": "I"
  }
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  const partiallyConcretized = partiallyConcretizeChord(chordDescription, keySignature)
  console.log(JSON.stringify(partiallyConcretized))
  // FIXME: Handle octave correctly
  const expected = [
    { "letter": "C", "accidental": "♮", "octave": 4 },
    { "letter": "E", "accidental": "♮", "octave": 4 },
    { "letter": "G", "accidental": "♮", "octave": 4 }
  ]
  expect(partiallyConcretized).toStrictEqual(expected)
})

test('concretizeRoot c natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const modeNote = 'Maj'
  const expected = {
    independentPitch: IndependentPitch.DO,
    accidental: Accidental.NATURAL,
    letter: LetterName.C,
    syllable: IndependentPitch.DO
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot e natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const modeNote = 'phr'
  const expected = {
    independentPitch: IndependentPitch.MI,
    accidental: Accidental.NATURAL,
    letter: LetterName.E,
    syllable: IndependentPitch.MI
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot g natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const modeNote = 'Dom'
  const expected = {
    independentPitch: IndependentPitch.SO,
    accidental: Accidental.NATURAL,
    letter: LetterName.G,
    syllable: IndependentPitch.SO
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot d natural in D', () => {
  const keySignature = 'L2' // D major
  const modeNote = 'Maj'
  const expected = {
    independentPitch: IndependentPitch.RE,
    accidental: Accidental.NATURAL,
    letter: LetterName.D,
    syllable: IndependentPitch.RE
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot f natural in d', () => {
  const keySignature = 'R1' // d min
  const modeNote = 'Maj'
  const expected = {
    independentPitch: IndependentPitch.FA,
    accidental: Accidental.NATURAL,
    letter: LetterName.F,
    syllable: IndependentPitch.FA
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('randomChord does not blow up', () => {
  const options = {
    chordTypes: { triads: true, sevenths: true },
    roots: { common: true, any: false }
  }
  let chord = randomChord(options)
})

