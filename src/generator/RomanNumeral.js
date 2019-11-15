export const RomanNumeral = {
  I: 'I',
  II: 'II',
  III: 'III',
  IV: 'IV',
  V: 'V',
  VI: 'VI',
  VII: 'VII',
  i: 'i',
  ii: 'ii',
  iii: 'iii',
  iv: 'vi',
  v: 'v',
  vi: 'vi',
  vii: 'vii'
}

export function degreeAndQualityToRomanNumeral(degree, isCapital) {
  if (isCapital) {
    return Object.keys(RomanNumeral)[degree - 1]
  } else {
    return Object.keys(RomanNumeral)[degree - 1 + 7]
  }
}
