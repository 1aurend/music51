import React from 'react'
import Go from '../components/views/buttons/Go'
import renderer from 'react-test-renderer'

it('<Go /> renders correctly', () => {
  const tree = renderer
    .create(<Go onClick={() => {console.log('update')}} />)
    .toJSON();
  expect(tree).toMatchSnapshot()
})
