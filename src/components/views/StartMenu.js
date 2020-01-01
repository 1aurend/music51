import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import Options from '../Options'
import Go from '../Go'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'


export default function StartMenu({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const {borderRadius, chordCrusher, music51, beta, input} = sizedStyles

  return (
    <Container fluid className="main-content-container px-4" style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row noGutters style={{paddingTop: '3%'}}></Row>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h1 style={chordCrusher}>{title.headline}</h1></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={beta}>Roman Numerals Mode</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}><h2 style={beta}>{title.beta}</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '2%'}}><h2 style={music51}>{title.subtitle}</h2></Row>
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
