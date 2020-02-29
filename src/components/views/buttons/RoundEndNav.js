import React from 'react'
import nextRoundSvg from '../../../assets/svgs-nextround.svg'
import endSessionSvg from '../../../assets/svgs-endsessionred.svg'
import roundStatsSvg from '../../../assets/svgs-roundstats.svg'
import backSvg from '../../../assets/svgs-backarrows.svg'
import startOverSvg from '../../../assets/svgs-startover.svg'
import styled from 'styled-components'
import {SolidButtonGreen, SolidButtonRed} from '../layouts/PixelBorder'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'


const ButtonFlexContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items:center;
  padding: 0;
`

const StyledSvgButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 10px;
`

export default function NavButtons(props) {
  const { viewStats, nextRound, finished, round, statLines, table, startOver } = props
  const sizedStyles = useResponsiveStyles()
  const { navButtonFontSize } = sizedStyles
  if (round === 1) {
    return (
      <ButtonFlexContainer>
        <StyledSvgButton
          onClick={() => {nextRound()}}
          title='next round'
          >
          <SolidButtonGreen text='next round >>' fontSize={navButtonFontSize}/>
        </StyledSvgButton>
      </ButtonFlexContainer>
    )
  } else if (statLines) {
    return (
      <ButtonFlexContainer>
          <StyledSvgButton
            onClick={() => {viewStats(false)}}
            title='back'
            >
            <SolidButtonGreen text='<< back' fontSize={navButtonFontSize}/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {nextRound()}}
            title='next round'
            >
            <SolidButtonGreen text='next round >>' fontSize={navButtonFontSize}/>
          </StyledSvgButton>
      </ ButtonFlexContainer>
    )
  } else if (table) {
    return (
      <StyledSvgButton
        onClick={() => {startOver(true)}}
        title='start over'
        >
        <SolidButtonGreen text='start over?' fontSize={navButtonFontSize}/>
      </StyledSvgButton>
    )
  }
  return (
    <ButtonFlexContainer>
          <StyledSvgButton
            onClick={() => {viewStats(true)}}
            title='round stats'
            >
            <SolidButtonGreen text='round stats' fontSize={navButtonFontSize}/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {nextRound()}}
            title='next round'
            >
            <SolidButtonGreen text='next round >>' fontSize={navButtonFontSize}/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {finished(true)}}
            title='end session'
            >
            <SolidButtonRed text='end session' fontSize={navButtonFontSize}/>
          </StyledSvgButton>
    </ButtonFlexContainer>
  )
}
