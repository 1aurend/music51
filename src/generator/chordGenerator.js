import { classes } from './chordConsts'
import addKeystrokes from './keystrokes'
import './utility.js'
import { shuffle } from './utility'
import { LetterName, letterNamePosition } from './LetterName'
import { Clef } from './Clef'
import { Accidental } from './Accidental'
import { IndependentPitch, IndependentPitchSubset } from './IP'
import { Shapes } from './Shapes'
import { Mode, ModeSubset, degree, noteIdentities } from './Mode'
import { ChordType } from './ChordType'
import { ChordTypesOption } from './ChordTypesOption'
import { ChordStructure, chordStructures } from './ChordStructure'
import { RomanNumeral, degreeAndQualityToRomanNumeral } from './RomanNumeral'

/**
 * export default - This is the interface between the generator and chord crusher or any other app
 *
 * @param  Int numQs      The number of questions a student has asked for
 * @param  Object options Configuration from student, in the form:
 *                          {
 *                            chordTypes: { triads: true, sevenths: true },
  *                           roots: { common: true, any: false }
 *                          }
 * @return Array          An array of Question objects, in the form:
 *                          [
 *                            {
 *                               "clef": Clef,
 *                               "keySignature": KeySignature,
 *                               "notes": [ { "letter", "accidental", "octave" } ],
 *                               "questions": [
 *                                  { 
 *                                    "type": ("Names" | "Degrees", etc. ), 
 *                                    "questionText": "...", 
 *                                    "answers": [ "iv7", ... ] ,
 *                                    "ordered": Boolean, 
 *                                    "choices": [ { "choice": "IV7", "key": "7" } ] 
 *                                  }
 *                               ]
 *                            }
 *                          ]
 * @todo                  Assess the spec of the questions object which is put out by this function
 */
export default function(numQs, options) {
  // let chords = []
  // for (var i = 0; i < numQs; i++) {
  //   // Create the chords for each round.
  //   chords.push(randomChord(options))
  //   // For each chord, generate a sequence of questions appropriate for the given chord
  //   // TODO: Generate questions
  // }
  // console.log(JSON.stringify(chords))
  // return addKeystrokes(chords)

  return [
   {
      "clef": "treble",
      "keySignature": "F",
      "notes": [
         {
            "letter": "G",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "B",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "D",
            "accidental": "",
            "octave": 5
         },
         {
            "letter": "F",
            "accidental": "",
            "octave": 5
         }
      ],
      "questions": [
         {
            "type": "Names",
            "questionText": "Name the letter positions from lowest to highest.",
            "answers": [
               "G",
               "B",
               "D",
               "F"
            ],
            "ordered": true,
            "choices": [
               {
                  "choice": "A",
                  "key": "a"
               },
               {
                  "choice": "B",
                  "key": "b"
               },
               {
                  "choice": "C",
                  "key": "c"
               },
               {
                  "choice": "D",
                  "key": "d"
               },
               {
                  "choice": "E",
                  "key": "e"
               },
               {
                  "choice": "F",
                  "key": "f"
               },
               {
                  "choice": "G",
                  "key": "g"
               }
            ]
         },
         {
            "type": "Roots",
            "questionText": "What's the root note?",
            "answers": [
               "G"
            ],
            "choices": [
               {
                  "choice": "D",
                  "key": "d"
               },
               {
                  "choice": "B♭",
                  "key": "b"
               },
               {
                  "choice": "F",
                  "key": "f"
               },
               {
                  "choice": "G",
                  "key": "g"
               }
            ]
         },
         {
            "type": "Degrees",
            "questionText": "In a minor key, what degree is this chord built on?",
            "answers": [
               "4^"
            ],
            "choices": [
               {
                  "choice": "1^",
                  "key": "1"
               },
               {
                  "choice": "2^",
                  "key": "2"
               },
               {
                  "choice": "3^",
                  "key": "3"
               },
               {
                  "choice": "4^",
                  "key": "4"
               },
               {
                  "choice": "5^",
                  "key": "5"
               },
               {
                  "choice": "6^",
                  "key": "6"
               },
               {
                  "choice": "7^",
                  "key": "7"
               }
            ]
         },
         {
            "type": "Numerals",
            "questionText": "Which roman numeral describes this chord’s degree and quality?",
            "answers": [
               "iv7"
            ],
            "choices": [
               {
                  "choice": "IV7",
                  "key": "7"
               },
               {
                  "choice": "iv7",
                  "key": "m"
               },
               {
                  "choice": "ivø7",
                  "key": "h"
               },
               {
                  "choice": "ivo7",
                  "key": "d"
               }
            ]
         },
         {
            "type": "Inversions",
            "questionText": "What's the inversion?",
            "answers": [
               "iv"
            ],
            "choices": [
               {
                  "choice": "iv",
                  "key": "r"
               },
               {
                  "choice": "iv65",
                  "key": "5"
               },
               {
                  "choice": "iv43",
                  "key": "3"
               },
               {
                  "choice": "iv42",
                  "key": "2"
               }
            ]
         }
      ]
   }
 ]
}

