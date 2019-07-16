import React from 'react'
import { selector } from './quizStyles'

function QuizSelector(props) {

return (
  <div style={selector}>
    <select onChange={props.onChange}>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
    </select>
  </div>
)

} //eventually other options can go in here

export default QuizSelector
