import React from 'react'
import styled from 'styled-components'
import {ButtonBorder} from '../layouts/PixelBorder'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

// &:hover {
//   background-color: ${props => props.theme.colors.primary};
// }
const StyledChoiceButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  margin: 3px;
  background-color: ${props => props.color};
  min-height: ${props => props.buttonSize};
  min-width: ${props => props.buttonSize};
  text-align: center;
  padding: 12px 12px 0 12px;
  > span, h4, div {
    color: ${props => props.theme.colors.dark} !important;
    font-family: 'Asap Condensed SemiBold', Arial, Sans-Serif;
    margin-bottom: -3px;
  }
`

const StyledKeystrokeSymbol = styled.p`
  font-family: 'Thintel', monospace;
  font-size: 26px;
  color: ${props => props.theme.colors.tertiary};
  margin: 0;
`

const StyledChoice = styled.h4`

`


export default function AnswerChoice({ choice, keystroke, input, colors, onClick }) {
  const sizedStyles = useResponsiveStyles()
  const {answerChoiceSize, answerTextSize, supPosition, subPosition} = sizedStyles
  const background = (() => {
    const thisInput = colors[colors.length-1]
    const greens = colors.filter(input => input.color === 'green').map(input => input.input)
    if (colors.length > 0 && thisInput.color === 'red' && thisInput.input === choice) {
      return '#FF3863'
    } else if (greens.includes(choice)) {
      return '#26AD5E'
    }
    return '#FFFFFF'
  })()

  function formatButtonText(choice) {
    // FIXME: (James) This is quite a hack. Do this in a more structured manner.
    if (choice === 'N6') {
      return (
        <span>
        {'N'}
          <span style={{postion: 'absolute'}}>
            <sup style={{display:'inline-block', position:'relative', left:'0px', top:'-17px'}}>
              {'6'}
            </sup>
          </span>
        </span>
      )
    } else if (['It+6', 'Fr+6', 'Ger+6'].includes(choice)) {
      return (
        <span>
        {choice.slice(0,-2)}
          <span style={{postion: 'absolute'}}>
            <sup style={{display:'inline-block', position:'relative', left:'0px', top:'-17px'}}>
              {'+6'}
            </sup>
          </span>
        </span>
      )
    } else if (choice.includes('^')) {
      return (
        <span style={answerTextSize}>
          &nbsp;{choice.charAt(0)}
          <sup style={supPosition}>
            ^
          </sup>
        </span>
      )
    } else if (choice.includes('6') || choice.includes('4')) {
      return (
        <span style={answerTextSize}>
        {choice.slice(0,-2)}
          <span style={{postion: 'absolute'}}>
            <sup style={{display:'inline-block', position:'relative', left:'0px', top:'-17px'}}>
              {choice.charAt(choice.length-2)}
            </sup>
            <sub style={subPosition}>
              {choice.charAt(choice.length-1)}
            </sub>
          </span>
        </span>
      )
    }
    return <StyledChoice style={answerTextSize}>{choice}</StyledChoice>
  }
  const formattedChoice = formatButtonText(choice)

  return (
    <ButtonBorder>
      <StyledChoiceButton
        color={background}
        onClick={onClick}
        buttonSize={answerChoiceSize}
        >
          {formattedChoice}
          <StyledKeystrokeSymbol>
            [ {keystroke} ]
          </StyledKeystrokeSymbol>
      </StyledChoiceButton>
    </ButtonBorder>
  )
}
