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
  let borderRadius = size.width > 500 ? '1rem' : '1rem'
  let fontStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em', lineHeight: '1.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.25em', lineHeight: '1.25'}
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

    let questionStrings = {
      NAMES: `Name the letter positions from lowest to highest.`,
      ROOT: `What's the root note?`,
      DEGREE: {
        MAJOR: `In a major key, what degree is this chord built on?`,
        MINOR: `In a minor key, what degree is this chord built on?`,
      },
      QUALITY: "What's the chord's quality?",
      NUMERAL: `Which roman numeral describes this chord?`,
      INVERSION: `What's the inversion?`
    }



    switch(currentQ.questionText) {

      case questionStrings.NAMES:
      case questionStrings.ROOT:
          switch (key) {
            case 'a':
            case 'b':
            case 'c':
            case 'd':
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
            default:
              input = null
              break
            }
            break

      case questionStrings.DEGREE.MAJOR:
      case questionStrings.DEGREE.MINOR:
          switch (key) {
              case '1':
              case '2':
              case '3':
              case '4':
              case '5':
              case '6':
              case '7':
                  for (var i = 0; i < currentQ.choices.length; i++) {
                    if (currentQ.choices[i].indexOf(key) >= 0) {
                      input = currentQ.choices[i]
                    }
                  }
                  break
          default:
            input = null
            break
                }
                break

      case questionStrings.QUALITY:
          switch (key) {
              case 'm':
              case 'M':
                  for (var i = 0; i < currentQ.choices.length; i++) {
                    if (currentQ.choices[i].indexOf(key) >= 0) {
                      input = currentQ.choices[i]
                    }
                  }
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
              case 'd':
                  for (var i = 0; i < currentQ.choices.length; i++) {
                    if (currentQ.choices[i].indexOf('o') >= 0) {
                      input = currentQ.choices[i]
                    }
                  }
                  break
            default:
              input = null
              break
                }
                break

        case questionStrings.NUMERAL:
            switch (key) {
                case '7':
                case 'M':
                    input = currentQ.choices[0]
                    break
                case 'm':
                    input = currentQ.choices[1]
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
                case 'd':
                    for (var i = 0; i < currentQ.choices.length; i++) {
                      if (currentQ.choices[i].indexOf('o') >= 0) {
                        input = currentQ.choices[i]
                      }
                    }
                    break
              default:
                input = null
                break
                  }
                  break

      case questionStrings.INVERSION:
          switch (key) {
              case '2':
              case '3':
              case '5':
                  for (var i = 0; i < currentQ.choices.length; i++) {
                    if (currentQ.choices[i].indexOf(key) >= 0) {
                      input = currentQ.choices[i]
                    }
                  }
                  break
              case '4':
                  for (var i = 0; i < currentQ.choices.length; i++) {
                    if (currentQ.choices[i].indexOf('64') >= 0) {
                      input = currentQ.choices[i]
                    }
                  }
                  break
              case '7':
              case 'r':
                  input = currentQ.choices[0]
                  break
              default:
                input = null
                break
            }
            break

            default:
              input = null
              break
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
      else if (currentQ.answers[subQ.current.answers.length].includes(input)) {

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
        <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
          <Row noGutters style={{paddingTop: '5%'}}></Row>
          <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
            <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '7%', marginRight: '7%', marginTop: '5%'}}><h2 style={fontStyle}>{currentQ.questionText}</h2></Row>
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
