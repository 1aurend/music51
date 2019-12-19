import React, { useState, useRef, useContext } from 'react'
import Options from './Options.js'
import Go from './Go.js'
import Quiz from './Quiz'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import generateChords from '../chordGenerator'
import { Size, Session, Means } from './Context'
import useWindowSize from '../hooks/useWindowSize'




export default function Start({ title, round }) {

  const sizedStyles = useWindowSize()
  const {border, mainTitle, subtitle, beta, input} = sizedStyles
  const [session, updateSession] = useContext(Session)
  const [means, updateMeans] = useContext(Means)
  const numQs = useRef(5)
  const [ready, launchQuiz] = useState(false)
  const [quiz, setQuiz] = useState([])
  const [options, updateOptions] = useState({
    chordTypes: {triads:true, sevenths:true},
    roots: {common:true, any:false}
  })

  let generateQuiz = async (e) => {

      let data = await generateChords(numQs.current, options)

      setQuiz(data)

      let chordTypes
      if (options.chordTypes.triads && options.chordTypes.sevenths) {
        chordTypes= ['triads', 'sevenths']
      }
      else if (options.chordTypes.triads && !options.chordTypes.sevenths) {
        chordTypes= ['triads']
      }
      else if (!options.chordTypes.triads && options.chordTypes.sevenths) {
        chordTypes= ['sevenths']
      }
      let settings = {
        numChords: numQs.current,
        chordTypes: chordTypes,
        roots: options.roots.common ? 'common' : 'any',
        options: options
      }
      updateSession({...session, settings: settings })

      let questionTypes = {}
      data[0].questions.map(question => {
        questionTypes = {...questionTypes, [question.type]: {
                            attempts: [],
                            times: []
                          }}
        return null
      })
      updateMeans(questionTypes)

      launchQuiz(true)
  }

  let onCheck = (e, type, option) => {

    let prev
    let next

    switch (type) {
      case 'chord':
          prev = options.chordTypes
          switch (prev[option]) {
            case false:
              console.log('case false');
                next = {...prev, [option]: !prev[option]}
                updateOptions({...options, chordTypes: next })
                break
            case true:
              console.log('case true');
                if (prev.triads === prev.sevenths) {
                  console.log('same');
                  next = {...prev, [option]: !prev[option]}
                  updateOptions({...options, chordTypes: next })
                }
                else {
                  console.log('different');
                  next = {triads:!prev.triads, sevenths:!prev.sevenths}
                  console.log('here is next: ' + JSON.stringify(next));
                  updateOptions({...options, chordTypes: next })
                }
                break
            default: alert('something went wrong selecting options')
          }
          break
      case 'root':
          // prev = options.roots
          // next = {common: !prev.common, any: !prev.any}
          // updateOptions({...options, roots: next })
          break
      default: alert('something went wrong selecting options')

    }

  }

  // console.log(JSON.stringify(options, null, 4));


  if (!ready) {
    return (
      <Container fluid className="main-content-container px-4" style={{backgroundColor: 'black', minHeight: '120vh'}}>
        <Row noGutters style={{paddingTop: '3%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: border, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h1 style={mainTitle}>{title.headline}</h1></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={beta}>Roman Numerals Mode</h2></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={beta}>{title.beta}</h2></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '2%'}}><h2 style={subtitle}>{title.subtitle}</h2></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h4 style={{fontFamily: "'Overpass Mono', monospace", fontWeight: '600', marginBottom: '0'}}>INSTRUCTIONS</h4></Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '10%', marginRight: '10%', marginBottom: '5%'}}><p style={{fontFamily: "'Overpass Mono', monospace", marginBottom: '0', textAlign: 'left'}}>In a session of Chord Crusher, you'll complete multiple rounds; see if you can improve your time and accuracy on each round. You can set rounds from 5-25 chords in length. For each chord, there are four questions that aggregate to name the chord, quality, and inversion. If this is your first time, try 5 chords per round. After that, choose as many as you want!</p></Row>
            <Options checked={options} onChange={(e) => {numQs.current = e.target.value}} onCheck={onCheck} size={input}/>
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
        <Quiz data={quiz} round={round}/>
    )
  }


}
