import { listAttemptsByQuestionType, listTimesByQuestionType, tallyRound, tallyMeans } from '../components/data/tallyMeans'

test('listAttemptsByQuestionType returns a single array', () => {
  const data = [
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2],
            elapsedTime: 1.2
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3]
          }]
        },
      ]
    },
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 2.3
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3, 4]
          }]
        },
      ]
    }
  ]
  const attempts = listAttemptsByQuestionType(data, 'names')
  console.log(attempts)
  expect(attempts.length).toBeGreaterThan(1)
})

test('listAttemptsByQuestionType returns when type does not exist', () => {
  const data = [
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2],
            elapsedTime: 1.2
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3]
          }]
        },
      ]
    },
    {
      questions: [
        {
          type: 'test',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 2.3
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3, 4]
          }]
        },
      ]
    },
  ]
  const attempts = listAttemptsByQuestionType(data, 'test')
  console.log(`missing question attempts: ${attempts}`)
  console.log(attempts)
  expect(attempts.length).toBe(1)
})

test('listTimesByQuestionType returns a single array', () => {
  const data = [
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2],
            elapsedTime: 1.2
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 1.2
          }]
        },
      ]
    },
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 2.3
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3, 4],
            elapsedTime: 3.3
          }]
        },
      ]
    }
  ]
  const times = listTimesByQuestionType(data, 'names')
  console.log(times)
  expect(times.length).toBeGreaterThan(1)
})

test('tallyRound returns an object', () => {
  const data = [
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2],
            elapsedTime: 1.2
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 3.4
          }]
        },
      ]
    },
    {
      questions: [
        {
          type: 'names',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 2.3
          }]
        },
        {
          type: 'degree',
          answers: [{
            tries: [1, 2, 3, 4],
            elapsedTime: 1.4
          }]
        },
      ]
    }
  ]
  const means = tallyRound(data)
  console.log(means)
  expect(means).toBeTruthy()
})

test('tallyMeans returns with nulls for unused questions', () => {
  const data = [
    {
      questions: [
        {
          type: 'ROLE',
          answers: [{
            tries: [1, 2],
            elapsedTime: 1.2
          }]
        },
        {
          type: 'LETTER_NAMES',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 1.4
          }]
        },
      ]
    },
    {
      questions: [
        {
          type: 'LETTER_NAMES',
          answers: [{
            tries: [1, 2, 3],
            elapsedTime: 2.3
          }]
        },
        {
          type: 'QUALITY',
          answers: [{
            tries: [1, 2, 3, 4],
            elapsedTime: 0.5
          }]
        },
      ]
    },
  ]
  const state = {
         "tally": {
            "LETTER_NAMES": {
               "attempts": [
                  3
               ],
               "times": [
                  2.3
               ]
            },
            "ROOT": {
               "attempts": [
                  null
               ],
               "times": [
                  null
               ]
            },
            "DEGREE": {
               "attempts": [
                  4
               ],
               "times": [
                  4.5
               ]
            },
            "ROLE": {
               "attempts": [
                  2
               ],
               "times": [
                  1.2
               ]
            },
            "NUMERAL": {
               "attempts": [
                  null
               ],
               "times": [
                  null
               ]
            },
            "QUALITY": {
               "attempts": [
                  null
               ],
               "times": [
                  null
               ]
            },
            "INVERSION": {
               "attempts": [
                  2
               ],
               "times": [
                  0.3
               ]
            },
            "FOLLOWED_BY": {
               "attempts": [
                  null
               ],
               "times": [
                  null
               ]
            }
         },
         "questionTypes": [
            "ROLE",
            "LETTER_NAMES",
            "DEGREE",
            "Overall"
         ]
      }
  const means = tallyMeans(state, data)
  console.log(JSON.stringify(means, null, 3))
  expect(means).toBeTruthy()
  const letterNames = means.tally.LETTER_NAMES.attempts
  expect(letterNames).toEqual([3,3])
  const quality = means.tally.QUALITY.times
  expect(quality).toEqual([null,0.5])
})
