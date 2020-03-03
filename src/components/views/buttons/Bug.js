import React from 'react'
import bugSvg from '../../../assets/bug.svg'
import bubbleSvg from '../../../assets/bubble.svg'
import styled from 'styled-components'

const formLink = 'https://forms.gle/qwFKMPGCG12vo8xM6'

const BugWrapper = styled.div`
  display: grid;
  grid-template-rows:  auto 25px;
  grid-template-columns: 25px;
  grid-area: bug;
  padding-bottom: 0;
  position: absolute;
  bottom: 16px;
  right: 12px;
`

const StyledButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  grid-column: 1/1;
  grid-row: 2/2;
`

const StyledCaption = styled.div`
  display: block;
  color:${props => props.theme.colors.secondary};
  grid-column: 1/1;
  grid-row: 1/1;
  > h4 {
    color: inherit;
    font-family : 'Thintel', monospace;
    font-size: 20px;
    text-align: center;
    letter-spacing: 1px;
    margin: -8px;
  }
`

export function Bug({ onClick }) {
  return (
    <BugWrapper>
      <StyledButton onClick={onClick}>
        <a href={formLink} alt='Bug Report Google Form' target="_blank" rel="noopener noreferrer">
          <img src={bugSvg} alt='report bugs' style={{width: '25px', transform:'rotate(300deg)'}}/>
        </a>
      </StyledButton>
    </BugWrapper>
  )
}

export function BugWithSpeechBubble({ onClick }) {
  return (
    <BugWrapper>
        <StyledCaption onClick={onClick}
          ><h4>BUGS?</h4>
        </StyledCaption>
        <StyledButton onClick={onClick}>
          <a href={formLink} alt='Bug Report Google Form' target="_blank" rel="noopener noreferrer">
            <img src={bugSvg} alt='report bugs' style={{width: '25px', transform:'rotate(300deg)'}}/>
          </a>
        </StyledButton>
    </BugWrapper>
  )
}
