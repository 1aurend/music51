import { classes, keySignatures } from './chordConsts'
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
import { Question, questionsForChordType } from './Question'

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
  let chords = []
  for (var i = 0; i < numQs; i++) {
    // Create the chords for each round.
    let chordContext = randomChordContext()
    chordContext.questions = questionsForChordType(chordContext.chordType)
      .map(question => question(chordContext))
    chords.push(chordContext)
  }
  addKeystrokes(chords)
  return chords
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
export function randomChordContext(options) {
  // Choose a random `KeySignature`
  const keySignature = chooseKeySignature()
  // Choose a random `ChordType` from the constraints provided by the user
  const chordType = chooseChordType()
  // Choose a random `ChordStructure` belonging to the chosen `ChordType` family
  const chordStructure = chooseChordStructure(chordType)
  // Choose a random inversion from those afforded by the chosen `ChordStructure`
  const inversion = chooseInversion(chordStructure)
  // Choose whether we will be in a major or minor mode.
  // FIXME: Consider better naming of `modeLabel`. More like `modeCategory`.
  const modeLabel = chooseModeLabel(chordStructure)

  // Choose a random roman numeral context
  const romanNumeralContext = randomRomanNumeralContext(chordStructure, modeLabel)
  // Construct non—octave-positioned description of a chord, in the form:
  // {
  //    root: { independentPitch, accidental, letter, syllable },
  //    structure: ChordStructure,
  //    inversion: Int
  // }
  const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
  // Construct the octave-displaced (but not concretely-octavized) notes for chord described above
  // TODO: Come up with a better name
  const partiallyConcretizedNotes = partiallyConcretizeChord(chordDescription, keySignature)
  // Choose a random clef
  const clef = Clef.randomElement()
  // Fully concretize the notes on the staff as is appropriate for the randomly chosen `clef`.
  const staffAdjustedNotes = staffAdjust(partiallyConcretizedNotes, clef)
  // Get the VexFlow representation of the "Shapes" key signature.
  // FIXME: Codify the relationship between "Shapes" key signatures, Common Western Notation key signatures,
  //        and Vexflow key signatures.
  const vexFlowKeySignature = keySignatures[keySignature].vexSig

  // Bundle up all of the information useful to graphically represent the notes on the screen.
  // TODO: Consider bundling up all of the informational artifacts we have created along the way, e.g.,
  //       `chordDescription`, `romanNumeralContext`, etc.
  const result = {
    clef: clef,
    shape: keySignature,
    keySignature: vexFlowKeySignature,
    modeLabel: modeLabel,
    chordType: chordType,
    chordDescription: chordDescription,
    romanNumeralContext: romanNumeralContext,
    notes: staffAdjustedNotes
  }
  // All done!
  return result
}

// TODO: Consider making `Chord` a class. Add a class method on `Chord`: `random()`, which produces one
// random chord!
export function makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext) {
  // Concretize the root by situating the roman numeral context's `modeNote` in the given
  // `keySignature`.
  const concretizedRoot = concretizeRoot(keySignature, romanNumeralContext.modeNote)
  return {
    root: concretizedRoot,
    structure: chordStructure,
    inversion: inversion
  }
}

/**
 * concretizeRoot - Returns a letter name, an independent pitch, and an accidental for a root note given a key signature and a mode note.
 *
 * @param  {type} keySignature A randomly chosen key signature represented as a shape
 * @param  {type} modeNote     The mode of the root note
 * @return {type}              An object consisting of the independent pitch, the accidental, and the letter name for the root note.
 * @todo                       This algorithm works in quadratic time, but could quite possibly work in constant time.
 */
