import sum from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('adds 2 + 1 to equal 3', () => {
  expect(2 + 1).toBe(3);
});

test('adds 2 + 2 to equal 4 using our homemade sum function', () => {
	expect(sum(2,2)).toBe(4);
})