/**
 * randomChord - A big function to generate a random, correctly spelled chord structure within 
 *               clef/ staff limits
 * 
 * @param options The user settings for a given session, in the form:
 *                {
 *                  { 
 *                    chordTypes: { triads: true, sevenths: true },
                      roots: { common: true, any: false } 
 *                  }
 *                }
 * @return chord  A contextualized chord object in the form: 
 *                { 
 *                  clef, keySignature, chordType, inversion, notes
 *                }
 */
export function randomChord(options) {

  // FIXME: (James) We need to move chord shuffling closer to the user interface layer. 
  // FIXME: (James) Let's use `shuffled` here rather than mutating our source of truth.
  // Shuffles the root note choices so they're not always in root position haha
  // shuffle(chord.questions[1].choices)

  // Choose a `ChordType` from the constraints provided by the user
  const chordType = chooseChordType(chordTypesOption(options.chordTypes))

  // Choose a `ChordStructure` belonging to the chosen `ChordType` family
  const chordStructure = chooseChordStructure(chordType)

  // Choose an inversion from those afforded by the chosen `ChordStructure`
  const inversion = chooseInversion(chordType)

  // Choose a `KeySignature`
  const keySignature = chooseKeySignature()

  // Construct non—octave-positioned description of a chord, in the form:
  // {
  //    root: { independentPitch, accidental, letter, syllable },
  //    structure: ChordStructure,
  //    inversion: Int
  // }
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature)

  // Construct the non-octave positioned notes for chord described above
  // TODO: Come up with a better name
  const partiallyConcretizedChordNotes = partiallyConcretizeChord(chordDescription, keySignature)

  console.log("I have partially concretized chord notes: " + JSON.stringify(partiallyConcretizedChordNotes))

  // TODO: (James) add `inversion` method on `Chord` type
  // const inverted = handleInversion(chordDescription, inversion)
  
  const clef = Clef.randomElement()

  // Positions
  const positionedChord = staffAdjust(partiallyConcretizedChordNotes, clef)

  return positionedChord
}

// Consider making `Chord` a class. Add a class method on `Chord`: `random()`, which produces one
// random chord!
//
// => (Note,Int)
export function makeChordDescription(chordStructure, inversion, keySignature) {
  // // Choose one of the possible chord structures for the given chord type
  // // Consider making this a function that generates an abstract chord rather than chooses one of the representations currently in ChordStructure
  // const chordStructure = chooseChordStructure(chordType)
  // Choose random roman numeral context
  const romanNumeralContext = randomRomanNumeralContext(chordStructure)
  // Concretize the root by situating the roman numeral context's `modeNote` in the given 
  // `keySignature`.
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext.modeNote)

  // TODO: Fix this return... no longer correct... (11/15)
  return {
    root: concretizedRoot,
    structure: chordStructure,
    inversion: inversion
  }
}

