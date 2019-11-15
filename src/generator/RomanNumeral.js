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
  console.log("degree and quality to roman numeral incoming degree: " + degree + " is capital: " + isCapital)
  if (isCapital) {
    console.log("result: " + Object.keys(RomanNumeral)[degree - 1])
    return Object.keys(RomanNumeral)[degree - 1]
  } else {
    console.log("result: " + Object.keys(RomanNumeral)[degree - 1 + 7])
    return Object.keys(RomanNumeral)[degree - 1 + 7]
  }
}
