import { classes } from './chordConsts'
import addKeystrokes from './keystrokes'
import chalk from 'chalk'
import { LetterName, letterNamePosition } from './LetterName'
import { Clef } from './Clef'
import { Accidental } from './Accidental'
import { IndependentPitch, IndependentPitchSubset } from './IP'
import { Shapes } from './Shapes'
import { Mode, ModeSubset, degree } from './Mode'
import { ChordType } from './ChordType'
import { ChordTypesOption } from './ChordTypesOption'
import { ChordStructure, chordStructures } from './ChordStructure'
import { RomanNumeral, degreeAndQualityToRomanNumeral } from './RomanNumeral'

// TODO: (David) make sure this matches with the range set in randomChoice(clefs)
// this assumes a structure will only exceed ONE of those limits, not both. also has an "or" statement for upper limit octaves, but not lower (because chords are inverted/modified upward)

// NOTE:  There is quite a bit of potential for accidential mutation here
//        - `chord` should not be touched inside here
//        - `adjust` could be _adjusted_ by many things and it feels quite brittle
//

/**
 * range - returns range of acceptable letter name + octave pairs for a given clef
 *
 * @param  {type} clef the clef for which to return acceptable letter name + octave pairs for a given clef
 * @return {type}      object which contains lower and upper bounds
 */
function allowableRange(clef) {
  switch (clef) {
    case 'treble':
      return { upper: 15, /*F6*/ lower: -5, /*G3*/ }
    case 'bass':
      return { upper: 13, /*F4*/ lower: -5, /*B1*/ }
    default:
      throw 'invalid clef'
  }
}

/*
* @return {type} The position in the staff of middle c in the context of a given `clef`.
*/
export function middleCPosition(clef) {
  switch (clef) {
    case Clef.TREBLE:
      return -2
    case Clef.BASS:
      return 10
    default:
      throw 'unsupported clef'
  }
}

/**
 * staffPosition - returns the staff position of a note with a given letter name and octave respective to a clef. A staff position is either a line or a space indexed by distance from bottom line, 0, of a staff. For example, C4 (middle C) in treble clef has a staff position of -2.
 *
 * @param  {type} letter Letter name of a note
 * @param  {type} octave The octave of a note
 * @param  {type} clef   The context in which the note will be represented
 * @return {type}        An integer value representing the staff position of the given note, letter name and octave, respective to a clef
 */
export function staffPosition(letter, octave, clef) {
  const octaveDisplacement = octave - 4
  const distanceFromC = letterNamePosition(letter)
  return middleCPosition(clef)+(7*octaveDisplacement)+distanceFromC
}

/**
 * requiredOctaveDisplacement - return the amount of octaves to transpose the chord which is represented graphically at the given `staffPositions` in the allowable `range` of staff positions.
 *
 * @param  {type} staffPositions
 * @param  {type} range
 * @return {type} The amount of octaves to transpose the chord which is represented graphically at the given `staffPositions` in the allowable `range` of staff positions.
 * @todo This assumes that the octave does span a width greater than that of the given `range`. In this case, we need to decide what to do.
 */
export function requiredOctaveDisplacement(staffPositions, range) {
  const maxPosition = Math.max(...staffPositions)
  const minPosition = Math.min(...staffPositions)
  if ( maxPosition > range.upper ) {
    return Math.floor((range.upper-maxPosition)/7)
  } else if ( minPosition < range.lower ) {
    return Math.floor((range.lower-minPosition)/7)+1
  } else {
    return 0
  }
}

/**
 * @param {type} chord The chord to adjust so that it stays within the desired bounds.
*/
// FIXME: Refactor function to take in a `chord` and return an int.
//        This way, we aren't mutating the `chord`. It would be best if this
//        returned a _new_ chord, but in case you are _relying_ on mutation
//        from elsewhere, this may break things.
export function staffAdjust(chord) {

  // FIXME: We are using `let` instead of `const` here to highlight the fact that we are try to tear ourselves away from the monolithic `chord` object.
  let clef = chord.clef
  const range = allowableRange(clef)
  const staffPositions = chord.notes.map(note => {
    return staffPosition(note.letter, note.octave, clef)
  })
  const octaveTransposition = requiredOctaveDisplacement(staffPositions, range)
  const notes = chord.notes
  chord.notes = octaveTranspose(chord.notes, octaveTransposition)
  return chord
}

