import {
  randomChordContext,
  chooseChordType,
  chooseChordStructure,
  chooseInversion,
  chooseKeySignature,
  randomRomanNumeralContext,
  makeChordDescription,
  partiallyConcretizeChord,
  concretizeRoot,
  accidentalForLetterNameIsInKeySignature
} from '../generator/chordGenerator'
import { IndependentPitch } from '../generator/IP'
import { Accidental } from '../generator/Accidental'
import { LetterName } from '../generator/LetterName'
import { ChordType } from '../generator/ChordType'
import { ChordTypesOption } from '../generator/ChordTypesOption'
import { ChordStructure } from '../generator/ChordStructure'

test('chooseChordStructure returns a value for all valid inputs', () => {
  Object.values(ChordType).forEach(chordType => {
    expect(chooseChordStructure(chordType))
  })
})

test('chooseInversion returns a value for all valid inputs', () => {
  Object.values(ChordStructure).forEach(chordStructure => {
    expect(chooseInversion(chordStructure)).toBeDefined()
  })
})

test('chooseKeySignature returns something', () => {
  expect(chooseKeySignature()).toBeDefined()
})

test('makeChordDescription makes a chordDescription', () => {
  const chordType = chooseChordType(ChordTypesOption.BOTH)
  const chordStructure = chooseChordStructure(chordType)
  const inversion = chooseInversion(chordStructure)
  const keySignature = chooseKeySignature()
  const modeLabel = Object.keys(chordStructure.commonRootOffsets).randomElement()
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  expect(chordDescription).toBeDefined()
})

test('partially concretize chord notes makes three notes for a triad', () => {
  const chordType = ChordType.TRIAD
  const chordStructure = chooseChordStructure(chordType)
  const inversion = chooseInversion(chordStructure)
  const keySignature = chooseKeySignature()
  const modeLabel = Object.keys(chordStructure.commonRootOffsets).randomElement()
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  expect(partiallyConcretizeChord(chordDescription, keySignature).length).toBe(3)
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

test('concretizeRoot E flat in g', () => {
  const keySignature = 'R2' // g min
  const modeNote = 'Lyd'
  const expected = {
    independentPitch: IndependentPitch.NA,
    accidental: Accidental.FLAT,
    letter: LetterName.E,
    syllable: IndependentPitch.MI
  }
  const result = concretizeRoot(keySignature, modeNote)
  expect(result).toStrictEqual(expected)
})

test('randomChordContext does not blow up', () => {
  const options = {
    chordTypes: { triads: true, sevenths: true },
    roots: { common: true, any: false }
  }
  let chord = randomChordContext(options)
})

test('randomRomanNumeralContext returns a valid mode note and degree', () => {
  const chordStructure = ChordStructure.MINOR_TRIAD
  for (var i = 0; i < 100; i++) {
    const modeLabel = Object.keys(chordStructure.commonRootOffsets).randomElement()
    const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
    expect(romanNumeralContext.modeNote).toBeDefined()
    expect(romanNumeralContext.degree).toBeDefined()
  }
})

test('c natural is in key signature with no sharps nor flats', () => {
  expect(accidentalForLetterNameIsInKeySignature(LetterName.C, Accidental.NATURAL, "B"))
    .toBeTruthy()
})

test('c sharp is not in key signature with no sharps nor flats', () => {
  expect(accidentalForLetterNameIsInKeySignature(LetterName.C, Accidental.SHARP, "B"))
    .toBeFalsy()
})
