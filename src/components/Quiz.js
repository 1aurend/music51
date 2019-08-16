import React, { useEffect, useState, useRef } from 'react'
import Chord from './ChordAT'
import Choice from './Choice'
import Results from './Results'
import QuizContainer from './QuizContainer'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'


export default function Quiz (props) {

  const [currentQ, nextQ] = useState(props.data[0].questions[0])
  const [endOfQ, doneQ] = useState(false)
  const [reset, startOver] = useState(false)
  const [noteColors, addColor] = useState([])
  const [incorrectTry, turnRed] = useState(false)
  const [currentInput, nextInput] = useState(null)
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })
  const currentChord = useRef(props.data[0])
  const [progress, showProgress] = useState(false)

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


  function handleClick(input) {

    answer.current.tries = [...answer.current.tries, {'input': input, type: 'click'}]
    nextInput(input)
    checkInput(input)
  }

  function onKeyPressed(e) {

    let key = e.key
    let input = key.toUpperCase() //add function here for mapping keyboard input
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


  useEffect(() => {
    const handleResize = () => setSize({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
  }
  },[])

  let calculateBorderRadius = () => {
    if (size.width > 1000) {
      if (size.width > size.height) {
        return (`3%/${(size.width/size.height)*3}%`)
      }
      else {
        return(`${(size.width/size.height)*3}%/3%`)
      }
    }
    else if (size.width < 1000 && size.width > 500) {
      if (size.width > size.height) {
        return (`7%/${(size.width/size.height)*4}%`)
      }
      else {
        return(`${(size.width/size.height)*4}%/7%`)
      }
    }
    else {
      if (size.width > size.height) {
        return (`7%/${(size.height/size.width)*3}%`)
      }
      else {
        return(`${(size.height/size.width)*3}%/7%`)
      }
    }
  }
  const borderRadius = calculateBorderRadius().toString()
  console.log(borderRadius);


  if (reset) {
    return <QuizContainer /> //this is hacky...circular prop passing... figure out how often we want to fetch new data and where to really store it
  }

  if (sessionData.current.results.length < props.data.length) {
      return (
        <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
          <Row noGutters style={{paddingTop: '5%'}}></Row>
          <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
            <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={{textAlign: 'center'}}>{currentQ.questionText}</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                <Chord notes={currentChord.current.notes} octaves={currentChord.current.octaves} clef={currentChord.current.clef} colors={noteColors} size={size.width} />
              </Row>
            </Col>
          </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}} noGutters>
                <Col sm='12' lg='8' style={{marginLeft: '5%', marginRight: '5%'}}>
                  <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
                  {currentQ.choices.map(choice => {
                    return (
                    <Choice onClick={() => handleClick(choice)} choice={choice} key={choice} input={currentInput} red={incorrectTry} />)})}
                  </Row>
                </Col>
            </Row>
            <div onKeyDown={(e) => onKeyPressed(e)} tabIndex="1" ref={keyboard => keyboard && keyboard.focus()}></div>
        </Container>

      )
  }
  else if (sessionData.current.results.length === props.data.length) {
      return (
        <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
          <Row noGutters style={{paddingTop: '5%'}}></Row>
          <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
            <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={{textAlign: 'center'}}>Session Complete!</h2></Row>
                <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                  <Col sm='12' lg='8'><Results data={sessionData.current} progress={progress}/></Col>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                  <Button style={{marginRight: '5%'}} theme='success' onClick={(e) => {startOver(true)}}>Keep Going</Button>
                  <Button style={{marginLeft: '5%'}} theme='success' onClick={(e) => {showProgress(true)}}>Check My Progress</Button>
                </Row>
              </Col>
            </Row>
        </Container>
    )
  }


}
