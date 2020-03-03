import React from 'react'
import styled from 'styled-components'
import {SolidButtonGreen} from '../layouts/PixelBorder'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'


const StyledSvgButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 10px;
`

export default function Go({ onClick }) {
  const sizedStyles = useResponsiveStyles()
  const { navButtonFontSize } = sizedStyles
  return (
    <>
      <StyledSvgButton
        onClick={onClick} title='go' alt='go'
        >
        <SolidButtonGreen text='GO!' fontSize={navButtonFontSize} />
      </StyledSvgButton>
    </>
  )
}
