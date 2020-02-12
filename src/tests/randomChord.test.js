import { randomChord } from '../generator/chordGenerator'

test('randomChord does not blow up', () => {
  const options = {
    chordTypes: { triads: true, sevenths: true },
    roots: { common: true, any: false }
  }
  let chord = randomChord(options)
})
