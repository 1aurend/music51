import React, { useEffect, useState, useRef, useContext } from 'react'
import Tally from '../actions/Tally'
import { Rounds } from '../Context'
import QuizQuestion from '../views/QuizQuestion'


export default function Quiz ({ data, round }) {
  const [rounds, updateRounds] = useContext(Rounds)
  const [currentQ, nextQ] = useState(data[0].questions[0])
  const [endOfQ, doneQ] = useState(false)
  const [noteColors, addColor] = useState([])
  const [red, turnRed] = useState(false)
  const [green, turnGreen] = useState([])
  const [currentInput, nextInput] = useState(null)
  const currentChord = useRef(data[0])


  const roundData = useRef([])

  const chord = useRef({
    chord: data[0].notes, //placeholder until DF gives me a unique id
    questions: []
  })

  const subQ = useRef({
    type: data[0].questions[0].type,
    answers: []
  })

  const answer = useRef({
    answer: data[0].questions[0].answers[0],
    tries: [],
    startTime: Date.now(),
    endTime: '',
    elapsedTime: '',
  })


  function handleClick(e, input) {

    answer.current.tries = [...answer.current.tries, {'input': input, type: 'click'}]
    checkInput(input)
  }

  function onKeyPressed(e) {

    let key = e.key
    let input = null
    console.log(key);

    for (var i = 0; i < currentQ.choices.length; i++) {
      if (key === currentQ.choices[i].key) {
        input = currentQ.choices[i].choice
      }
    }

    if (input !== null) {
      answer.current.tries = [...answer.current.tries, {'input': input, type: 'keypress'}]
    }
    console.log(answer.current.tries);
    checkInput(input)
  }

  function checkInput(input) {

    if (!endOfQ) {
      nextInput(input)
      if (input === null) {
        console.log('null input')
      }
      else if (currentQ.answers[subQ.current.answers.length] === input) {

      answer.current.endTime = Date.now()
      answer.current.elapsedTime = (answer.current.endTime-answer.current.startTime)/1000
      subQ.current.answers.push(answer.current)
      answer.current = {
        answer: data[roundData.current.length].questions[chord.current.questions.length].answers[subQ.current.answers.length],
        tries: [],
        startTime: Date.now(),
        endTime: '',
        elapsedTime: '',
      }
      if (subQ.current.answers.length === currentQ.answers.length) {
        addColor([...noteColors, input])
        turnRed(false)
        turnGreen([...green, input])
        chord.current.questions.push(subQ.current)
        // console.log('next Q: ' + chord.current.questions.length);
        doneQ(true)
      }
      else {
        addColor([...noteColors, input])
        turnRed(false)
        turnGreen([...green, input])
      }
    }
    else {
      turnRed(true)
    }}
  }

  useEffect(() => {

    if (endOfQ === true) {
      setTimeout(() => {
        addColor([])
        turnRed(false)
        turnGreen([])
        nextInput(null)
        if (chord.current.questions.length < currentChord.current.questions.length) {
          subQ.current = {
            type: data[roundData.current.length].questions[chord.current.questions.length].type,
            answers: []
          }
          answer.current = {
            answer: data[roundData.current.length].questions[chord.current.questions.length].answers[0],
            tries: [],
            startTime: Date.now(),
            endTime: '',
            elapsedTime: '',
          }
          nextQ(currentChord.current.questions[chord.current.questions.length])
          doneQ(false)
        }
        else {
          roundData.current= [...roundData.current, chord.current]
          if (roundData.current.length < data.length) {
            chord.current = {
              chord: data[roundData.current.length].notes,
              questions: []
            }
            answer.current = {
              answer: data[roundData.current.length].questions[0].answers[0],
              tries: [],
              startTime: Date.now(),
              endTime: '',
              elapsedTime: '',
            }
            subQ.current = {
              type: data[roundData.current.length].questions[0].type,
              answers: []
            }
            currentChord.current = data[roundData.current.length]
            nextQ(currentChord.current.questions[0])
            doneQ(false)
          }
          else {
            updateRounds({...rounds, [round]: roundData.current})
            // doneQ(false)
          }
        }
      }, 1000)
    }

  }, [endOfQ])


  if (roundData.current.length < data.length) {
      return <QuizQuestion chord={currentChord} question={currentQ} noteColors={noteColors} red={red} green={green} handleClick={handleClick} onKeyPressed={onKeyPressed} currentInput={currentInput}  />
  }
  else if (roundData.current.length === data.length) {
        return (
          <Tally round={round} data={roundData.current}/>
        )
    }


}
