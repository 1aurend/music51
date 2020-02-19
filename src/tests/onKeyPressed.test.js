function onKeyPressed() {
  const key = 'c'
  const choices = [
    {
      key: 'a',
      choice: 'a'
    },
    {
      key: 'b',
      choice: 'b'
    },
    {
      key: 'c',
      choice: 'c'
    }
  ]
  const input = (() => {
    for (let choice of choices) {

      if (key === choice.key) {
        return choice.choice
      }
    }
    return null
  })()
  if (input !== null) {
    console.log(input);
  }
  return input
}

test('onKeyPressed returns the correct key', () => {
  const result = onKeyPressed()
  expect(result).toBe('c')
})
