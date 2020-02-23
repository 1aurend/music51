import { ChordType } from './ChordType'

// Each of the possible types of questions we may ask. This enumeration
// may be extended over time, and care must be taken to support new
// questions down the line.
export const QuestionType = {
  LETTER_NAMES: "Letter Names",
  ROOT: "Root",
  DEGREES: "Degrees",
  ROLE: "Role",
  NUMERALS: "Numerals",
  QUALITY: "Quality",
  INVERSION: "Inversion",
  WHAT_FOLLOWS: "What Follows"
}

/**
 * questionTypes - Get the types of questions asked for a given `ChordType`.
 *
 * @param  ChordType chordType
 * @return Array of QuestionType  All of the `QuestionType` values for a given
 *                                `chordType`.
 */
function questionTypes(chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      // fallthrough
    case ChordType.SEVENTH:
      return [
        QuestionType.LETTER_NAMES,
        QuestionType.ROOT,
        QuestionType.DEGREES,
        QuestionType.NUMERALS,
        QuestionType.INVERSION,
      ]
    case ChordType.CHROMATIC_VARIATION:
      return [
        QuestionType.LETTER_NAMES,
        QuestionType.ROOT,
        QuestionType.DEGREES,
        QuestionType.ROLE,
        QuestionType.QUALITY,
        QuestionType.WHAT_FOLLOWS,
      ]
    case ChordType.MODE_MIXTURE:
      return [
        QuestionType.LETTER_NAMES,
        QuestionType.ROOT,
        QuestionType.DEGREES,
        QuestionType.ROLE,
        QuestionType.QUALITY,
        QuestionType.INVERSION,
      ]
    case ChordType.APPLIED_CHORD:
      return [
        QuestionType.LETTER_NAMES,
        QuestionType.ROOT,
        QuestionType.DEGREES,
        QuestionType.ROLE,
        QuestionType.QUALITY,
        QuestionType.INVERSION,
        QuestionType.WHAT_FOLLOWS,
      ]
  }
}
