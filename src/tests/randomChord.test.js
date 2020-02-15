import { 
	randomChord, 
	chooseChordType,
	chooseChordStructure, 
	chooseInversion,
	chooseKeySignature,
	randomRomanNumeralContext,
	makeChordDescription,
	partiallyConcretizeChord
} from '../generator/chordGenerator'
import { ChordType } from '../generator/ChordType'
import { ChordTypesOption } from '../generator/ChordTypesOption'
import { ChordStructure } from '../generator/ChordStructure'

test('chooseChordStructure returns a value for all valid inputs', () => {
	expect(chooseChordStructure(ChordType.TRIAD)).toBeDefined()
	expect(chooseChordStructure(ChordType.SEVENTH)).toBeDefined()
	// TODO: Add tests for borrowed and applied chords
})

test('chooseInversion returns a value for all valid inputs', () => {
	expect(chooseInversion(ChordType.TRIAD)).toBeDefined()
	expect(chooseInversion(ChordType.SEVENTH)).toBeDefined()
})

test('chooseKeySignature returns something', () => {
	expect(chooseKeySignature()).toBeDefined()
})

test('makeChordDescription makes a chordDescription', () => {
	const chordType = chooseChordType(ChordTypesOption.BOTH)
	const chordStructure = chooseChordStructure(chordType)
	const inversion = chooseInversion(chordType)
	const keySignature = chooseKeySignature()
	const romanNumeralContext = randomRomanNumeralContext(chordStructure)
	const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
	expect(chordDescription).toBeDefined()
})

test('partially concretize chord notes makes three notes for a triad', () => {
	const chordType = ChordType.TRIAD
	const chordStructure = chooseChordStructure(chordType)
	const inversion = chooseInversion(chordType)
	const keySignature = chooseKeySignature()
	const romanNumeralContext = randomRomanNumeralContext(chordStructure)
	const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)	
	expect(partiallyConcretizeChord(chordDescription, keySignature).length).toBe(3)
})

test('partially concretize major chord on c natural in root position in c major', () => {
	const chordStructure = ChordStructure.MAJOR
	const inversion = ""
	const keySignature = 'B' // "Bottom", i.e., C major
	const romanNumeralContext = {
		"mode": "Maj",
		"modeNote": "Maj",
		"degree": 1,
		"romanNumeral": "I"
	}
	const chordDescription = makeChordDescription(chordStructure, inversion, keySignature, romanNumeralContext)
	const partiallyConcretized = partiallyConcretizeChord(chordDescription, keySignature)
	expect(partiallyConcretized.length).toBe(3)
	// TODO: Actually check logic, please.
})

test('randomChord does not blow up', () => {
  const options = {
    chordTypes: { triads: true, sevenths: true },
    roots: { common: true, any: false }
  }
  let chord = randomChord(options)
})

test('partially concretize chord does something', () => {
  const chord = { }
  const keySignature = { }
    
})