/**
 * partiallyConcretizeChord - Return the non-octave-positioned notes for the given `chord`.
 * @param chordDescription
 * @return An array of non-octave-positioned spelled pitches comprising a `chord`.
 */
export function partiallyConcretizeChord(chordDescription, keySignature) {

  // const { rootIP, rootAccidental, rootLetter, rootSyllable } = chordDescription.root
  const rootIP = chordDescription.root.independentPitch
  const rootAccidental = chordDescription.root.accidental
  const rootSyllable = chordDescription.root.syllable

  // The notes of a chord to be returned
  let notes = []

  // build the structure with correct spellings
  // FIXME: Assess schema (diving `structure.structure` is not elegant)
  for(var i=0; i<chordDescription.structure.structure.length; i++){

    // translate the template ip to a relative note in the class
    const translatedNoteIP = translateNoteIPIndex(chordDescription.structure[i], rootIP)

    console.log("translatedNoteIP: " + JSON.stringify(translatedNoteIP))

    const _noteSyllable = syllable(translatedNoteIP, chordDescription)
    console.log("_syllablePosition: " + JSON.stringify(_noteSyllable))

    // find the equivalent IP based on the rootIp and tensionMod12 value in the class
    let noteIP = componentIP(rootIP, translatedNoteIP, keySignature)

    // find the accidental from the diff between IP and "natural" syllable (natural is accidentals[2])
    let accidentalVal = (Object.values(IndependentPitch).indexOf(noteIP))-(Object.values(IndependentPitch).indexOf(noteSyllable))

    // FIXME: (James) Perhaps break this into a function of its own
    // FIXME: Add convenience getters to IndependentPitch to avoid the `Object.values` choreography
    // adjusts for IPs on opposite ends of the array, like "D" from "R"
    // but something about this feels hacky... is there a better way?
    if (accidentalVal > Object.values(IndependentPitch).length/2) {
      accidentalVal -= Object.values(IndependentPitch).length
    }
    if (-accidentalVal > Object.values(IndependentPitch).length/2) {
      accidentalVal += Object.values(IndependentPitch).length
    }

    // FIXME: (James) Add a convenience getter to Accidental to avoid the `Object.values` choreography
    let accidental = Object.values(Accidental)[(2 + accidentalVal)%5]

    // Translate the syllable "position" to a letter
    // FIXME: Add convenience getters to LetterName to avoid the `Object.values` choreography
    let noteLetter = Object.values(LetterName)[Object.values(ModeSubset.BOTTOM).indexOf(noteSyllable)]

    // FIXME: (James) This currently requires context not injected into this function.
    //        We should do this octave adjustment after the fact, once we are put in a clef'd universe.
    // TODO: Octave adjustments
    // TODO: will this also work for template structures bigger than an octave?
    // let octaveIndex = letterNamePosition(noteLetter)
    // let octave = chordOctave
    // if (chord.notes.length > 0 && octaveIndex < letterNamePosition(chord.notes[chord.notes.length-1].letter)) {
    //   octave += 1;
    //   chordOctave +=1 // sets the default octave up for the next note
    // }

    // FIXME: Use the code above with the correct context to set this variable correctly
    const octave = 4

    // Create the note with all of our nice new data
    const note = { letter: noteLetter, accidental: accidental, octave: octave }

    // Append our new note to the array to be returned
    notes.push(note)
  }

  return notes
}


function syllable(translatedNoteIPIndex, chordDescription) {
  // FIXME: Come up with a name that is neither `whiteNotes` or `.BOTTOM`
  const whiteNotes = Object.values(IndependentPitchSubset.BOTTOM)
  const rootSyllable = chordDescription.root.syllable
  const rootSyllableIndex = whiteNotes.indexOf(rootSyllable)
  const modeConstructor = chordDescription.structure.modeConstructor
  const modeNoteIdentities = noteIdentities(modeConstructor)
  const tensionMod7 = noteIdentities(modeConstructor)[translatedNoteIPIndex].tensionMod7
  const index = (rootSyllableIndex + tensionMod7 - 1) % 7
  return whiteNotes[index]
}

