import React from 'react'
import AnswerChoice from '../components/views/buttons/AnswerChoice'
import renderer from 'react-test-renderer'

it('<AnswerChoice /> renders correctly', () => {
  const tree = renderer
    .create(<AnswerChoice
              onClick={() => {console.log('selected a choice')}}
              choice='B'
              keystroke='b'
              input={null}
              colors={[]}
              />)
    .toJSON();
  expect(tree).toMatchSnapshot()
})
