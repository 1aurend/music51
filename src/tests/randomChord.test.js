import {
  randomChordContext,
  chooseChordType,
  chooseChordStructure,
  chooseInversion,
  chooseKeySignature,
  chooseModeLabel,
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
import { Mode } from '../generator/Mode'

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
  const modeLabel = chooseModeLabel(chordStructure)
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  expect(chordDescription).toBeDefined()
})

test('partially concretize chord notes makes three notes for a triad', () => {
  const chordType = ChordType.TRIAD
  const chordStructure = chooseChordStructure(chordType)
  const inversion = chooseInversion(chordStructure)
  const keySignature = chooseKeySignature()
  const modeLabel = chooseModeLabel(chordStructure)
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  expect(partiallyConcretizeChord(chordDescription, keySignature).length).toBe(3)
})

test('concretizeRoot c natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 0,
    degree: 1,
    romanNumeral: "I",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.DO,
    accidental: Accidental.NATURAL,
    letter: LetterName.C,
    syllable: IndependentPitch.DO
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot e natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 4,
    degree: 3,
    romanNumeral: "iii",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.MI,
    accidental: Accidental.NATURAL,
    letter: LetterName.E,
    syllable: IndependentPitch.MI
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot g natural in C', () => {
  const keySignature = 'B' // "Bottom", i.e., C major
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 7,
    degree: 5,
    romanNumeral: "V",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.SO,
    accidental: Accidental.NATURAL,
    letter: LetterName.G,
    syllable: IndependentPitch.SO
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot d natural in D', () => {
  const keySignature = 'L2' // D major
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 0,
    degree: 1,
    romanNumeral: "I",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.RE,
    accidental: Accidental.NATURAL,
    letter: LetterName.D,
    syllable: IndependentPitch.RE
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot f natural in d', () => {
  const keySignature = 'R1' // d min
  const romanNumeralContext = {
    mode: Mode.MINOR,
    rootOffset: 3,
    degree: 3,
    romanNumeral: "III",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.FA,
    accidental: Accidental.NATURAL,
    letter: LetterName.F,
    syllable: IndependentPitch.FA
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
  expect(result).toStrictEqual(expected)
})

test('concretizeRoot E flat in g', () => {
  const keySignature = 'R2' // g min
  const romanNumeralContext = {
    mode: Mode.MINOR,
    rootOffset: 8,
    degree: 6,
    romanNumeral: "vi",
    incidental: 0
  }
  const expected = {
    independentPitch: IndependentPitch.NA,
    accidental: Accidental.FLAT,
    letter: LetterName.E,
    syllable: IndependentPitch.MI
  }
  const result = concretizeRoot(keySignature, romanNumeralContext)
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
    expect(romanNumeralContext.mode).toBeDefined()
    expect(romanNumeralContext.degree).toBeDefined()
  }
})

test('randomRomanNumeralContext for N6 is valid', () => {
  const romanNumeralContext = randomRomanNumeralContext(ChordStructure.NEAPOLITAN_SIXTH, "Major")
  expect(romanNumeralContext).toBeDefined()
})

test('N6 in C Major is spelled correctly', () => {
  const chordStructure = ChordStructure.NEAPOLITAN_SIXTH
  const inversion = "63"
  const keySignature = 'B' // C
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 1,
    degree: 2,
    romanNumeral: 'N6',
    incidental: 0
  }
  const chordDescription = makeChordDescription(
    chordStructure,
    inversion,
    keySignature,
    romanNumeralContext
  )
  const partiallyConcretized = partiallyConcretizeChord(chordDescription, keySignature)
  const expected = [
    {
      letter: LetterName.F,
      accidental: "",
      octave: 0
    },
    {
      letter: LetterName.A,
      accidental: Accidental.FLAT,
      octave: 0
    },
    {
      letter: LetterName.D,
      accidental: Accidental.FLAT,
      octave: 1
    }
  ]
  expect(partiallyConcretized).toStrictEqual(expected)
})

test('It+6 in C Major is spelled correctly', () => {
  const chordStructure = ChordStructure.ITALIAN_AUGMENTED_SIXTH
  const inversion = ""
  const keySignature = 'B' // C
  const romanNumeralContext = {
    mode: Mode.MAJOR,
    rootOffset: 8,
    degree: 6,
    romanNumeral: 'It+6',
    incidental: -1
  }
  const chordDescription = makeChordDescription(
    chordStructure,
    inversion,
    keySignature,
    romanNumeralContext
  )
  const partiallyConcretized = partiallyConcretizeChord(chordDescription, keySignature)
  const expected = [
    {
      letter: LetterName.A,
      accidental: Accidental.FLAT,
      octave: 0
    },
    {
      letter: LetterName.C,
      accidental: "",
      octave: 1
    },
    {
      letter: LetterName.F,
      accidental: Accidental.SHARP,
      octave: 1
    }
  ]
  expect(partiallyConcretized).toStrictEqual(expected)
})

test('randomRomanNumeralContext for Ger+6 in C Major is valid', () => {
  const romanNumeralContext = randomRomanNumeralContext(ChordStructure.GERMAN_AUGMENTED_SIXTH, "Major")
  expect(romanNumeralContext).toBeDefined()
})

test('concretized root for N6 in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.NEAPOLITAN_SIXTH
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.BA,
    accidental: Accidental.FLAT,
    letter: LetterName.D,
    syllable: IndependentPitch.RE
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('concretized root for Ger+6 in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.GERMAN_AUGMENTED_SIXTH
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.PE,
    accidental: Accidental.FLAT,
    letter: LetterName.A,
    syllable: IndependentPitch.LA
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('concretized root for It+6 in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.ITALIAN_AUGMENTED_SIXTH
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.PE,
    accidental: Accidental.FLAT,
    letter: LetterName.A,
    syllable: IndependentPitch.LA
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('concretized root for Fr+6 in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.FRENCH_AUGMENTED_SIXTH
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.PE,
    accidental: Accidental.FLAT,
    letter: LetterName.A,
    syllable: IndependentPitch.LA
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('concretized root for V/V in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.FIVE_OF_FIVE
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.RE,
    accidental: Accidental.NATURAL,
    letter: LetterName.D,
    syllable: IndependentPitch.RE
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('concretized root for V/vi in C Major is valid', () => {
  const keySignature = 'B' // C
  const chordStructure = ChordStructure.FIVE_OF_SIX
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, "Major")
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext)
  const expected = {
    independentPitch: IndependentPitch.MI,
    accidental: Accidental.NATURAL,
    letter: LetterName.E,
    syllable: IndependentPitch.MI
  }
  expect(concretizedRoot).toStrictEqual(expected)
})

test('randomRomanNumeralContext for MAJOR_TRIAD test bed', () => {
  const romanNumeralContext = randomRomanNumeralContext(ChordStructure.MAJOR_TRIAD, "Major")
  expect(romanNumeralContext).toBeDefined()
})

test('c natural is in key signature with no sharps nor flats', () => {
  expect(accidentalForLetterNameIsInKeySignature(LetterName.C, Accidental.NATURAL, "B"))
    .toBeTruthy()
})

test('c sharp is not in key signature with no sharps nor flats', () => {
  expect(accidentalForLetterNameIsInKeySignature(LetterName.C, Accidental.SHARP, "B"))
    .toBeFalsy()
})

test('chooseModeLabel always returns a valid mode label', () => {
  Object.values(ChordStructure).forEach(chordStructure => {
    expect(chooseModeLabel(chordStructure)).toBeDefined()
  })
})
