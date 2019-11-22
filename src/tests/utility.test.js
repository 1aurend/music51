import '../generator/utility'
import { Clef } from '../generator/Clef'

test('we can get a random element from an "enum"', () => {
  const clefOptions = [Clef.BASS, Clef.TREBLE]
  const randomClef = Clef.randomElement()
  expect(clefOptions).toContain(randomClef)
})
