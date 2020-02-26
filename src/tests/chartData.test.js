import { findYMax, getDataPoints, getSummaryData, findThreeLargestDeltas, getChartData } from '../components/data/getChartData'

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

test('findYMax deals with null values', () => {
  const qTypes = [1, 2, 3, 4]
  const data = {
    1: {attempts: [3, null]},
    2: {attempts: [3, 8]},
    3: {attempts: [6, 1]},
    4: {attempts: [null, 3]},
  }
  const result = findYMax(data, qTypes, 'attempts')
  console.log(result);
  expect(result).toBe(8)
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

test('findThreeLargestDeltas returns three question types', () => {
  const data =   {
         "tally": {
            "LETTER_NAMES": {
               "attempts": [
                  3,
                  1
               ],
               "times": [
                  2.3,
                  1.85
               ]
            },
            "ROOT": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "DEGREE": {
               "attempts": [
                  4,
                  9
               ],
               "times": [
                  4.5,
                  null
               ]
            },
            "ROLE": {
               "attempts": [
                  2,
                  6
               ],
               "times": [
                  1.2,
                  1.2
               ]
            },
            "NUMERAL": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "QUALITY": {
               "attempts": [
                  null,
                  4
               ],
               "times": [
                  null,
                  0.5
               ]
            },
            "INVERSION": {
               "attempts": [
                  2,
                  null
               ],
               "times": [
                  0.3,
                  null
               ]
            },
            "FOLLOWED_BY": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "Overall": {
               "attempts": [
                  3,
                  2
               ],
               "times": [
                  1.18,
                  2.3
               ]
            }
         },
         "questionsCurrentRound": [
            "ROLE",
            "LETTER_NAMES",
            "QUALITY",
            "DEGREE",
            "Overall"
         ]
      }
  const result = findThreeLargestDeltas(data, 'attempts')
  console.log(result)
  expect(result).toBeTruthy()
  expect(result.length).toBe(3)
  expect(result).toEqual(['DEGREE', 'ROLE', 'LETTER_NAMES'])
})

test('getDataPoints filters out nulls', () => {
  const qTypes = [1, 2, 3]
  const data = {
    1: {attempts: [3, 1, 3]},
    2: {attempts: [3, 2, null]},
    3: {attempts: [null, 6, 1]},
    4: {attempts: [3, null, 4]},
  }
  const result = getDataPoints(data, qTypes, 'attempts')
  console.log(result)
  expect(result).toBeTruthy()
  expect(result['2'].length).toBe(2)
})

// TODO: add more tests in here to so we don't have to verify by looking at the log
test('getChartData returns expected values', () => {
  const data = {
         "tally": {
            "Names": {
               "attempts": [
                  3,
                  1,
                  7
               ],
               "times": [
                  2.3,
                  1.85,
                  67.3
               ]
            },
            "Root": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "Degrees": {
               "attempts": [
                  4,
                  9
               ],
               "times": [
                  4.5,
                  6
               ]
            },
            "Role": {
               "attempts": [
                  2,
                  6
               ],
               "times": [
                  1.2,
                  1.2
               ]
            },
            "Numerals": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "Quality": {
               "attempts": [
                  null,
                  4
               ],
               "times": [
                  null,
                  0.5
               ]
            },
            "Inversions": {
               "attempts": [
                  2,
                  null
               ],
               "times": [
                  0.3,
                  null
               ]
            },
            "Follows": {
               "attempts": [
                  null,
                  null
               ],
               "times": [
                  null,
                  null
               ]
            },
            "Overall": {
               "attempts": [
                  3,
                  2
               ],
               "times": [
                  1.18,
                  2.3
               ]
            }
         },
         "questionsCurrentRound": [
            "Role",
            "Names",
            "Quality",
            "Degrees",
            "Overall"
         ]
      }
  const result = getChartData(data, 2)
  console.log(JSON.stringify(result, null, 2))
  expect(result).toBeTruthy()
})
