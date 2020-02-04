import React, { useEffect } from 'react'
import Vexflow from '../Vexflow'
import AnswerChoice from '../buttons/AnswerChoice'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

// TODO: add styled-components
export default function QuizQuestion(props) {
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, questionText } = sizedStyles
  const { chord, question, colors, handleClick, onKeyPressed, currentInput } = props
  const noteColors = question.type === 'Names' || question.type === 'Roots' ? colors.filter(input => input.color === 'green').map(input => input.input) : []

  useEffect(() => {
      window.scrollTo(0, 0)
  },[question])

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row noGutters style={{paddingTop: '5%'}}></Row>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '7%', marginRight: '7%', marginTop: '5%'}}><h2 style={questionText}>{question.questionText}</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '3%'}}>
            <Vexflow notes={chord.current.notes} octaves={chord.current.octaves} clef={chord.current.clef} keySig={chord.current.keySignature} colors={noteColors} />
          </Row>
        </Col>
      </Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}} noGutters>
            <Col sm='12' lg='8' style={{marginLeft: '5%', marginRight: '5%'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
              {question.choices.map(choice => {
                return (
                <AnswerChoice onClick={(e) => handleClick(choice.choice)} choice={choice.choice} key={choice.key} keystroke={choice.key} input={currentInput} colors={colors} />)})}
              </Row>
            </Col>
        </Row>
        <div onKeyDown={(e) => onKeyPressed(e)} tabIndex="1" ref={keyboard => keyboard && keyboard.focus()}></div>
    </Container>

  )
}