/**
 * octaveTranspose - return a brand new array of notes, each transposed by the given amount of `octaves`.
 *
 * @param  {type} notes   Note values to be transposed
 * @param  {type} octaves The amount of octaves by which to transpose notes
 * @return {type}         a brand new array of notes, each transposed by the given amount of `octaves`
 */
function octaveTranspose(notes, octaves) {
  return notes.map(note => {
    return { letter: note.letter, octave: note.octave + octaves }
  })
}

// This function takes converts a pair of Boolean values into a tri-state enum `ChordTypesOption` so that we invalidate the case where both triads and seventh chords are false.
function chordTypesOption(chordTypes) {
  if (chordTypes.triads && chordTypes.sevenths) {
    return ChordTypesOption.BOTH
  } else if (chordTypes.triads && !chordTypes.sevenths) {
    return ChordTypesOption.TRIADS
  } else if (!chordTypes.triads && chordTypes.sevenths) {
    return ChordTypesOption.SEVENTHS
  } else {
    throw "Invalid chord types selection"
  }
}

// return Type of the chord we are constructing
function chooseChordType(chordTypesOption) {
  switch (chordTypesOption) {
    case ChordTypesOption.TRIADS:
      return ChordType.TRIAD
    case ChordTypesOption.SEVENTHS:
      return ChordType.SEVENTH
    case ChordTypesOption.BOTH:
      return [ChordType.TRIAD, ChordType.SEVENTH].randomElement()
    default:
      throw 'Impossible ChordTypesOption'
  }
}

const RootOption = {
  ANY: "any",
  COMMON: "common"
}

function chooseRandomAccidental(allowedAccidentals) {
  return allowedAccidentals.randomElement()
}

// Constrains accidental only for root pitch
function constrainAccidental(syllable, structure, initialChoice) {
  const containsTripleFlat = (
    initialChoice === Accidental.FLAT &&
    structure === ChordStructure.DIMINISHED_SEVENTH &&
    (syllable === IndependentPitch.DO || IndependentPitch.FA)
  )
  const containsTripleSharp = (
    initialChoice === Accidental.SHARP &&
    structure === ChordStructure.AUGMENTED &&
    syllable === IndependentPitch.TI
  )
  if (containsTripleFlat || containsTripleSharp) {
    return Accidental.NATURAL
  }
  return initialChoice
}

// Make a random choice of root accidentals while filtering out egregious edge cases (e.g., 𝄫♭, and `𝄪♯`)
function chooseRootAccidental(syllable, structure, allowedAccidentals) {
  return constrainAccidental(
    syllable,
    structure,
    chooseRandomAccidental(allowedAccidentals))
}

// => {
//  syllable: Syllable,
//  accidental: Accidental,
//  keySignature: KeySignature
// }
function chooseRootSyllableAccidentalAndKeySignature(
  rootOption,
  structure,
  rootSyllable,
  keySignatures
) {
  // TODO: Inject keySignatures
  // TODO: Inject subsets
  // TODO: Inject rootAccidentals
  switch (rootOption) {
    case RootOption.ANY:
      return {
        "syllable": subsets.B.randomElement(),
        "accidental": chooseRootAccidental(rootSyllable, structure),
        "keySignature": Object.keys(keySignatures).randomElement()
      }
    case RootOption.COMMON:
      // TODO
    default:
      //
  }
}

