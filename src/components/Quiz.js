import React, { useEffect, useState, useRef } from 'react'
import Chord from './Chord'
import Choice from './Choice'
import Results from './Results.js'
import Start from './Start'
import SideBar from './SideBar'
import { pagegrid, question, choices, results, questionh2, questiontext } from './quizStyles'


export default function Quiz (props) {

  const [currentQ, nextQ] = useState(props.data[0].questions[0])
  const [endOfQ, doneQ] = useState(false)
  const [reset, startOver] = useState(false)
  const [noteColors, addColor] = useState([])
  const [incorrectTry, turnRed] = useState(false)
  const [currentInput, nextInput] = useState(null)
  const currentChord = useRef(props.data[0])
  const answersSideBar = useRef([])


  const sessionData = useRef(
    {
      userId: props.userId,
      sessionId: props.sessionId,
      results: []
    })

  const chord = useRef({
    chord: props.data[0].notes, //placeholder until DF gives me a unique id
    questions: []
  })

  const subQ = useRef({
    text: props.data[0].questions[0].questionText,
    answers: []
  })

  const answer = useRef({
    answer: props.data[0].questions[0].answers[0],
    tries: [],
    startTime: Date.now(),
    endTime: '',
    elapsedTime: '',
  })

  const keyDownRef = useRef(null)
  // useFocusOnKeyDown(keyDownRef, true)


  function handleClick(input) {

    answer.current.tries = [...answer.current.tries, {'input': input, type: 'click'}]
    nextInput(input)
    checkInput(input)
  }

  function onKeyPressed(e) {

    console.log('here is key: ' + e.key);
    let key = e.key
    let input = key.toUpperCase()
    answer.current.tries = [...answer.current.tries, {'input': input, type: 'keypress'}]
    nextInput(input)
    checkInput(input)
  }

  function checkInput(input) {
    if (input === currentQ.answers[subQ.current.answers.length]) {

      answer.current.endTime = Date.now()
      answer.current.elapsedTime = (answer.current.endTime-answer.current.startTime)/1000
      subQ.current.answers.push(answer.current)
      answer.current = {
        answer: props.data[sessionData.current.results.length].questions[chord.current.questions.length].answers[subQ.current.answers.length],
        tries: [],
        startTime: Date.now(),
        endTime: '',
        elapsedTime: '',
      }
      if (subQ.current.answers.length === currentQ.answers.length) {
        addColor([...noteColors, input])
        turnRed(false)
        chord.current.questions.push(subQ.current)
        console.log('next Q: ' + chord.current.questions.length);
        answersSideBar.current = [...answersSideBar.current, currentQ.answers]
        doneQ(true)
      }
      else {
        addColor([...noteColors, input])
        turnRed(false)
      }
    }
    else {
      turnRed(true)
    }
  }

  useEffect(() => {

    if (endOfQ === true) {
      setTimeout(() => {
        addColor([])
        turnRed(false)
        nextInput(null)
        if (chord.current.questions.length < currentChord.current.questions.length) {
          subQ.current = {
            text: props.data[sessionData.current.results.length].questions[chord.current.questions.length].questionText,
            answers: []
          }
          answer.current = {
            answer: props.data[sessionData.current.results.length].questions[chord.current.questions.length].answers[0],
            tries: [],
            startTime: Date.now(),
            endTime: '',
            elapsedTime: '',
          }
          nextQ(currentChord.current.questions[chord.current.questions.length])
          doneQ(false)
        }
        else {
          sessionData.current.results= [...sessionData.current.results, chord.current]
          answersSideBar.current = []
          if (sessionData.current.results.length < props.data.length) {
            chord.current = {
              chord: props.data[sessionData.current.results.length].notes,
              questions: []
            }
            answer.current = {
              answer: props.data[sessionData.current.results.length].questions[0].answers[0],
              tries: [],
              startTime: Date.now(),
              endTime: '',
              elapsedTime: '',
            }
            subQ.current = {
              text: props.data[sessionData.current.results.length].questions[0].questionText,
              answers: []
            }
            currentChord.current = props.data[sessionData.current.results.length]
            nextQ(currentChord.current.questions[0])
            doneQ(false)
          }
          else {
            console.log(JSON.stringify(sessionData.current, null, 4));
            doneQ(false)
          }
        }
      }, 1000)
    }

  }, [endOfQ, props.data])



  if (reset) {
    return <Start data={props.data}/> //this is hacky...circular prop passing... figure out how often we want to fetch new data and where to really store it
  }

  if (sessionData.current.results.length < props.data.length) {
      return (
        <div style={pagegrid}>
          <div style={question}>
            <h2 style={questiontext}>{currentQ.questionText}</h2>
            <Chord notes={currentChord.current.notes} octaves={currentChord.current.octaves} clef={currentChord.current.clef} colors={noteColors} />
            <SideBar text={answersSideBar.current} />
        </div>
          <div style={choices} onKeyDown={(e) => onKeyPressed(e)} tabIndex="1" ref={choices => choices && choices.focus()}>
            {currentQ.choices.map(choice => {
              return (
              <Choice onClick={() => handleClick(choice)} choice={choice} key={choice} input={currentInput} red={incorrectTry} />)})}
          </div>
        </div>
      )
  }
  else if (sessionData.current.results.length === props.data.length) {
      return (
      <div style={pagegrid}>
        <div style={question}>
          <h2 style={questionh2}>End of Quiz!</h2>
        </div>
        <div style={results}>
          <Results data={sessionData.current}/>
          <button onClick={(e) => {startOver(true)}}>Start Over</button>
        </div>
      </div>
    )
  }


}
