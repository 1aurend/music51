import { ChordStructure, chordStructures } from './ChordStructure'

export const Question = {
  letterNames: function(chordContext) {
    return {
      // FIXME: Should this be "Names" or "Letter Names"?
      "type": "Names",
      "questionText": "Name the letter positions from lowest to highest.",
      "answers": chordContext.notes.map(note => note.letter),
      "ordered": true,
      "choices": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G"
      ]
    }
  },
  root: function(chordContext) {
    const rootLetter = chordContext.chordDescription.root.letter
    const rootAccidental = chordContext.chordDescription.root.accidental
    return {
      "type": "Roots",
      "questionText": "What's the root note?",
      "answers": [rootLetter + rootAccidental],
      // FIXME: Currently not filtering out naturals
      "choices": chordContext.notes.map(note => note.letter + note.accidental)
    }
  },
  degrees: function(chordContext) {
    const key = chordContext.modeLabel
    const degree = chordContext.romanNumeralContext.degree
    return {
      "type": "Degrees",
      "questionText": "In a " + key + " key, what degree is this chord built on?",
      "answers": [degree + "^"],
      "choices": [
          "1^",
          "2^",
          "3^",
          "4^",
          "5^",
          "6^",
          "7^"
      ]
    }
  },
  quality: function(chordContext) {
    const rootLetter = chordContext.chordDescription.root.letter
    const rootAccidental = chordContext.chordDescription.root.accidental
    return {
      "type": "Quality",
      "questionText": "What's the chord's quality?",
      "answers": [rootLetter + rootAccidental + chordContext.chordDescription.structure.displayName],
      "choices": [...chordStructures(chordContext.chordType)]
        .map(structure => structure.displayName)
        .map(quality => rootLetter + rootAccidental + quality)
    }
  },
  numerals: function(chordContext) {
    const roman = chordContext.romanNumeralContext.romanNumeral
    const chordType = chordContext.chordType
    let romanOptions
    if (chordType === 'triad') {
      romanOptions = [
        roman.toUpperCase(),
        roman.toLowerCase(),
        roman.toLowerCase() + 'o',
        roman.toUpperCase() + '+'
      ]
    }
    if (chordType === 'seventh') {
      romanOptions = [
        roman.toUpperCase() + '7',
        roman.toLowerCase() + '7',
        roman.toLowerCase() + 'ø7',
        roman.toLowerCase() + 'o7'
      ]
    }
    return {
      "type": "Numerals",
      "questionText": "Which roman numeral describes this chord’s degree and quality?",
      "answers": [roman + romanQuality(chordContext.chordDescription.structure)],
      "choices": romanOptions
    }
  },
  inversions: function(chordContext) {
    const chordType = chordContext.chordType
    const inversion = chordContext.inversion
    const roman = chordContext.romanNumeralContext.romanNumeral
    const inversionDisplay = inversionQuality(chordContext.chordDescription.structure)
    let romanInversionOptions
    // [roman + inversionQuality + " " + inversion]
    if (chordType === 'triad') {
      romanInversionOptions = [
        roman + inversionDisplay,
        roman + inversionDisplay + '63',
        roman + inversionDisplay + '64'
      ]
    } else if (chordType === 'seventh') {
      romanInversionOptions = [
        roman + inversionDisplay,
        roman + inversionDisplay + '65',
        roman + inversionDisplay + '43',
        roman + inversionDisplay + '42'
      ]
    }
    return {
      "type": "Inversions",
      "questionText": "What's the inversion?",
      "answers": [roman + inversionDisplay + inversion],
      "choices": romanInversionOptions
    }
  }
}

export function romanQuality(chordStructure) {
  switch (chordStructure) {
    case ChordStructure.MAJOR:
      return ''
    case ChordStructure.MINOR:
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
    case ChordStructure.MAJOR:
      return ''
    case ChordStructure.MINOR:
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
