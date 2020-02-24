import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Quiz from '../components/logic/Quiz'
import 'jest-styled-components'


const sampleData =
[
   {
      "clef": "treble",
      "keySignature": "F",
      "notes": [
         {
            "letter": "G",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "B",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "D",
            "accidental": "",
            "octave": 5
         },
         {
            "letter": "F",
            "accidental": "",
            "octave": 5
         }
      ],
      "questions": [
         {
            "type": "Names",
            "questionText": "Name the letter positions from lowest to highest.",
            "answers": [
               "G",
               "B",
               "D",
               "F"
            ],
            "ordered": true,
            "choices": [
               {
                  "choice": "A",
                  "key": "a"
               },
               {
                  "choice": "B",
                  "key": "b"
               },
               {
                  "choice": "C",
                  "key": "c"
               },
               {
                  "choice": "D",
                  "key": "d"
               },
               {
                  "choice": "E",
                  "key": "e"
               },
               {
                  "choice": "F",
                  "key": "f"
               },
               {
                  "choice": "G",
                  "key": "g"
               }
            ]
         },
       ]
     }
   ]

test('evaluates input and colors choices correctly', () => {
  window.scrollTo = jest.fn()
  const { asFragment, getByText } = render(
  <Quiz round={1} data={sampleData}/>
  )
  expect(window.scrollTo).toBeCalledWith(0, 0)
  fireEvent.click(getByText('A'))
  expect(getByText('A')).toHaveAttribute('color', '#c4183c')
  fireEvent.click(getByText('G'))
  expect(getByText('G')).toHaveAttribute('color', '#17c671')
  expect(getByText('A')).toHaveAttribute('color', '#e5e6eb')
  expect(asFragment()).toMatchSnapshot()
})
