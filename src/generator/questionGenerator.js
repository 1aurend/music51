// FIXME: Decouple questions from `chord`
//        Some dependencies to detangle:
//          - `rootLetter`
//          - `rootAccidental`
//          - `key`
//          - `degree`
//          - `roman`
//          - `romanQuality`
//          - `inversion`
//          - `inversionQuality`
//          - `romanInversionOptions`
chord.questions = [
  {
    "type": "Names",
    "questionText": "Name the letter positions from lowest to highest.",
    "answers": [], // will populate in the loop
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
  },
  {
    "type": "Roots",
    "questionText": "What's the root note?",
    "answers": [rootLetter+rootAccidental],
    "choices": [] // will populate in the loop
  },
  {
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
  },
  // {
  //   "type": "Quality",
  //   "questionText": "What's the chord's quality?",
  //   "answers": [rootLetter + rootAccidental + newStructure],
  //   "choices": qualityOptions
  // },
  {
    "type": "Numerals",
    "questionText": "Which roman numeral describes this chord’s degree and quality?",
    "answers": [roman + romanQuality],
    "choices": romanOptions
  },
  {
    "type": "Inversions",
    "questionText": "What's the inversion?",
    "answers": [roman + inversionQuality + inversion],
    "choices": romanInversionOptions
  }
]


let romanInversionOptions

// [roman + inversionQuality + " " + inversion]

if(chordType === 'triad'){
  romanInversionOptions = [
    roman + inversionQuality,
    roman + inversionQuality + '63',
    roman + inversionQuality + '64'
  ]
}
if(chordType === 'seventh'){
  romanInversionOptions = [
    roman + inversionQuality,
    roman + inversionQuality + '65',
    roman + inversionQuality + '43',
    roman + inversionQuality + '42'
  ]
}
