import React from 'react'
import { Button } from 'shards-react'
import goSvg from '../../assets/svgs-go.svg'
import styled from 'styled-components'

const StyledSvgButton = styled(Button)`
  display: block;
  cursor: pointer;
  background-color: black;
  border: none;
  padding: 0;
`

export default function Go({ onClick }) {
  return (
    <>
      <StyledSvgButton
        theme="light"
        onClick={onClick}
        >
        <img src={goSvg} alt='go' style={{width: '8rem'}}/>
      </StyledSvgButton>
    </>
  )
}