export function concretizeRoot(keySignature, modeNote) {
  // TODO: ask David-- how do we know accidental at the shapes level of abstraction?
  // TODO: Configure the Shapes object so we don't have iterate through an array of notes each time
  // TODO: Use this function to generate every note not just roots? If so, rename to something like concretizeNote.
  const shape = Shapes[keySignature]
  const note = shape.notes.find(note => note.mode === modeNote)
  const rootAccidental = note.accidental
  const rootSyllable = note.refIP
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

/**
 * partiallyConcretizeChord - Return the non-octave-positioned notes for the given `chord`.
 * @param chordDescription
 * @return An array of octave-displaced spelled pitches comprising a `chord`.
 */
export function partiallyConcretizeChord(chordDescription, keySignature) {

  const rootLetter = chordDescription.root.letter
  const rootIP = chordDescription.root.independentPitch
  const rootAccidental = chordDescription.root.accidental
  const rootSyllable = chordDescription.root.syllable

  const inversion = chordDescription.inversion

  // TODO: First, codify `inversion` in a stronger way
  // TODO: Then, pull this out to its own function
  let template = chordDescription.structure.structure

  // Rotates the independent pitches in the `template` based on the `inversion`.
  if ((inversion === "63") || (inversion === "65")) {
    template.rotate(1)
  } else if ((inversion === "64") || (inversion === "43")) {
    template.rotate(2)
  } else if (inversion === "42") {
    template.rotate(3)
  }

  // Keep track of the preceeding letter name position (e.g., C = 0, D = 1, G = 4, etc.) in order to see
  // when we have crossed over the mod7 boundary, and thus when to bump up the octave displacement.
  // We start with `7` as it is a kind of `Infinity`, which all values will register as being "less than".
  // As such, we will bump up the `octaveDisplacement` from `-1` to `0` for the first note no matter what.
  //
  // This is surely not the only way, and quite possibly not the best way, to do this. Open for critique!
  //
  // One other method would be to do this in a second pass over non-octave-positioned notes. This could be
  // theoretically wasteful, but we are iterating over 3–4 values for now…
  let prevLetterNamePosition = 7
  let octaveDisplacement = -1

  // The notes of a chord to be returned
  // TODO: Consider implementing this with `map`
  let notes = []

  // build the structure with correct spellings
  // FIXME: Assess schema (diving `structure.structure` is not elegant)
  // TODO: Consider breaking out the body of this loop into its own function
  for(var i=0; i<template.length; i++){
    // Translate the template ip to a relative note in the class
    const translatedNoteIP = translateNoteIPIndex(template[i])
    // Compute the syllable of the chord component
    const syllable = chordComponentSyllable(translatedNoteIP, chordDescription)
    // Find the equivalent IP based on the rootIp and tensionMod12 value in the class
    const noteIP = chordComponentIndependentPitch(rootIP, translatedNoteIP, keySignature)

    const syllableIndex = Object.values(IndependentPitchSubset.BOTTOM).indexOf(syllable)
    const noteLetter = Object.values(LetterName)[syllableIndex]
    const notePosition = letterNamePosition(noteLetter)

    // Handle octave displacement if we cross over the mod7 boundary
    // FIXME: Consider doing this in another pass
    if (notePosition < prevLetterNamePosition) { octaveDisplacement += 1 }
    prevLetterNamePosition = notePosition

    const accid = accidental(noteIP, syllable)
    const shouldFilterOutAccidental = accidentalForLetterNameIsInKeySignature(
      noteLetter,
      accid,
      keySignature
    )

    const note = {
      letter: noteLetter,
      accidental: shouldFilterOutAccidental ? "" : accidental(noteIP, syllable),
      octave: octaveDisplacement
    }

    // Append our new note to the array to be returned
    notes.push(note)
  }

  return notes
}

/**
 * accidentalForLetterNameIsInKeySignature - description
 *
 * @param  LetterName   letterName
 * @param  Accidental   accidental
 * @param  KeySignature keySignature
 * @return Boolean      `true` if the given `letterName` is inherent in the given
 *                      `keySignature` is associated with the given `accidental`.
 *                      Otherwise, `false`.
 * @todo                Move to `Accidental` or somewhere similarly low-level
 */
export function accidentalForLetterNameIsInKeySignature(letterName, accidental, keySignature) {
  const noteInKeySignature = Shapes[keySignature].notes.find(note =>
    note.refIP == letterNameToRefIP(letterName)
  )
  return accidental == noteInKeySignature.accidental
}

function letterNameToRefIP(letter) {
  switch (letter) {
    case LetterName.C:
      return IndependentPitch.DO
    case LetterName.D:
      return IndependentPitch.RE
    case LetterName.E:
      return IndependentPitch.MI
    case LetterName.F:
      return IndependentPitch.FA
    case LetterName.G:
      return IndependentPitch.SO
    case LetterName.A:
      return IndependentPitch.LA
    case LetterName.B:
      return IndependentPitch.TI
    default:
      throw 'invalid letter name'
  }
}

function chordComponentSyllable(translatedNoteIPIndex, chordDescription) {

  // FIXME: Come up with a name that is neither `whiteNotes` nor `.BOTTOM`
  const whiteNotes = Object.values(IndependentPitchSubset.BOTTOM)
  const rootSyllable = chordDescription.root.syllable
  const rootSyllableIndex = whiteNotes.indexOf(rootSyllable)
  let modeConstructor = chordDescription.structure.modeConstructor

  // FIXME: This sanitizes the mode constructors for chords which are set as `MAJOR` or `DOMINANT`,
  //        and changes them to `LYDIAN_DOMINANT`. Likewise, we change `MINOR` inputs to `DORIAN`.
  //
  //        Either, we need change the values of the chord structure schema, or we need to flesh out
  //        our `noteIdentities(mode)`.
  if (modeConstructor === Mode.MAJOR || modeConstructor === Mode.DOMINANT) {
    modeConstructor = Mode.LYDIAN_DOMINANT
  } else if (modeConstructor === Mode.MINOR) {
    modeConstructor = Mode.DORIAN
  }

  const modeNoteIdentities = noteIdentities(modeConstructor)
  const tensionMod7 = noteIdentities(modeConstructor)[translatedNoteIPIndex].tensionMod7
  const index = (rootSyllableIndex + tensionMod7 - 1) % 7
  return whiteNotes[index]
}

/**
 * @param rootIP            IndependentPitch  The IndependentPitch syllable of the root of a chord
 * @param translatedNoteIPIndex  Int               The index of the translated note independent pitch
 * @param keySignature      KeySignature      The KeySignature context of the chord
 */
// find the equivalent IP based on the rootIp and tensionMod12 value in the class
function chordComponentIndependentPitch(rootIP, translatedNoteIPIndex, keySignature) {
  const ips = Object.values(IndependentPitch)
  const rootIPIndex = ips.indexOf(rootIP)
  return ips[(rootIPIndex + translatedNoteIPIndex) % 12]
}

function accidental(independentPitch, syllable) {
  // FIXME: (James) Make a helper function that tidies this up
  // find the accidental from the diff between IP and "natural" syllable (natural is accidentals[2])
  let accidentalVal = (Object.values(IndependentPitch).indexOf(independentPitch))-(Object.values(IndependentPitch).indexOf(syllable))

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
  const accidental = Object.values(Accidental)[(2 + accidentalVal)%5]
  return accidental
}

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
    return { letter: note.letter, accidental: note.accidental, octave: note.octave + octaves }
  })
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
    structure === ChordStructure.AUGMENTED_TRIAD &&
    syllable === IndependentPitch.TI
  )
  if (containsTripleFlat || containsTripleSharp) {
    return Accidental.NATURAL
  }
  return initialChoice
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
    case ChordStructure.MAJOR_TRIAD:
    case ChordStructure.AUGMENTED_TRIAD:
    case ChordStructure.DOMINANT_SEVENTH:
    case ChordStructure.MAJOR_SEVENTH:
      return degreeAndQualityToRomanNumeral(degree, true)
    default:
      return degreeAndQualityToRomanNumeral(degree, false)
  }
}

