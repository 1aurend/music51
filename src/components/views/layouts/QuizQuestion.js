import React, { useEffect } from 'react'
import Vexflow from '../Vexflow'
import AnswerChoice from '../buttons/AnswerChoice'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from './PixelBorder'
import Marquee from './Marquee'
import {Grid, Cell, SubCell} from './Grids'
import Theme from '../Theme'


const StyledCenterPane = styled(Col)`
  border: 5px solid red;
  border-radius: 1rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  background-color: #e5e6eb;
`
const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: ${props => props.marginleft || '5%'};
  margin-right: ${props => props.marginright || '5%'};
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
`
const QuestionH4 = styled.h4`
  color: ${props => props.theme.colors.light};
`
const ButtonBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  > * {
    margin: 2%;
  }
`


export default function QuizQuestion(props) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, gridMarquee, gridMain, gridMisc, rowOrCol} = sizedStyles
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
        <Grid>
          <Cell style={gridMain}>
              <QuestionH4 style={h4}>{question.questionText}</QuestionH4>
          </Cell>
          <Cell style={gridMarquee}>
            <MegaPixelBorder>
              <Vexflow
                      notes={chord.current.notes}
                      octaves={chord.current.octaves}
                      clef={chord.current.clef}
                      keySig={chord.current.keySignature}
                      colors={noteColors}
                      />
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
        </Grid>
      </div>
    </Theme>
    // <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
    //   <Row style={{display: 'flex', justifyContent: 'center', paddingTop: '4%'}} noGutters>
    //     <StyledCenterPane sm='12' lg='8'>
    //       <StyledRow marginleft='7%' marginright='7%' margintop='5%'>
    //         <h2 style={questionText}>{question.questionText}</h2>
    //       </StyledRow>
    //       <StyledRow marginbottom='5%' margintop='3%'>
    //         <Vexflow
    //           notes={chord.current.notes}
    //           octaves={chord.current.octaves}
    //           clef={chord.current.clef}
    //           keySig={chord.current.keySignature}
    //           colors={noteColors}
    //           />
    //       </StyledRow>
    //     </StyledCenterPane>
    //   </Row>
    //     <StyledRow margintop='2%' marginleft='0' marginright='0' noGutters>
    //       <Col sm='12' lg='8' style={{marginLeft: '5%', marginRight: '5%'}}>
    //         <StyledRow margintop='2%' marginleft='0' marginright='0'>
    //           {question.choices.map(choice => {
    //             return (
    //               <AnswerChoice
    //                 onClick={(e) => handleClick(choice.choice)}
    //                 choice={choice.choice}
    //                 key={choice.key}
    //                 keystroke={choice.key}
    //                 input={currentInput}
    //                 colors={colors}
    //                 />
    //             )}
    //           )}
    //         </StyledRow>
    //       </Col>
    //     </StyledRow>
    //     <div
    //       onKeyDown={(e) => onKeyPressed(e)}
    //       tabIndex="1"
    //       ref={keyboard => keyboard && keyboard.focus()}
    //       >
    //     </div>
    // </Container>

  )
}
