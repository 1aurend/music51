import React from 'react'
import { Button } from 'shards-react'
import goSvg from '../../../assets/svgs-go.svg'
import styled from 'styled-components'


const StyledSvgButton = styled(Button)`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  :hover {
    background:transparent;
  }
`

export default function Go({ onClick }) {
  return (
    <>
      <StyledSvgButton
        theme="dark"
        onClick={onClick}
        >
        <img src={goSvg} alt='go' style={{width: '8rem'}}/>
      </StyledSvgButton>
    </>
  )
}
