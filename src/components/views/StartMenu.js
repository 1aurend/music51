import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import Options from './Options'
import Go from './Go'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.marginTop || 0};
  margin-bottom: ${props => props.marginBottom || 0};
`
const StyledCenterPane = styled(Col)`
  border: 5px solid black;
  border-radius: 1rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  background-color: #e5e6eb;
`

export default function StartMenu({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const {chordCrusher, music51, beta, input} = sizedStyles
  return (
    <Container fluid className="main-content-container px-4" style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row noGutters style={{paddingTop: '3%'}}></Row>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <StyledCenterPane sm='12' lg='8'>
          <StyledRow marginTop='5%'>
            <h1 style={chordCrusher}>{title.headline}</h1>
          </StyledRow>
          <StyledRow>
            <h2 style={beta}>Roman Numerals Mode</h2>
          </StyledRow>
          <StyledRow>
            <h2 style={beta}>{title.beta}</h2>
          </StyledRow>
          <StyledRow marginBottom='2%'>
            <h2 style={music51}>{title.subtitle}</h2>
          </StyledRow>
          <StyledRow>
            <h4 style={{fontFamily: "'Overpass Mono', monospace", fontWeight: '600', marginBottom: '0'}}>INSTRUCTIONS</h4>
          </StyledRow>
          <StyledRow>
            <p style={{fontFamily: "'Overpass Mono', monospace", marginBottom: '0', textAlign: 'left'}}>
              In a session of Chord Crusher, you'll complete multiple rounds; see if you can improve your time and accuracy on each round. You can set rounds from 5-25 chords in length. For each chord, there are four questions that aggregate to name the chord, quality, and inversion. If this is your first time, try 5 chords per round. After that, choose as many as you want!</p>
          </StyledRow>
          <Options checked={options} onChange={(e) => {numQs.current = e.target.value}} onCheck={onCheck} size={input}/>
        </StyledCenterPane>
      </Row>
      <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%', paddingBottom: '5%'}} noGutters>
        <Go onClick={generateQuiz}/>
      </Row>
    </Container>
  )
}
