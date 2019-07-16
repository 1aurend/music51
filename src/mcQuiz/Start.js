import React, { useState, useRef } from 'react'
import { pagegrid, question, startinputs, questionh2, questionh3 } from './quizStyles'
import QuizSelector from './QuizSelector.js'
import Go from './Go.js'
import Quiz from './Quiz'


function Start(props) {

  const numQs = useRef(1)
  const [ready, launchQuiz] = useState(false)
  const userId = useRef('somebody')
  const sessionId = useRef(Date.now())
  const quiz = useRef([])


  let generateQuiz = (e) => {

    for (var i = 0; i < numQs.current; i++) {
      quiz.current.push(props.data[i])
    }
    console.log(quiz.current);

      launchQuiz(true)
  }


  if (!ready) {
    return (
      <div style={pagegrid}>
        <div style={question}>
          <h2 style={questionh2}>Music 51 Prototype</h2>
          <h3 style={questionh3}>Choose a number of chords (1 chord = 4 questions) to try it.</h3>
        </div>
        <div style={startinputs}>
          <QuizSelector onChange={(e) => {numQs.current = e.target.value}}/>
          <Go onClick={generateQuiz}/>
        </div>
      </div>
    )
  }
  else if (ready) {
    return (
      <Quiz data={quiz.current} userId={userId.current} sessionId={sessionId.current} />
    )
  }


}

export default Start