/**
 * @param rootIP            IndependentPitch  The IndependentPitch syllable of the root of a chord
 * @param translatedNoteIP  Int               The index of the translated note independent pitch
 * @param keySignature      KeySignature      The KeySignature context of the chord
 */
// find the equivalent IP based on the rootIp and tensionMod12 value in the class
function componentIP(rootIP, translatedNoteIP, keySignature) {
  const ips = Object.values(IndependentPitch)
  const rootIPIndex = ips.indexOf(rootIP)
  const shape = Shapes[keySignature]
  const noteOffsetInShape = shape[translatedNoteIP].tensionMod12 - 1
  return ips[(rootIPIndex + noteOffsetInShape) % 12]
}

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
* @param Clef clef The type of clef for which we are trying to get the middle c position.
* @return {type} The position in the staff of middle c in the context of a given `clef`.
* @todo Implement `middleCPosition` as an instance method over `Clef`.
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
 * @param Array of notes chord  notes   The notes to be adjusted, in the form:
                                          { letter, accidental }
 * @param Clef                  clef    The clef context in which we are positioning the given 
 *                                      `notes`.
 * @return An array of notes positioned properly within the context of the given `clef`.
*/
// FIXME: Establish when we know a note's octave. Do we generate it here, or later?
export function staffAdjust(notes, clef) {
  const initialOctave = chooseInitialOctave(clef)
  const range = allowableRange(clef)
  const staffPositions = notes.map(note => {
    return staffPosition(note.letter, note.octave, clef)
  })
  const octaveTransposition = requiredOctaveDisplacement(staffPositions, range)
  return octaveTranspose(notes, octaveTransposition)
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



const RootOption = {
  ANY: "any",
  COMMON: "common"
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

// TODO: Decide if we still need this function. Is this now covered by concretizeRoot? If so, we'll need to deal with chooseRootAccidental above to make sure we're still dealing with the egregious edge cases.
// => {
//  syllable: Syllable,
//  accidental: Accidental,
//  keySignature: KeySignature
// }
// function chooseRootSyllableAccidentalAndKeySignature(
//   rootOption,
//   structure,
//   rootSyllable,
//   keySignatures
// ) {
//   // TODO: Inject keySignatures
//   // TODO: Inject subsets
//   // TODO: Inject rootAccidentals
//   switch (rootOption) {
//     case RootOption.ANY:
//       return {
//         "syllable": subsets.B.randomElement(),
//         "accidental": chooseRootAccidental(rootSyllable, structure),
//         "keySignature": Object.keys(keySignatures).randomElement()
//       }
//     case RootOption.COMMON:
//       // TODO
//     default:
//       //
//   }
// }

/**
 * concretizeRoot - Returns a letter name, an independent pitch, and an accidental for a root note given a key signature and a mode note.
 *
 * @param  {type} keySignature A randomly chosen key signature represented as a shape
 * @param  {type} modeNote     The mode of the root note
 * @return {type}              An object consisting of the independent pitch, the accidental, and the letter name for the root note.
 * @todo                       This algorithm works in quadratic time, but could quite possibly work in constant time.
 */
export function concretizeRoot(keySignature, modeNote) {

  console.log("concretize root in key signature " + keySignature + " with mode note: " + modeNote)

  // TODO: ask David-- how do we know accidental at the shapes level of abstraction?
  // TODO: Configure the Shapes object so we don't have iterate through an array of notes each time
  // TODO: Use this function to generate every note not just roots? If so, rename to something like concretizeNote.
  const shape = Shapes[keySignature]
  for (var i = 0; i < shape.notes.length; i++) {
    if (Shapes[keySignature].notes[i].mode === modeNote) {
      const rootAccidental = shape.notes[i].accidental
      const rootSyllable = shape.notes[i].refIP

      // Get the offset from the root accidental from `NATURAL`
      const offset = Accidental.offsetFromNatural(rootAccidental)

      // FIXME: (James) Implement convenience getter over `LetterName`
      const rootLetter = Object.values(LetterName)[Object.values(IndependentPitchSubset.BOTTOM).indexOf(rootSyllable)]

      // FIXME: (James) Implement convenience getter over `IndependentPitch`
      const rootSyllableIndex = Object.values(IndependentPitch).indexOf(rootSyllable)
      const rootIPIndex = (rootSyllableIndex + offset) % 12
      const rootIP = Object.values(IndependentPitch)[rootIPIndex]

      return {
        independentPitch: rootIP,
        accidental: rootAccidental,
        letter: rootLetter,
        syllable: rootSyllable
      }
    }
  }
  throw new Error('modeNote ' + modeNote + ' not found in keySignature ' + keySignature)
}

/**
 * romanNumeral - Returns a roman numeral or romanette of the appropriate number given a chord structure and scale degree.
 *
 * @param  {type} chordStructure The type of chord for which to generate a numeral
 * @param  {type} degree         The scale degree
 * @return {type}                The roman numeral or romanette for the given configuration of chord type and scale degree.
 */
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

//These are KP's choices. See note in randomRomanNumeralContext re: configurability.
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

export function translateNoteIPIndex(componentIP, rootIP) {
  const untranslatedIndex = Object.values(IndependentPitch).indexOf(componentIP)
  // TODO: audit addition of 12 here
  const rootIndex = Object.values(IndependentPitch).indexOf(rootIP)
  return (untranslatedIndex-rootIndex).mod(12)
}

// TODO: Decouple inversion from amount of notes in chord
// TODO: Move into partiallyConcretizeChordNotes
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

/**
 * @param ChordType chordType The `ChordType` of a chord (either a `TRIAD` or `SEVENTH` for now) for which you would like
 *        an enumeration of inversions.
 * @return An array of strings representing the various inversions available for a `TRIAD` or `SEVENTH` chord.
 */
function inversions(chordType) {
  // TODO: Consider moving this functionality over be over `ChordType`.
  switch (chordType) {
    case ChordType.TRIAD:
      return ["","63","64"]
    case ChordType.SEVENTH:
      return ["","65","43","42"]
  }
}

/**
 * @param ChordType chordType The type of chord affording inversions from which to select
 * @return A random inversion from those afforded by the given `chordType`
 */
export function chooseInversion(chordType) {
  // TODO: Implement inversions as an instance method over `ChordType`
  return inversions(chordType).randomElement()
}

/**
 * @return  A random key signature within the realm of reason (omitting c+f flat, e+b sharp)
 * @todo    Add some configurability with an input of allowed key signatures, with some 
 *          sensible default
 */
export function chooseKeySignature() {
  return Object.keys(Shapes).slice(3, 12).randomElement()
}

/**
 * @return A random `Clef`.
 */
export function chooseClef() {
  return Clef.randomElement()
}

/**
 * @return A random `ChordStructure` for the given `chordType`.
 */
export function chooseChordStructure(chordType) {
  return chordStructures(chordType).randomElement()
}

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
export function chooseChordType(chordTypesOption) {
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

function chooseInitialOctave(clef) {
  switch (clef) {
    case Clef.BASS:
      // range of 4 octaves starting from octave 1
      return Math.floor(Math.random() * 4) + 1
    case Clef.TREBLE:
      // range of 4 octaves starting from octave 3
      return Math.floor(Math.random() * 4) + 3
    default:
      throw new Error('invalid clef')
  }
}

function chooseRandomAccidental(allowedAccidentals) {
  return allowedAccidentals.randomElement()
}

/**
 * randomRomanNumeralContext - Choose a random roman numeral context -- mode, mode note, scale degree, and numeral -- given a chord structure.
 *
 * @param  {type} chordStructure The chord structure to create context for.
 * @return {type}                An object consisting of a mode, a mode note, scale degree, and roman numeral.
 */
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