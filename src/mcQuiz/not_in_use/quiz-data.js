const data = [
  {
    id: 1,
    question: 'This question has two answers. Click two choices to proceed.',
    answers: [
      'B',
      'C',
    ],
    ordered: false,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    id: 2,
    question: 'Hey-a new question! This one has only one answer.',
    answers: [
      'C',
    ],
    ordered: false,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    id: 3,
    question: 'And another with one answer...',
    answers: [
      'A',
    ],
    ordered: false,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    id: 4,
    question: 'This question has three answers.',
    answers: [
      'A',
      'B',
      'C'
    ],
    ordered: false,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    id: 5,
    question: 'So does this one.',
    answers: [
      'A',
      'B',
      'C',
    ],
    ordered: false,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    id: 6,
    question: 'question text or image goes here',
    answers: [
      'A',
      'B',
      'C',
    ],
    ordered: true,
    choices: [
      'A',
      'B',
      'C',
      'D',
      'E',
    ]
  },
  {
    test: 'test'
  }
]

export default data

//things the app needs to know: how many answers to look for, whether order matters, test cases 1 and 2 should be functionally the same so just code for 2 and 3 (I think?)
