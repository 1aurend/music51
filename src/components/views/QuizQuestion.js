import React from 'react'
import Chord from '../Chord'
import Choice from '../Choice'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'



export default function QuizQuestion(props) {
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, questionText } = sizedStyles
  const { chord, question, noteColors, red, green, handleClick, onKeyPressed, currentInput } = props

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row noGutters style={{paddingTop: '5%'}}></Row>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '7%', marginRight: '7%', marginTop: '5%'}}><h2 style={questionText}>{question.questionText}</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '3%'}}>
            <Chord notes={chord.current.notes} octaves={chord.current.octaves} clef={chord.current.clef} keySig={chord.current.keySignature} colors={noteColors} />
          </Row>
        </Col>
      </Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}} noGutters>
            <Col sm='12' lg='8' style={{marginLeft: '5%', marginRight: '5%'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
              {question.choices.map(choice => {
                return (
                <Choice onClick={(e) => handleClick(e, choice.choice)} choice={choice.choice} key={choice.key} keystroke={choice.key} input={currentInput} red={red} green={green} />)})}
              </Row>
            </Col>
        </Row>
        <div onKeyDown={(e) => onKeyPressed(e)} tabIndex="1" ref={keyboard => keyboard && keyboard.focus()}></div>
    </Container>

  )
}
