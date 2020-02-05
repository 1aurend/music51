

test('is this valid js conditional syntax', () => {
  const keySig = 'C♯'
  const vexflowKeySig = keySig.length === 1 ? keySig : keySig.charAt(1) === '♯' ? keySig.charAt(0)+'#' : keySig.charAt(0)+'b'
  expect(vexflowKeySig).toBe('C#')
})


test('returns an array of the correct length', () => {
  const colors = ['C', 'E', 'G']
  const notes = [
    {
      letter: 'E',
      octave: '4'
    },
    {
      letter: 'G',
      octave: '4'
    },
    {
      letter: 'C',
      octave: '5'
    }
  ]
  const noteColors = colors.map(color => {
    const noteNum = notes.map(note => note.letter).indexOf(color)
    return {key: noteNum, color: '#17c671'}
    })
  console.log(noteColors)
  expect(noteColors.length).toBe(3)
})
