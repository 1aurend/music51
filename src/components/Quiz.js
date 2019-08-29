import React, { useEffect, useState, useRef, useContext } from 'react'
import Chord from './Chord'
import Choice from './Choice'
import Tally from './Tally'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import { Size, Rounds } from './Context'


export default function Quiz ({ data, round }) {

  const size = useContext(Size)
  const [rounds, updateRounds] = useContext(Rounds)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
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
    text: data[0].questions[0].questionText,
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
    let input
    console.log(key);

    switch (key) {
      case 'a':
      case 'b':
      case 'c':
      case 'e':
      case 'f':
      case 'g':
          key = key.toUpperCase()
          for (var i = 0; i < currentQ.choices.length; i++) {
            if (currentQ.choices[i].indexOf(key) >= 0) {
              input = currentQ.choices[i]
            }
          }
          break
      case 'd':
          switch (currentQ.questionText) {
            case 'Name the letter positions from lowest to highest.':
            case `What's the root note?`:
              key = key.toUpperCase()
              for (var i = 0; i < currentQ.choices.length; i++) {
                if (currentQ.choices[i].indexOf(key) >= 0) {
                  input = currentQ.choices[i]
                }
              }
              break
            case`What's the chord quality?`:
              if (currentChord.current.notes.length === 4) {
                input = currentQ.choices[4]
              }
              else {
                input = currentQ.choices[2]
              }
              break
            default:
              input = null
              break
          }
          break
      case 'M':
      case 'm':
      case '2':
      case '3':
      case '4':
      case '5':
          for (var i = 0; i < currentQ.choices.length; i++) {
            if (currentQ.choices[i].indexOf(key) >= 0) {
              input = currentQ.choices[i]
            }
          }
          break
      case '7':
      case 'r':
          input = currentQ.choices[0]
          break
      case 'A':
          for (var i = 0; i < currentQ.choices.length; i++) {
            if (currentQ.choices[i].indexOf('+') >= 0) {
              input = currentQ.choices[i]
            }
          }
          break
      case 'h':
          for (var i = 0; i < currentQ.choices.length; i++) {
            if (currentQ.choices[i].indexOf('ø') >= 0) {
              input = currentQ.choices[i]
            }
          }
          break
      default:
          input = null
          break
    }

    answer.current.tries = [...answer.current.tries, {'input': input, type: 'keypress'}]
    checkInput(input)
  }

  function checkInput(input) {

    if (!endOfQ) {
      nextInput(input)
      if (currentQ.answers[subQ.current.answers.length].includes(input)) {

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
            text: data[roundData.current.length].questions[chord.current.questions.length].questionText,
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
              text: data[roundData.current.length].questions[0].questionText,
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
      return (
        <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
          <Row noGutters style={{paddingTop: '5%'}}></Row>
          <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
            <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>{currentQ.questionText}</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '3%'}}>
                <Chord notes={currentChord.current.notes} octaves={currentChord.current.octaves} clef={currentChord.current.clef} keySig={currentChord.current.keySignature} colors={noteColors} size={size.width} />
              </Row>
            </Col>
          </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}} noGutters>
                <Col sm='12' lg='8' style={{marginLeft: '5%', marginRight: '5%'}}>
                  <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
                  {currentQ.choices.map(choice => {
                    return (
                    <Choice onClick={(e) => handleClick(e, choice)} choice={choice} key={choice} input={currentInput} red={red} green={green} />)})}
                  </Row>
                </Col>
            </Row>
            <div onKeyDown={(e) => onKeyPressed(e)} tabIndex="1" ref={keyboard => keyboard && keyboard.focus()}></div>
        </Container>

      )
  }
  else if (roundData.current.length === data.length) {
        return (
          <Tally round={round} data={roundData.current}/>
        )
    }


}
