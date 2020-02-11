import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Loading from '../components/views/layouts/Loading'

test('loads with correct text', () => {
  const { getByRole, asFragment } = render(
  <Loading />
)
  expect(getByRole('heading')).toHaveTextContent('Calculating your stats...')
  expect(asFragment()).toMatchSnapshot()
})
