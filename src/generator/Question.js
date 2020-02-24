import { ChordType } from './ChordType'
import { ChordStructure, chordStructures } from './ChordStructure'
import { accidentalForLetterNameIsInKeySignature } from './chordGenerator'

/**
 * `Question` is a collection of functions which each take a `chordContext`, and return
 * a valid question object.
 */
export const Question = {
  letterNames: function(chordContext) {
    const answers = chordContext.notes.map(note => note.letter)
    const choices = ["A", "B", "C", "D", "E", "F", "G"]
    return {
      // FIXME: Should this be "Names" or "Letter Names"?
      "type": "Names",
      "questionText": "Name the letter names from lowest to highest.",
      "choices": choices,
      "answers": answers,
      "ordered": true
    }
  },
  root: function(chordContext) {
    const rootLetter = chordContext.chordDescription.root.letter
    const rootAccidental = chordContext.chordDescription.root.accidental
    const shouldFilterOutAccidental = accidentalForLetterNameIsInKeySignature(
      rootLetter,
      rootAccidental,
      chordContext.shape
    )
    const rootAccidentalDisplay = shouldFilterOutAccidental ? "" : rootAccidental
    const answer = rootLetter + rootAccidentalDisplay
    const choices = chordContext.notes.map(note => note.letter + note.accidental)
    return {
      "type": "Roots",
      "questionText": "What's the root note?",
      "choices": choices,
      "answers": [answer]
    }
  },
  degrees: function(chordContext) {
    const key = chordContext.modeLabel
    const degree = chordContext.romanNumeralContext.degree
    const choices = ["1^", "2^", "3^", "4^", "5^", "6^", "7^"]
    const answer = degree + "^"
    return {
      "type": "Degrees",
      "questionText": "In a " + key + " key, what degree is this chord built on?",
      "choices": choices,
      "answers": [answer]
    }
  },
  role: function(chordContext) {
    const choices = [
        "In-Key", // keystroke "k"
        "Chromatic", // keystroke "c" (Chromatic Variation)
        "Mixture", // keystroke "m" (Borrowed: Mode Mixture)
        "Applied" // keystroke "a" (Borrowed: Applied)
    ]
    let answer
    switch (chordContext.chordType) {
      case ChordType.TRIAD:
        // fallthrough
      case ChordType.SEVENTH:
        return "In-Key"
      case ChordType.CHROMATIC_VARIATION:
        return "Chromatic Variation"
      case ChordType.MODE_MIXTURE:
        return "Mode Mixture"
      case ChordType.APPLIED_CHORD:
        return "Applied"
    }
    return {
      "type": "Role",
      "questionText": "What is this chord's relationship to the key?",
      "answers": [answer],
      "choices": choices
    }
  },
  quality: function(chordContext) {
    const rootLetter = chordContext.chordDescription.root.letter
    const rootAccidental = chordContext.chordDescription.root.accidental
    const chordStructureDisplay = chordContext.chordDescription.structure.displayName
    const choices = [...chordStructures(chordContext.chordType)]
      .map(structure => structure.displayName)
      .map(quality => rootLetter + rootAccidental + quality)
    const answer = rootLetter + rootAccidental + chordStructureDisplay
    return {
      "type": "Quality",
      "questionText": "What's the chord's quality?",
      "choices": choices,
      "answers": [answer]

    }
  },
  numerals: function(chordContext) {
    const roman = chordContext.romanNumeralContext.romanNumeral
    const chordType = chordContext.chordType
    const answer = roman + romanQuality(chordContext.chordDescription.structure)
    const choices = romanOptions(roman, chordType)
    return {
      "type": "Numerals",
      "questionText": "Which roman numeral describes this chord’s degree and quality?",
      "choices": choices,
      "answers": [answer]
    }
  },
  inversion: function(chordContext) {
    const chordType = chordContext.chordType
    const inversion = chordContext.chordDescription.inversion
    const roman = chordContext.romanNumeralContext.romanNumeral
    const inversionDisplay = inversionQuality(chordContext.chordDescription.structure)
    const answer = roman + inversionDisplay + inversion
    const choices = romanInversionOptions(roman, inversionDisplay, chordType)
    return {
      "type": "Inversions",
      "questionText": "What's the inversion?",
      "choices": choices,
      "answers": [answer]
    }
  },
  // FIXME: Finish implementation!
  whatFollows: function(chordContext) {
    return {
      "type": "What Follows",
      "questionText": "Which chord is most likely to follow this chord?",
      "answers": "", // defined in the chord grouping
      "choices": ""
      // for Chromatic Variation?
            // N6 or any Applied chords
        //   if Major: I  ii  iii  IV  V  vi  viio  I
        //   if minor: i  iio  III  iv  V  VI  viio  i
        //
        //  if +6
        //  V, Cad64, i, I (don't need to diff M/m)
    }
  }
}