// Consider making `Chord` a class. Add a class method on `Chord`: `random()`, which produces one
// random chord!
//
// => (Note,Int)
export function makeChord(chordType) {
  // Set of all of the possible chord structures for the given chord type
  // Consider moving any vs common root note option to a higher level
  const possibleChordStructures = chordStructures(chordType)
  // Choose one of the possible chord structures for the given chord type
  // Consider making this a function that generates an abstract chord rather than chooses one of the representations currently in ChordStructure
  const chordStructure = possibleChordStructures.randomElement()
  // Choose random roman numeral context
  const romanNumeralContext = randomRomanNumeralContext(chordStructure)
  // TODO: Concretize abstract chord (roman numeral context) into spelled key context
  const keySignature = Object.keys(Shapes).slice(3, 12).randomElement()
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext.modeNote)

  // FIXME: Get rid of the following three statements
  // Choose random syllable from common independent pitch subsets
  const rootSyllable = Object.keys(IndependentPitchSubset.BOTTOM).randomElement()
  // Choose a random letter name for the root note
  const rootLetter = Object.keys(LetterName).randomElement()
  // Choose a random accidental for the root note
  const rootAccidental = Object.keys(Accidental).randomElement()

  console.log(romanNumeralContext)
  // TODO: put this in the proper place
  const inversion = inversions(chordType).randomElement()

  return {
    rootSyllable: rootSyllable,
    rootAccidental: rootAccidental,
    structure: chordStructure,
    inversion: inversion
  }
}

export function concretizeRoot(keySignature, modeNote) {
  // TODO: ask David-- how do we know accidental at the shapes level of abstraction?
  for(var i=0; i<Shapes[keySignature].notes.length; i++){
    if(Shapes[keySignature].notes[i].mode === modeNote){
      const rootAccidental = Shapes[keySignature].notes[i].accidental
      console.log(`rootAccidental: ${rootAccidental}`);
      const rootSyllable = Shapes[keySignature].notes[i].refIP
      console.log(`rootSyllable: ${rootSyllable}`);
      const offset = (Object.keys(Accidental).indexOf(rootAccidental))-(Object.keys(Accidental).indexOf(Accidental.NATURAL))
      const rootLetter = Object.keys(LetterName)[Object.keys(IndependentPitchSubset.BOTTOM).indexOf(rootSyllable)]
      console.log(`rootLetter: ${rootLetter}`);
      console.log(`offset: ${offset}`);
      const rootSyllableIndex = Object.values(IndependentPitch).indexOf(rootSyllable)
      console.log(`rootSyllableIndex ${rootSyllableIndex}`);
      const rootIPIndex = (rootSyllableIndex+offset)%12
      console.log(`rootIPIndex ${rootIPIndex}`);
      console.log(Object.values(IndependentPitch));
      const rootIP = Object.values(IndependentPitch)[rootIPIndex]
      return {
        independentPitch: rootIP,
        accidental: rootAccidental,
        letter: rootLetter
      }
    }
  }
  throw new Error('modeNote ' + modeNote + ' not found in keySignature ' + keySignature)
}

// translate the syllable "position" to a letter
// let rootLetter = letters[subsets.B.indexOf(rootSyllable)] // order of reference subset IPs and order of letters need to match
  // console.log(rootLetter+rootAccidental+" "+newStructure);
  // console.log("root letter is " + rootLetter)

// find the equivalent IP based on the accidental's offset from the "natural" root syllable
 // the distance from natural!
  // console.log(offset + " from natural")
// let rootIp = IndependentPitch[(ip.indexOf(rootSyllable)+offset)%12]


  // console.log("IP: " + rootIp)


export function romanNumeral(chordStructure, degree) {
  switch (chordStructure) {
    case ChordStructure.MAJOR:
    case ChordStructure.AUGMENTED:
    case ChordStructure.DOMINANT_SEVENTH:
    case ChordStructure.MAJOR_SEVENTH:
      return degreeAndQualityToRomanNumeral(degree, true)
    default:
      return degreeAndQualityToRomanNumeral(degree, false)
  }
}

