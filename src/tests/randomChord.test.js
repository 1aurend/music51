import { randomChord, chooseChordStructure } from '../generator/chordGenerator'
import { ChordType } from '../generator/ChordType'

test('chooseChordStructure returns a value for all valid inputs', () => {
	expect(chooseChordStructure(ChordType.TRIAD)).toBeDefined()
	expect(chooseChordStructure(ChordType.SEVENTH)).toBeDefined()
	// TODO: Add tests for borrowed and applied chords
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