export function translateNoteIPIndex(componentIP) {
  const untranslatedIndex = Object.values(IndependentPitch).indexOf(componentIP)
  const anchorIndex = Object.values(IndependentPitch).indexOf("D")
  return (untranslatedIndex - anchorIndex + 12).mod(12)
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
 * @param  {type} chord     Note values to be inverted
 * @param  {type} inversion The amount of inversions to perform
 * @return {type}           An array of notes inverted the amount of times indicated by `inversion`
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
 * @param ChordStructure chordStructure The `ChordStructure` of a chord
 * @return                              An array of strings representing the various inversions
 *                                      available for the given `chordStructure`
 */
function inversions(chordStructure) {
  switch (chordStructure) {
    // Triads
    case ChordStructure.MAJOR_TRIAD:
    case ChordStructure.MINOR_TRIAD:
    case ChordStructure.DIMINISHED_TRIAD:
    case ChordStructure.AUGMENTED_TRIAD:
    case ChordStructure.FLAT_THREE_MAJOR_TRIAD:
    case ChordStructure.FLAT_SIX_MAJOR_TRIAD:
    case ChordStructure.FLAT_SEVEN_MAJOR_TRIAD:
    case ChordStructure.TONIC_MAJOR_TRIAD_IN_MINOR:
    case ChordStructure.SUBDOMINANT_MAJOR_TRIAD_IN_MINOR:
    case ChordStructure.FIVE_OF_FIVE:
    case ChordStructure.FIVE_SEVEN_OF_FIVE:
    case ChordStructure.FIVE_OF_SIX:
    case ChordStructure.FIVE_SEVEN_OF_SIX:
    case ChordStructure.FIVE_SEVEN_OF_MAJOR_FOUR:
    case ChordStructure.FIVE_SEVEN_OF_MINOR_FOUR:
      return ["","63","64"]
    // Sevenths
    case ChordStructure.DOMINANT_SEVENTH:
    case ChordStructure.MAJOR_SEVENTH:
    case ChordStructure.MINOR_SEVENTH:
    case ChordStructure.HALF_DIMINISHED_SEVENTH:
    case ChordStructure.FULLY_DIMINISHED_SEVENTH:
    case ChordStructure.SEVEN_DIMINISHED_SEVENTH_OF_FIVE:
    case ChordStructure.SEVEN_HALF_DIMINISHED_SEVENTH_OF_SEVEN:
    case ChordStructure.FIVE_OF_SEVEN_DIMINISHED:
    case ChordStructure.FIVE_SEVEN_OF_SEVEN_DIMINISHED:
      return ["","65","43","42"]
    // Unique cases
    case ChordStructure.NEAPOLITAN_SIXTH:
      return ["", "6"]
    case ChordStructure.ITALIAN_AUGMENTED_SIXTH:
    case ChordStructure.FRENCH_AUGMENTED_SIXTH:
    case ChordStructure.GERMAN_AUGMENTED_SIXTH:
      return ["6"]
    default:
      throw "Invalid chord structure: " + JSON.stringify(chordStructure)
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

/**
 * @return A random `ChordType` value.
 */
export function chooseChordType() {
  return ChordType.randomElement()
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

// Make a random choice of root accidentals while filtering out egregious edge cases (e.g., 𝄫♭, and `𝄪♯`)
function chooseRootAccidental(syllable, structure, allowedAccidentals) {
  return constrainAccidental(
    syllable,
    structure,
    chooseRandomAccidental(allowedAccidentals))
}

export function chooseModeLabel(chordStructure) {
  return Object.keys(chordStructure.commonRootOffsets).randomElement()
}

/**
 * randomRomanNumeralContext - Choose a random roman numeral context -- mode, mode note, scale degree, and numeral -- given a chord structure.
 *
 * @param  chordStructure The chord structure to create context for.
 * @param  modeLabel      The mode label of the mode (i.e., mode category, i.e., "Major" | "minor")
 * @return                An object consisting of a mode, a mode note, scale degree, and roman numeral.
 * @todo                  Rename to `chooseRomanNumeralContext`
 */
export function randomRomanNumeralContext(chordStructure, modeLabel) {
  // FIXME: Codify "Major" and "minor" here!
  let mode
  switch (modeLabel) {
    case "Major":
      mode = Mode.MAJOR
      break
    case "minor":
      mode = Mode.MINOR
      break
  }
  switch (chordStructure) {
    case ChordStructure.MAJOR_TRIAD:
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
    case ChordStructure.MINOR_TRIAD:
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
    case ChordStructure.DIMINISHED_TRIAD:
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
    case ChordStructure.AUGMENTED_TRIAD: {
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
      const modeNote = [Mode.MAJOR, Mode.LYDIAN].randomElement()
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
    case ChordStructure.NEAPOLITAN_SIXTH:
    case ChordStructure.ITALIAN_AUGMENTED_SIXTH:
    case ChordStructure.FRENCH_AUGMENTED_SIXTH:
    case ChordStructure.GERMAN_AUGMENTED_SIXTH:
    case ChordStructure.FLAT_THREE_MAJOR_TRIAD:
    case ChordStructure.FLAT_SIX_MAJOR_TRIAD:
    case ChordStructure.FLAT_SEVEN_MAJOR_TRIAD:
    case ChordStructure.TONIC_MAJOR_TRIAD_IN_MINOR:
    case ChordStructure.SUBDOMINANT_MAJOR_TRIAD_IN_MINOR:
    case ChordStructure.FIVE_OF_FIVE:
    case ChordStructure.FIVE_SEVEN_OF_FIVE:
    case ChordStructure.FIVE_OF_SIX:
    case ChordStructure.FIVE_SEVEN_OF_SIX:
    case ChordStructure.FIVE_SEVEN_OF_MAJOR_FOUR:
    case ChordStructure.FIVE_SEVEN_OF_MINOR_FOUR:
    case ChordStructure.SEVEN_DIMINISHED_SEVENTH_OF_FIVE:
    case ChordStructure.SEVEN_HALF_DIMINISHED_SEVENTH_OF_SEVEN:
    case ChordStructure.FIVE_OF_SEVEN_DIMINISHED:
    case ChordStructure.FIVE_SEVEN_OF_SEVEN_DIMINISHED:
      // We have fallen through to here
      // FIXME: We must alter the input to this function in order to handle chromatic alterations.
      throw "Chord structure not yet supported: " + JSON.stringify(chordStructure)
    default:
      throw "Invalid chord structure: " + JSON.stringify(chordStructure)
  }
}
