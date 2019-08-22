import React, { useState, useRef, useContext } from 'react'
import Options from './Options.js'
import Go from './Go.js'
import Quiz from './Quiz'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import generateChords from '../chordGenerator'
import { Size } from './Context'




export default function Start({title}) {

  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '3em'} : {textAlign: 'center', fontSize: '2.5em'}
  let subtitleStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  const numQs = useRef(10)
  const [ready, launchQuiz] = useState(false)
  const userId = useRef('somebody')
  const sessionId = useRef(Date.now())
  const [quiz, setQuiz] = useState([])
  const [options, updateOptions] = useState({
    chordTypes: {triads:true, sevenths:true},
    roots: {common:true, any:false}
  })

  let generateQuiz = (e) => {
      setQuiz(generateChords(numQs.current))
      launchQuiz(true)
  }

  let onCheck = (e, type, option) => {

    let prev
    let next

    switch (type) {
      case 'chord':
          prev = options.chordTypes
          next = {...prev, [option]: !prev[option]}
          updateOptions({...options, chordTypes: next })
          break
      case 'root':
          prev = options.roots
          next = {...prev, [option]: !prev[option]}
          updateOptions({...options, roots: next })
          break
      default: alert('something went wrong selecting options')

    }

  }

  console.log(JSON.stringify(options, null, 4));


  if (!ready) {
    return (
      <Container fluid className="main-content-container px-4" style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row noGutters style={{paddingTop: '5%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h1 style={fontStyle}>{title.headline}</h1></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={subtitleStyle}>{title.subtitle}</h2></Row>
            <Options checked={options} onChange={(e) => {numQs.current = e.target.value}} onCheck={onCheck} text={title.text}/>
          </Col>
        </Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%', paddingBottom: '5%'}} noGutters>
            <Go onClick={generateQuiz}/>
        </Row>
      </Container>
    )
  }
  else if (ready) {
    return (
        <Quiz data={quiz} userId={userId.current} sessionId={sessionId.current} />
    )
  }


}
