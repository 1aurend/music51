import React from 'react'
import styled from 'styled-components'
import {SolidButtonGreen} from '../layouts/PixelBorder'


const StyledSvgButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 10px;
`

export default function Go({ onClick }) {
  return (
    <>
      <StyledSvgButton
        onClick={onClick} title='go' alt='go'
        >
        <SolidButtonGreen props='GO!' />
      </StyledSvgButton>
    </>
  )
}
