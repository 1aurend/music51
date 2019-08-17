import React, { useState, useRef } from 'react'
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


export default function Start(props) {

  const numQs = useRef(1) //needs to be set to 10?
  const [ready, launchQuiz] = useState(false)
  const userId = useRef('somebody')
  const sessionId = useRef(Date.now())
  const [quiz, setQuiz] = useState([])
  const [options, updateOptions] = useState({
    chordTypes: {triads:true, sevenths:true},
    roots: {common:true, any:false}
  })
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })


  let generateQuiz = (e) => {

    // let qs = []
    // for (var i = 0; i < numQs.current; i++) {
    //   qs.push(props.data[i])
    // }
    //   // qs = [...qs, generateChords()]
    //   setQuiz(qs)
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

  let calculateBorderRadius = () => {
    if (size.width > 500) {
      if (size.width > size.height) {
        return (`2rem`)
      }
      else {
        return(`2rem`)
      }
    }
    else {
      if (size.width > size.height) {
        return (`1rem`)
      }
      else {
        return(`1rem`)
      }
    }
  }
  const borderRadius = calculateBorderRadius().toString()
  console.log(borderRadius);



  if (!ready) {
    return (
      <Container fluid className="main-content-container px-4" style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row noGutters style={{paddingTop: '5%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h1 style={{textAlign: 'center'}}>Music 51</h1></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={{margin: 'auto', textAlign: 'center'}}>Chord Identification</h2></Row>
            <Options checked={options} onChange={(e) => {numQs.current = e.target.value}} onCheck={onCheck}/>
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
