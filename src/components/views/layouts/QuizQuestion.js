import React, { useEffect } from 'react'
import Vexflow from '../Vexflow'
import AnswerChoice from '../buttons/AnswerChoice'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import {MegaPixelBorder} from './PixelBorder'
import {Bug} from '../buttons/Bug'
import {Universe, LunchBox, VFlex, HFlex, Grid} from './Grids'
import Theme from '../Theme'


const QuestionH5 = styled.h5`
  color: ${props => props.theme.colors.light};
  grid-row: 0 / span 1;
  align-self: end;
`
const ButtonBox = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-flow: row wrap;
  > * {
    margin: 2%;
  }
`

const MegaPixelBorderRow1 = styled.div`
  grid-row: 1 / span 1;
`

const QuestionVexFlowDiv = styled.div`
  display: grid;
  grid-template-rows: 100px auto 1fr;
  grid-row-gap: 10px;
  height: 100%
`

const VexFlowCenteringDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderDiv = styled.div`
  grid-area: header;
  align-self: end
`
const BodyDiv = styled.div`
  grid-area: body;
  align-self: stretch
`
const FooterDiv = styled.div`
  grid-area: footer;
  align-self: start
`


export default function QuizQuestion(props) {
  const sizedStyles = useResponsiveStyles()
  const { questionText, layoutQuiz, universeSizingQuiz } = sizedStyles
  const { chord, question, colors, handleClick, onKeyPressed, currentInput } = props
  const noteColors = question.type === 'Names' || question.type === 'Roots' ? colors.filter(input => input.color === 'green').map(input => input.input) : []

  useEffect(() => {
      window.scrollTo(0, 0)
  },[question])

  return (
    <Theme>
      <div style={{outline:'none'}}
        onKeyDown={(e) => onKeyPressed(e)}
        tabIndex="1"
        ref={keyboard => keyboard && keyboard.focus()}
        >
        <Universe style={universeSizingQuiz}>
          <LunchBox>
              <HeaderDiv>
                <QuestionH5 style={questionText}>{question.questionText}</QuestionH5>
              </HeaderDiv>
              <BodyDiv>
                <MegaPixelBorder>
                  <VexFlowCenteringDiv>
                    <Vexflow
                        notes={chord.current.notes}
                        octaves={chord.current.octaves}
                        clef={chord.current.clef}
                        keySig={chord.current.keySignature}
                        colors={noteColors}
                        />
                  </VexFlowCenteringDiv>
                </MegaPixelBorder>
              </BodyDiv>
              <FooterDiv>
                <ButtonBox>
                  {question.choices.map(choice => {
                    return (
                      <AnswerChoice
                        onClick={(e) => handleClick(choice.choice)}
                        choice={choice.choice}
                        key={choice.key}
                        keystroke={choice.key}
                        input={currentInput}
                        colors={colors}
                        />
                    )}
                  )}
                </ButtonBox>
              </FooterDiv>

          </LunchBox>
          <Bug />
        </Universe>
      </div>
    </Theme>

  )
}
