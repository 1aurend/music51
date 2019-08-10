import React, { useState, useRef } from 'react'
import { pagegrid, question, startinputs, questionh2, questionh3 } from './quizStyles'
import Options from './Options.js'
import Go from './Go.js'
import Quiz from './Quiz'


export default function Start(props) {

  const numQs = useRef(1)
  const [ready, launchQuiz] = useState(false)
  const userId = useRef('somebody')
  const sessionId = useRef(Date.now())
  const [quiz, setQuiz] = useState([])
  const [options, updateOptions] = useState({
    chordTypes: {major:true, minor:true, aug:true, dim:true},
    clefs: {treble:true, base:true},
    roots: {easy:true, medium:true, hard:true}
  })


  let generateQuiz = (e) => {

    for (var i = 0; i < numQs.current; i++) {
      setQuiz([...quiz, props.data[i]])
    }

      //generateChords(options, setQuiz) change to this after adding chord generator
      launchQuiz(true)
  }

  let onCheck = (e, type) => {

    console.log(type);

    let prev
    let next

    switch (type) {
      case 'chord':
          prev = options.chordTypes
          next = {...prev, [e.target.value]: !prev[e.target.value]}
          updateOptions({...options, chordTypes: next })
          break
      case 'clef':
          prev = options.clefs
          next = {...prev, [e.target.value]: !prev[e.target.value]}
          updateOptions({...options, clefs: next })
          break
      case 'root':
          prev = options.roots
          next = {...prev, [e.target.value]: !prev[e.target.value]}
          updateOptions({...options, roots: next })
          break
      default: alert('something went wrong selecting options')

    }

  }

  console.log(JSON.stringify(options, null, 4));


  if (!ready) {
    return (
      <div style={pagegrid}>
        <div style={question}>
          <h2 style={questionh2}>Music 51 Prototype</h2>
          <Options checked={options} onChange={(e) => {numQs.current = e.target.value}} onCheck={onCheck}/>
        </div>
        <div style={startinputs}>
          <Go onClick={generateQuiz}/>
        </div>
      </div>
    )
  }
  else if (ready) {
    return (
      <Quiz data={quiz} userId={userId.current} sessionId={sessionId.current} />
    )
  }


}
