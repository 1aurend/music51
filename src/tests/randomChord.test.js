import { 
	randomChord, 
	chooseChordType,
	chooseChordStructure, 
	chooseInversion,
	chooseKeySignature,
	makeChordDescription,
	partiallyConcretizeChord
} from '../generator/chordGenerator'
import { ChordType } from '../generator/ChordType'
import { ChordTypesOption } from '../generator/ChordTypesOption'

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
	const inversion = chooseInversion(chordType)
	const keySignature = chooseKeySignature()
	expect(makeChordDescription(chordType, inversion, keySignature)).toBeDefined()
})

test('partially concretize chord notes makes three notes for a triad', () => {
	const chordType = ChordType.TRIAD
	const inversion = chooseInversion(chordType)
	const keySignature = chooseKeySignature()
	const chordDescription = makeChordDescription(chordType, inversion, keySignature)	
	expect(partiallyConcretizeChord(chordDescription, keySignature).length).toBe(3)
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
