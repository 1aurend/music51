import React from 'react'
import bugSvg from '../../../assets/bug.svg'
import bubbleSvg from '../../../assets/bubble.svg'
import styled from 'styled-components'

const formLink = 'https://forms.gle/qwFKMPGCG12vo8xM6'

const BugWrapper = styled.div`
  display: grid;
  grid-template-rows:  50px auto;
  grid-template-columns: auto 50px 50px;
  padding-bottom: 5%;
  position: absolute;
  bottom: 5%;
  right: 5%;
`

const StyledButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  grid-column: 3/3;
  grid-row: 2/2;
`

const StyledBubbleDiv = styled.div`
  display: block;
  color:${props => props.theme.colors.tertiary};
  padding: 5px;
  grid-column: 2/2;
  grid-row: 1/1;
  background-repeat: no-repeat;
  background-size: cover;
  > h4 {
    color: inherit;
    font-family : 'Thintel', monospace;
    font-size: 22px;
    text-align: center;
    padding: 2px;
    font-weight: 600;
  }
`

export function Bug({ onClick }) {
  return (
    <BugWrapper>
      <StyledButton onClick={onClick}>
        <a href={formLink} alt='Bug Report Google Form'>
          <img src={bugSvg} alt='report bugs' style={{width: '50px', transform:'rotate(300deg)'}}/>
        </a>
      </StyledButton>
    </BugWrapper>
  )
}

export function BugWithSpeechBubble({ onClick }) {
  return (
    <BugWrapper>
      <StyledBubbleDiv
        onClick={onClick}
        style={{backgroundImage: `url(${bubbleSvg})`}}
        ><h4>BUGS?</h4>
      </StyledBubbleDiv>
      <StyledButton onClick={onClick}>
        <a href={formLink} alt='Bug Report Google Form'>
          <img src={bugSvg} alt='report bugs' style={{width: '50px', transform:'rotate(300deg)'}}/>
        </a>
      </StyledButton>
    </BugWrapper>
  )
}
