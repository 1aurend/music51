import { findYMax, getDataPoints, getSummaryData } from '../components/data/getChartData'

test('findYMax returns the correct int', () => {
  const qTypes = [1, 2, 3, 4]
  const data = {
    1: {attempts: [3]},
    2: {attempts: [3]},
    3: {attempts: [6]},
    4: {attempts: [3]},
  }
  const result = findYMax(data, qTypes, 'attempts')
  console.log(result);
  expect(result).toBe(6)
})


test('getDataPoints returns an object', () => {
  const qTypes = [1, 2, 3]
  const data = {
    1: {attempts: [3, 1]},
    2: {attempts: [3, 2]},
    3: {attempts: [6, 1]},
    4: {attempts: [3, 4]},
  }
  const result = getDataPoints(data, qTypes, 'attempts')
  console.log(result);
  expect(result).toBeTruthy()
})


test('getSummaryData returns an object', () => {
  const data = {
    Overall: {
      attempts: [3, 2, 1]
    }
  }
  const result = getSummaryData(data, 'attempts', 3)
  console.log(result);
  expect(result).toBeTruthy()
})
