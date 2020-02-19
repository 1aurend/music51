import React from 'react'
import { Button } from 'shards-react'
import bugSvg from '../../../assets/bug.svg'
import bubbleSvg from '../../../assets/bubble.svg'
import styled from 'styled-components'


const StyledSvgButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  :hover {
    background:transparent;
  }
  grid-column: 2/2;
  grid-row: 2/2;
`

const StyledSvgBubbleDiv = styled.div`
  display: block;
  color:${props => props.theme.colors.tertiary};
  cursor: pointer;
  padding: 0;
  background: transparent;
  :hover {
    background:transparent;
  }
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
    <>
      <StyledSvgButton
        onClick={onClick}
        >
        <img src={bugSvg} alt='report bugs' style={{width: '50px', transform:'rotate(300deg)'}}/>
      </StyledSvgButton>
    </>
  )
}

export function SpeechBubble({ onClick }) {
  return (
    <>
      <StyledSvgBubbleDiv
        onClick={onClick}
        style={{backgroundImage: `url(${bubbleSvg})`}}
        ><h4>BUGS?</h4>
      </StyledSvgBubbleDiv>
    </>
  )
}
