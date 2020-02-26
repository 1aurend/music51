import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Go from '../components/views/buttons/Go'
import 'jest-styled-components'


test('calls "generator" on click', () => {
  const generateQuiz = jest.fn(() => 'launching generator')
  const { getByText } = render(
  <Go onClick={generateQuiz}/>
  )
  fireEvent.click(getByText('GO!'))
  expect(generateQuiz).toHaveBeenCalledTimes(1)
  expect(generateQuiz).toHaveReturnedWith('launching generator')
  // expect(asFragment()).toMatchSnapshot()
})