const allowedModesByChordStructure = {
  [ChordStructure.MAJOR]: [Mode.MAJOR, Mode.MINOR],
  [ChordStructure.MINOR]: [Mode.MAJOR, Mode.MINOR],
  [ChordStructure.DIMINISHED]: [Mode.MAJOR],
  [ChordStructure.AUGMENTED]: [Mode.MAJOR],
  [ChordStructure.DOMINANT_SEVENTH]: [Mode.MAJOR, Mode.MINOR],
  [ChordStructure.MAJOR_SEVENTH]: [Mode.MAJOR],
  [ChordStructure.MINOR_SEVENTH]: [Mode.MAJOR, Mode.MINOR],
  [ChordStructure.HALF_DIMINISHED_SEVENTH]: [Mode.MAJOR, Mode.MINOR],
  [ChordStructure.FULLY_DIMINISHED_SEVENTH]: [Mode.MAJOR, Mode.MINOR]
}



export function randomRomanNumeralContext(chordStructure) {
  // FIXME: Consider adding configurability of allowable range of "shapes" and complexity
  const mode = allowedModesByChordStructure[chordStructure].randomElement()
  switch (chordStructure) {
    case ChordStructure.MAJOR:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = [Mode.MAJOR, Mode.LYDIAN, Mode.DOMINANT].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = [Mode.MAJOR, Mode.PHRYGIAN, Mode.LYDIAN, Mode.DOMINANT].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.MINOR:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = [Mode.DORIAN, Mode.PHRYIGIAN, Mode.MINOR].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = [Mode.MINOR, Mode.DORIAN, Mode.LOCRIAN].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: scaleDegree,
            modeNote: modeNote,
            degree: degree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.DIMINISHED:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = Mode.LOCRIAN
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = [Mode.LOCRIAN, Mode.DORIAN].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.AUGMENTED: {
      const modeNote = Mode.MAJOR
      const scaleDegree = degree(mode, modeNote)
      return {
        mode: mode,
        modeNote: modeNote,
        degree: scaleDegree,
        romanNumeral: romanNumeral(chordStructure, scaleDegree)
      }
    }
    case ChordStructure.DOMINANT_SEVENTH:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = Mode.DOMINANT
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = Mode.PHRYGIAN
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.MAJOR_SEVENTH: {
      const modeNote = [Mode.MAJOR,Mode.LYDIAN].randomElement()
      const scaleDegree = degree(mode, modeNote)
      return {
        mode: mode,
        modeNote: modeNote,
        degree: scaleDegree,
        romanNumeral: romanNumeral(chordStructure, scaleDegree)
      }
    }
    case ChordStructure.MINOR_SEVENTH:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = [Mode.DORIAN, Mode.PHRYGIAN, Mode.MINOR].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = [Mode.MINOR, Mode.DORIAN].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.HALF_DIMINISHED_SEVENTH:
      switch (mode) {
        case Mode.MAJOR: {
          const modeNote = Mode.LOCRIAN
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
        case Mode.MINOR: {
          const modeNote = [Mode.LOCRIAN, Mode.DORIAN].randomElement()
          const scaleDegree = degree(mode, modeNote)
          return {
            mode: mode,
            modeNote: modeNote,
            degree: scaleDegree,
            romanNumeral: romanNumeral(chordStructure, scaleDegree)
          }
        }
      }
    case ChordStructure.FULLY_DIMINISHED_SEVENTH: {
      const modeNote = Mode.DORIAN
      const scaleDegree = degree(mode, modeNote)
      return {
        mode: mode,
        modeNote: modeNote,
        degree: scaleDegree,
        romanNumeral: romanNumeral(chordStructure, scaleDegree)
      }
    }
    default:
      throw new Error("Invalid chord structure")
  }
}

// and a big function to generate a random, correctly spelled chord structure within clef/staff limits:
function randomChord(options) {

  // Choose whether we need to generate a triad or seventh chord
  const _chordType = chooseChordType(chordTypesOption(options.chordTypes))
  const _chord = makeChord(_chordType)

  let template
  let inversions
  let chordType

  // choose a random chord type
  let newStructure = Object.keys(template).randomElement()
  let newClass = template[newStructure].class
  let newRoot = template[newStructure].anchor

  let rootSyllable
  let rootAccidental

  let keySignature

  // apply option for any root notes
  if(options.roots.any === true){
    keySignature = Object.keys(keySignatures).randomElement()
     // B is set implicitly as the "reference" subset
    rootSyllable = subsets.B.randomElement()
    rootAccidental = rootAccidentals.randomElement()

    // adjust 'o7' chords where the o7th would be a triple flat
    if ((newStructure === 'o7') && (rootSyllable === 'D' || rootSyllable === 'F') && (rootAccidental === '♭')){
      rootAccidental = '♮'
    }
    // adjust '+' chords where the +5th would be a triple sharp
    if ((newStructure === '+') && (rootSyllable === 'T') && (rootAccidental === '♯')){
      rootAccidental = '♮'
    }
  }

  // FIXME: Refactor into own function `romanNumeralOptions(chordType)`
  //        which returns an array of strings
  let romanOptions

  if(chordType === 'triad'){
    romanOptions = [
      roman.toUpperCase(),
      roman.toLowerCase(),
      roman.toLowerCase() + 'o',
      roman.toUpperCase() + '+'
    ]
  }
  if(chordType === 'seventh'){
    romanOptions = [
    roman.toUpperCase() + '7',
    roman.toLowerCase() + '7',
    roman.toLowerCase() + 'ø7',
    roman.toLowerCase() + 'o7'
  ]
  }

  // FIXME: Refactor into own function `romanNumeralInversionOptions(chordType)`
  //        which returns an array of strings
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


  // choose the octave of the starting (root) note.
  // TODO: make sure this range matches with the range set in staffAdjust()
  let clef = clefs.randomElement()
  // console.log(clef + " clef")
  let clefOctave
  if(clef === "bass"){
    clefOctave = Math.floor(Math.random() * 4) + 1 // range of 4 octaves starting from octave 1
  }
  if(clef === "treble"){
    clefOctave = Math.floor(Math.random() * 4) + 3 // range of 4 octaves starting from octave 3
  }
    // console.log('clefOctave: '+clefOctave)

  // choose an inversion
  let inversion = inversions.randomElement()

  let vexSig = keySignatures[keySignature].vexSig;

  // build and begin populating the chord object
  let chord = {};
  // chord.rootLetter = rootLetter
  // chord.rootAccidental = rootAccidental
  // chord.type = newStructure
  // chord.inversion = inversion
  chord.clef = clef
  chord.keySignature = vexSig // from Flow.keySignature.keySpecs (vexflow /tables.js)
  chord.notes = [];

  // only show natural in rootAccidental if it's an alteration from the key sig
  if ((rootAccidental === '♮') && (keySignatures[keySignature].notes[keySignatures[keySignature].notes.findIndex(function(syllable){return syllable.refIP === rootSyllable})].accidental != '♮')){
    rootAccidental = '♮';
  }
  else if (rootAccidental === '♮') {
    rootAccidental = "";
  }

  // aggregate options for chord quality question
  let qualityOptions = []
  Object.keys(template).map(type => {qualityOptions.push(rootLetter + rootAccidental + type)})

  // aggregate options for inversions question
  let inversionOptions = []
  inversions.map(type => {inversionOptions.push(rootLetter + rootAccidental + newStructure + " " + type)})


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

  // FIXME: This should be its own function
  // build the structure with correct spellings
  for(var i=0; i<template[newStructure].structure.length; i++){

    // translate the template ip to a relative note in the class
    let newNote = (ip.indexOf(template[newStructure].structure[i].ip) - ip.indexOf(newRoot) + 12)%12
      // console.log(classes[newClass][newNote])

    // get the syllable "position" from the reference subset based on tensionMod7 value in the class
    let noteSyllable = subsets.B[((subsets.B.indexOf(rootSyllable) + classes[newClass][newNote].tensionMod7 -1)%7)]
      // console.log(noteSyllable)

    // find the equivalent IP based on the rootIp and tensionMod12 value in the class
    let noteIp = ip[(ip.indexOf(rootIp) + classes[newClass][newNote].tensionMod12 -1)%12]
      // console.log("IP: " + noteIp)

    // find the accidental from the diff between IP and "natural" syllable (natural is accidentals[2])
    let accidentalVal = (ip.indexOf(noteIp))-(ip.indexOf(noteSyllable))
      // adjusts for IPs on opposite ends of the array, like "D" from "R"
      // but something about this feels hacky... is there a better way?
      if(accidentalVal > ip.length/2)accidentalVal -= ip.length
      if(-accidentalVal > ip.length/2)accidentalVal += ip.length
    let accidental = accidentals[(2 + accidentalVal)%5]
      // console.log(accidental)

    // translate the syllable "position" to a letter
    let noteLetter = letters[subsets.B.indexOf(noteSyllable)]
      // console.log(noteLetter+accidental)

    // octave adjustments:
    // TODO: will this also work for template structures bigger than an octave?
    let octaveIndex = letterNamePosition(noteLetter)
    let octave = clefOctave
    if(chord.notes.length > 0 && octaveIndex < letterNamePosition(chord.notes[chord.notes.length-1].letter)){
      octave += 1;
      clefOctave +=1 // sets the default octave up for the next note
    }

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

    chord.notes.push(
      {
        letter: noteLetter,
        accidental: accidental,
        octave: octave
      }
    )
  }

  // FIXME: Let's use `shuffled` here rather than mutating our source of truth.
  // shuffles the root note choices so they're not always in root position haha
  shuffle(chord.questions[1].choices)
  const inverted = handleInversion(chord, inversion)
  const positionedChord = staffAdjust(inverted)
  return positionedChord
}

/// TODO: Decouple inversion from amount of notes in chord
function handleInversion(chord, inversion) {

  // inverts the chord, reorders chord.notes, and adjusts the ordered answer for inversion
  if ((inversion === "63") || (inversion === "65")) {
    chord.notes = invert(chord.notes, 1)
    chord.questions[0].answers.rotate(1)
  } else if ((inversion === "64") || (inversion === "43")) {
    chord.notes = invert(chord.notes, 2)
    chord.questions[0].answers.rotate(2)
  } else if (inversion === "42") {
    chord.notes = invert(chord.notes, 3)
    chord.questions[0].answers.rotate(3)
  }
  return chord
}

/**
 * invert - return a brand new array of notes inverted the amount of times indicated by `inversion`. For example, `0` is equal to "root inversion", while `1` is equal to "first inversion".
 *
 * @param  {type} chord   Note values to be inverted
 * @param  {type} inversion The amount of inversions to perform
 * @return {type}         An array of notes inverted the amount of times indicated by `inversion`
 */
export function invert(chord, inversion) {
  let notes = [...chord]
  for (let i = 0; i < inversion; i++) {
    const head = notes.shift()
    head.octave += 1
    notes.push(head)
  }
  return notes
}

function inversions(chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      return ["","63","64"]
    case ChordType.SEVENTH:
      return ["","65","43","42"]
  }
}

/**
 * export default - this is the interface between the generator and chord crusher or any other app; this function is named over in the react app that imports it
 *
 * @param  {type} numQs   int; comes from react app, number of questions student has asked for
 * @param  {type} options comes from react app; student selections
 *                        {chordTypes: {triads:true, sevenths:true},
                          roots: {common:true, any:false}}
 * @return {type}         returns final questions object
 */
export default function(numQs, options){
  // console.log(JSON.stringify(options));
  let chords = []
  for (var i = 0; i < numQs; i++) {
    chords.push(randomChord(options, templateTriads, templateSevenths, subsets, keySignatures, rootAccidentals, accidentals, ip, triadInversions, seventhInversions))
  }
  console.log(chalk.cyan(JSON.stringify(chords, null, 4)));
  return addKeystrokes(chords)
}

// Utility

Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
}

Set.prototype.randomElement = function () {
  const array = Array.from(this.values())
  return array.randomElement()
}

// the super cool Fisher-Yates shuffle
// FIXME: Move to `utils.js` file
// FIXME: Consider implementing a `shuffled` which returns a new array (and thus does not mutate the original)
function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int

        // convert count to value in range [0, len)
        count = ((count % len) + len) % len;

        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();
