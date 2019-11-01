import { staffAdjust } from '../generator/chordGenerator'
import { LetterName } from '../generator/LetterName'
import { Clef } from '../generator/Clef'

test('chord in range not adjusted', () => {
  let chord = {
    notes: [
      {
        letter: LetterName.C,
        octave: 4
      }
    ],
    clef: Clef.TREBLE
  }
  expect(staffAdjust(chord)).toEqual(chord)
})

test('monad below range adjusted up in treble clef', () => {
  let chord1 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 3
      }
    ],
    clef: Clef.TREBLE
  }
  let chord2 = {
    notes: [
      {
        letter: LetterName.C,
        octave: 4
      }
    ],
    clef: Clef.TREBLE
  }
  console.log(JSON.stringify(chord1, null, 3));
  expect(staffAdjust(chord1)).toEqual(chord2)
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
