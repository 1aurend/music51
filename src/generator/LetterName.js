export const LetterName = {
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  A: 'A',
  B: 'B',
  C: 'C',
}

/**
 * letterNamePosition - description
 *
 * @param  {type} letter letter names CDEFGAB
 * @return {type}        int corresponding to position away from C on a staff
 */
export function letterNamePosition(letter) {
  switch (letter) {
    case LetterName.C:
      return 0
    case LetterName.D:
      return 1
    case LetterName.E:
      return 2
    case LetterName.F:
      return 3
    case LetterName.G:
      return 4
    case LetterName.A:
      return 5
    case LetterName.B:
      return 6
    default:
      throw 'invalid letter name'
  }
}