export function questionsForChordType(chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      // fallthrough
    case ChordType.SEVENTH:
      return [
        Question.letterNames,
        Question.root,
        Question.degrees,
        Question.numerals,
        Question.inversion,
      ]
    case ChordType.CHROMATIC_VARIATION:
      return [
        Question.letterNames,
        Question.root,
        Question.degrees,
        Question.role,
        Question.quality,
        Question.whatFollows,
      ]
    case ChordType.MODE_MIXTURE:
      return [
        Question.letterNames,
        Question.root,
        Question.degrees,
        Question.role,
        Question.quality,
        Question.inversion,
      ]
    case ChordType.APPLIED_CHORD:
      return [
        Question.letterNames,
        Question.root,
        Question.degrees,
        Question.role,
        Question.quality,
        Question.inversion,
        Question.whatFollows,
      ]
    default:
      throw "Invalid chordType: " + JSON.stringify(chordType)
  }
}

export function romanOptions(romanNumeral, chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      return [
        romanNumeral.toUpperCase(),
        romanNumeral.toLowerCase(),
        romanNumeral.toLowerCase() + 'o',
        romanNumeral.toUpperCase() + '+'
      ]
    case ChordType.SEVENTH:
      return [
        romanNumeral.toUpperCase() + '7',
        romanNumeral.toLowerCase() + '7',
        romanNumeral.toLowerCase() + 'ø7',
        romanNumeral.toLowerCase() + 'o7'
      ]
    default:
      throw "Invalid chordType: " + JSON.stringify(chordType)
  }
}

export function romanInversionOptions(romanNumeral, inversion, chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      return [
        romanNumeral + inversion,
        romanNumeral + inversion + '63',
        romanNumeral + inversion + '64'
      ]
    case ChordType.SEVENTH:
      return [
        romanNumeral + inversion,
        romanNumeral + inversion + '65',
        romanNumeral + inversion + '43',
        romanNumeral + inversion + '42'
      ]
  }
}

export function romanQuality(chordStructure) {
  switch (chordStructure) {
    case ChordStructure.MAJOR_TRIAD:
      return ''
    case ChordStructure.MINOR_TRIAD:
      return ''
    case ChordStructure.DIMINISHED_TRIAD:
      return 'o'
    case ChordStructure.AUGMENTED_TRIAD:
      return '+'
    case ChordStructure.DOMINANT_SEVENTH:
      return '7'
    case ChordStructure.MAJOR_SEVENTH:
      return '7'
    case ChordStructure.MINOR_SEVENTH:
      return '7'
    case ChordStructure.HALF_DIMINISHED_SEVENTH:
      return 'ø7'
    case ChordStructure.FULLY_DIMINISHED_SEVENTH:
      return 'o7'
  }
}

export function inversionQuality(chordStructure) {
  switch (chordStructure) {
    case ChordStructure.MAJOR_TRIAD:
      return ''
    case ChordStructure.MINOR_TRIAD:
      return ''
    case ChordStructure.DIMINISHED_TRIAD:
      return 'o'
    case ChordStructure.AUGMENTED_TRIAD:
      return '+'
    case ChordStructure.DOMINANT_SEVENTH:
      return ''
    case ChordStructure.MAJOR_SEVENTH:
      return ''
    case ChordStructure.MINOR_SEVENTH:
      return ''
    case ChordStructure.HALF_DIMINISHED_SEVENTH:
      return 'ø'
    case ChordStructure.FULLY_DIMINISHED_SEVENTH:
      return 'o'
  }
}
