import { classes } from './chordConsts'
import addKeystrokes from './keystrokes'
import chalk from 'chalk'
import './utility.js'
import { shuffle } from './utility'
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

/**
 * export default - this is the interface between the generator and chord crusher or any other app; this function is named over in the react app that imports it
 *
 * @param  Int numQs      The number of questions a student has asked for
 * @param  Object options Configuration from student, in the form:
 *                          {
 *                            chordTypes: {triads: true, sevenths: true },
  *                           roots: { common: true, any: false }
 *                          }
 * @return Object         The questions object.
 * @todo                  Assess the spec of the questions object which is put out by this function
 */
export default function(numQs, options) {
  let chords = []
  for (var i = 0; i < numQs; i++) {
    chords.push(randomChord(options))
  }
  console.log(chalk.cyan(JSON.stringify(chords, null, 4)));
  return addKeystrokes(chords)
}

/**
 * randomChord - A big function to generate a random, correctly spelled chord structure within clef/staff limits
 * 
 * @param options The user settings for a given session, in the form:
 *                {
 *                  { 
 *                    chordTypes: { triads: true, sevenths: true },
                      roots: { common:true, any: false } 
 *                  }
 *                }
 */
function randomChord(options) {

  // FIXME: (James) We need to move chord shuffling closer to the user interface layer. 
  // FIXME: (James) Let's use `shuffled` here rather than mutating our source of truth.
  // Shuffles the root note choices so they're not always in root position haha
  // shuffle(chord.questions[1].choices)

  const chordType = chooseChordType(chordTypesOption(options.chordTypes))
  const inversion = chooseInversion(chordType)
  const keySignature = chooseKeySignature()

  // Construct non—octave-positioned description of a chord, in the form:
  // {
  //    root: { independentPitch, accidental, letter, syllable },
  //    structure: ChordStructure,
  //    inversion: Int
  // }
  const chordDescription = makeChordDescription(chordType, inversion, keySignature)

  // Construct the non-octave positioned notes for chord described above
  // TODO: Come up with a better name
  const partiallyConcretizedChordNotes = partiallyConcretizeChord(chordDescription, keySignature)

  // TODO: (James) add `inversion` method on `Chord` type
  // const inverted = handleInversion(chordDescription, inversion)
  
  const clef = Clef.randomElement()

  // Positions
  const positionedChord = staffAdjust(partiallyConcretizedChordNotes, clef)

  // FIXME: Put in the correct place
  
  

  return positionedChord
}

// Consider making `Chord` a class. Add a class method on `Chord`: `random()`, which produces one
// random chord!
//
// => (Note,Int)
export function makeChordDescription(chordType, inversion, keySignature) {
  // Choose one of the possible chord structures for the given chord type
  // Consider making this a function that generates an abstract chord rather than chooses one of the representations currently in ChordStructure
  const chordStructure = chooseChordStructure(chordType)
  // Choose random roman numeral context
  const romanNumeralContext = randomRomanNumeralContext(chordStructure)
  
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext.modeNote)

  // TODO: Fix this return... no longer correct... (11/15)
  return {
    root: concretizedRoot,
    structure: chordStructure,
    inversion: inversion
  }
}

// get the syllable "position" from the reference subset based on tensionMod7 value in the class
/**
 * @param rootSyllable      IndependentPitch  The IndependentPitch syllable of the root of a chord
 * @param translatedNoteIP  IndependentPitch  The IndependentPitch syllable of the chord component
 * @param keySignature      KeySignature      The KeySignature context of the chord
 */
function syllablePosition(rootSyllable, translatedNoteIP, keySignature) {
  // The array of the "Bottom" modes in-order
  const modeSubset = Object.values(ModeSubset.BOTTOM)
  const rootSyllableIndex = modeSubset.indexOf(rootSyllable)
  const shape = Object.values(Shapes)[keySignature]
  const noteOffsetInShape = shape[translatedNoteIP].tensionMod7 - 1
  return modeSubset[(rootSyllableIndex + noteOffsetInShape) % 7]  
}

/**
 * partiallyConcretizeChord - Return the non-octave-positioned notes for the given `chord`.
 * @param chord
 * @return An array of non-octave-positioned spelled pitches comprising a `chord`.
 */
function partiallyConcretizeChord(chord, keySignature) {

  const { rootIP, rootAccidental, rootLetter, rootSyllable } = chord.root

  // The notes of a chord to be returned
  let notes = []

  // build the structure with correct spellings
  for(var i=0; i<chord.structure.length; i++){

    // translate the template ip to a relative note in the class
    const translatedNoteIP = translateNoteIPIndex(chord.structure[i], rootIP)

    const noteSyllable = syllablePosition(rootSyllable, translatedNoteIP, keySignature)

    // find the equivalent IP based on the rootIp and tensionMod12 value in the class
    let noteIP = Object.values(IndependentPitch)[(Object.values(IndependentPitch).indexOf(rootIP) + Object.values(Shapes)[keySignature][translatedNoteIP].tensionMod12 - 1) % 12]

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

// This function takes converts a pair of Boolean values into a tri-state enum `ChordTypesOption` so that we invalidate the case where both triads and seventh chords are false.

function chordTypesOption(chordTypes) {
  console.log("chord types option from " + JSON.stringify(chordTypes))
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
 */
export function concretizeRoot(keySignature, modeNote) {
  // TODO: ask David-- how do we know accidental at the shapes level of abstraction?
  // TODO: Configure the Shapes object so we don't have iterate through an array of notes each time
  // TODO: Use this function to generate every note not just roots? If so, rename to something like concretizeNote.
  for (var i=0; i<Shapes[keySignature].notes.length; i++) {
    if (Shapes[keySignature].notes[i].mode === modeNote) {
      const rootAccidental = Shapes[keySignature].notes[i].accidental
      const rootSyllable = Shapes[keySignature].notes[i].refIP
      const offset = (Object.keys(Accidental).indexOf(rootAccidental))-(Object.keys(Accidental).indexOf(Accidental.NATURAL))
      const rootLetter = Object.keys(LetterName)[Object.keys(IndependentPitchSubset.BOTTOM).indexOf(rootSyllable)]
      const rootSyllableIndex = Object.values(IndependentPitch).indexOf(rootSyllable)
      const rootIPIndex = (rootSyllableIndex+offset)%12
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

export function translateNoteIPIndex(componentIP, rootIP) {
  const untranslatedIndex = Object.values(IndependentPitch).indexOf(componentIP)
  // TODO: audit addition of 12 here
  const rootIndex = Object.values(IndependentPitch).indexOf(rootIP)
  return (untranslatedIndex-rootIndex).mod(12)
}

// TODO: Decouple inversion from amount of notes in chord
// TODO: Move into partiallyConcretizeChordNotes
function handleInversion(chord, inversion) {

  console.log("handle inversion for chord: " + JSON.stringify(chord) + "by inversion " + JSON.stringify(inversion))

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