import { staffAdjust } from '../generator/chordGenerator'
import { LetterName } from '../generator/LetterName'
import { Clef } from '../generator/Clef'
import { invert } from '../generator/chordGenerator'

test('chord in range not adjusted', () => {
  let chord = [
    { letter: LetterName.C, octave: 4 }
  ]
  expect(staffAdjust(chord, Clef.TREBLE)).toEqual(chord)
})

test('monad below range adjusted up in treble clef', () => {
  let chord = [
    { letter: LetterName.C, octave: 3 }
  ]
  let expected = [
    { letter: LetterName.C, octave: 4 }
  ]
  console.log(JSON.stringify(chord, null, 3));
  expect(staffAdjust(chord, Clef.TREBLE)).toEqual(expected)
})

test('monad below range adjusted up in bass clef', () => {
  let chord1 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 1
      }
    ],
    clef: Clef.BASS
  }
  let chord2 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 2
      }
    ],
    clef: Clef.BASS
  }
  console.log(JSON.stringify(chord1, null, 3));
  expect(staffAdjust(chord1)).toEqual(chord2)
})

test('monad above range adjusted down in treble clef', () => {
  let chord1 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 7
      }
    ],
    clef: Clef.TREBLE
  }
  let chord2 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 6
      }
    ],
    clef: Clef.TREBLE
  }
  console.log(JSON.stringify(chord1, null, 3));
  expect(staffAdjust(chord1)).toEqual(chord2)
})

test('monad above range adjusted down in bass clef', () => {
  let chord1 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 5
      }
    ],
    clef: Clef.BASS
  }
  let chord2 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 4
      }
    ],
    clef: Clef.BASS
  }
  console.log(JSON.stringify(chord1, null, 3));
  expect(staffAdjust(chord1)).toEqual(chord2)
})

test('shifting notes', () => {
  const chord = [
    { letter: LetterName.C, octave: 4 },
    { letter: LetterName.E, octave: 4 },
    { letter: LetterName.G, octave: 4 },
  ]
  const inverted = invert(chord, 2)
  const expected = [
    { letter: LetterName.G, octave: 4 },
    { letter: LetterName.C, octave: 5 },
    { letter: LetterName.E, octave: 5 },
  ]
  expect(inverted).toEqual(expected)
})