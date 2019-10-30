import { staffAdjust, letterNames } from '../generator/chordGenerator'

test('chord in range not adjusted', () => {
  let chord = {
    notes: [
      {
        letter: letterNames.C,
        octave: 4
      }
    ],
    clef: 'treble'
  }
  expect(staffAdjust(chord)).toEqual(chord)
})

test('chord below range adjusted up', () => {
  let chord1 = {
    notes: [
      {
        letter: letterNames.C,
        octave: 3
      }
    ],
    clef: 'treble'
  }
  let chord2 = {
    notes: [
      {
        letter: letterNames.C,
        octave: 4
      }
    ],
    clef: 'treble'
  }
  const adjustedChord = staffAdjust(chord1)
  console.log(JSON.stringify(chord1, null, 3));
  expect(staffAdjust(chord1)).toEqual(chord2)
})
