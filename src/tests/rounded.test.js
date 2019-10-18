import { rounded } from '../components/ChartData'

test('rounds 0.9999 to 1.00', () => {
  expect(rounded(0.999, 2)).toBe(1.00);
});

test('round 0.0001 to 0.00', () => {
	expect(rounded(0.0001, 2)).toBe(0.00);
})
