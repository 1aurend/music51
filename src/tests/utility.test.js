import { randomObjectElement } from '../generator/utility'
import { Clef } from '../generator/Clef'

test('we can get a random element from an "enum"', () => {
  const clefOptions = [Clef.BASS, Clef.TREBLE]
  const randomClef = randomObjectElement(Clef)
  expect(clefOptions).toContain(randomClef)
})
