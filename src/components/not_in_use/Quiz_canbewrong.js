import React, { useEffect, useState, useRef } from 'react'
import Chord from './Chord'
import Choice from './Choice'
import Results from './Results.js'
import Start from './Start'
import { Link } from 'react-router-dom'
import { pagegrid, question, choices, results, questionh2 } from './quizStyles'


function Quiz (props) {

  const [currentQ, nextQ] = useState(props.data[0].fields)
  const [noteColors, flipColorSwitch] = useState(false)
  const [reset, startOver] = useState(false)

  const startTime = useRef([Date.now()])
  const clickTime = useRef([])
  const answeredCount = useRef(0)
  const timesLog = useRef([])
  const responsesLog = useRef([])
  const inputs = useRef([])
  const average = useRef(0)
  const correct = useRef(0)


  function handleClick(choice) {

    let now = Date.now()
    let color = () => {
      for (var i = 0; i < inputs.current.length; i++) {
        if (inputs.current[i] === currentQ.answers[i]) {
          return true
        }
        else {
          return false
        }
      }
    }

    Promise.resolve(inputs.current = [...inputs.current, choice]).then(() => {
      if (color) {
        flipColorSwitch(!noteColors)
      }
    }).then(() => {
       if (currentQ.answers.length === inputs.current.length) {
        clickTime.current = [...clickTime.current, now]
        startTime.current = [...startTime.current, now]
        answeredCount.current = answeredCount.current+1
        responsesLog.current = [...responsesLog.current, {input: inputs.current, answer: currentQ.answers}]
      }}).then(() =>
        { if (currentQ.answers.length === inputs.current.length) {
        doMath()
      }}).then(() =>
        { if (currentQ.answers.length === inputs.current.length && answeredCount.current < props.data.length) {
        inputs.current = []
        nextQ(props.data[answeredCount.current].fields)
      }})

  }

  function doMath() {

    let time = (clickTime.current[(clickTime.current.length-1)]-startTime.current[(answeredCount.current-1)])/1000
    console.log('math= ' + time)
    timesLog.current = [...timesLog.current, time]

    console.log('reponses so far: ' + JSON.stringify(responsesLog.current));
    if (JSON.stringify(responsesLog.current[responsesLog.current.length-1].answer) === JSON.stringify(responsesLog.current[responsesLog.current.length-1].input)) {
      correct.current = correct.current+1
      console.log('number correct = ' + correct.current);
    }

    if (answeredCount.current === props.data.length) {
      const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length
      average.current = mean(timesLog.current)
      nextQ(null)
    }

  }


  if (answeredCount.current < props.data.length) {
    return (
      <div style={pagegrid}>
        <div style={question}>
          <Chord notes={currentQ.notes} octaves={currentQ.octaves} clef={currentQ.clef} inputs={inputs.current} />
        </div>
        <div style={choices}>
          {currentQ.choices.map(choice => {return (
            <Choice onClick={() => handleClick(choice)} choice={choice} key={choice} />)})}
        </div>
      </div>
    )
  }
  else if (reset) {
    return <Start />
  }
  else {
      return (
      <div style={pagegrid}>
        <div style={question}>
          <h2 style={questionh2}>End of Quiz!</h2>
        </div>
        <div style={results}>
          <Results average={average.current} correct={correct.current} totalQs={props.data.length}/>
          <button onClick={(e) => {startOver(true)}}>Start Over</button>
        </div>
      </div>
    )
  }


}

export default Quiz
