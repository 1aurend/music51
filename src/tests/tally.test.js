import { listAttemptsByQuestionType, listTimesByQuestionType, tallyRound } from '../components/tally'

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
