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
questions = [
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


// aggregate options for chord quality question
let qualityOptions = []
Object.keys(template).map(type => {qualityOptions.push(rootLetter + rootAccidental + type)})

// aggregate options for inversions question
let inversionOptions = []
inversions.map(type => {inversionOptions.push(rootLetter + rootAccidental + newStructure + " " + type)})

// push notes into questions before adjusting accidentals for key sig
chord.questions[0].answers.push(noteLetter);


// FIXME: This should be its own function
// only show natural in question choices if it's an alteration from the key sig
if(accidental != '♮'){
  chord.questions[1].choices.push(noteLetter+accidental);
}
else if ((accidental === '♮') && (keySignatures[keySignature].notes[keySignatures[keySignature].notes.findIndex(function(syllable){return syllable.refIP === noteSyllable})].accidental != '♮')){
  chord.questions[1].choices.push(noteLetter+'♮');
}
else {
  chord.questions[1].choices.push(noteLetter);
}

// adjust accidentals for key sig (if an accidental is in the key sig, don't add it to the note)
if(accidental === keySignatures[keySignature].notes[keySignatures[keySignature].notes.findIndex(function(syllable){return syllable.refIP === noteSyllable})].accidental){
  accidental = "";
}
