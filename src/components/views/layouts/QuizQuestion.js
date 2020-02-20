import React, { useEffect } from 'react'
import Vexflow from '../Vexflow'
import AnswerChoice from '../buttons/AnswerChoice'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from './PixelBorder'
import Marquee from './Marquee'
import {Bug} from '../buttons/Bug'
import {Grid, Cell, SubCell, BugWrapper} from './Grids'
import Theme from '../Theme'


const QuestionH4 = styled.h4`
  color: ${props => props.theme.colors.light};
  padding: 0 5% 5% 5%;
`
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  > * {
    margin: 2%;
  }
`

const VexFlowCenteringDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function QuizQuestion(props) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, gridMarquee, gridMain, gridMisc, rowOrCol} = sizedStyles
  const { chord, question, colors, handleClick, onKeyPressed, currentInput } = props
  const noteColors = question.type === 'LETTER_NAMES' || question.type === 'ROOT' ? colors.filter(input => input.color === 'green').map(input => input.input) : []

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
        <Grid>
          <Cell style={gridMarquee}>
            <QuestionH4 style={h4}>{question.questionText}</QuestionH4>
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
          </Cell>
          <Cell style={gridMisc}>
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
          </Cell>
          <BugWrapper>
            <Bug />
          </BugWrapper>
        </Grid>
      </div>
    </Theme>

  )
}
