import React from 'react'
import nextRoundSvg from '../../../assets/svgs-nextround.svg'
import endSessionSvg from '../../../assets/svgs-endsessionred.svg'
import roundStatsSvg from '../../../assets/svgs-roundstats.svg'
import backSvg from '../../../assets/svgs-backarrows.svg'
import startOverSvg from '../../../assets/svgs-startover.svg'
import {
  Row,
  Col,
  Button,
} from 'shards-react'
import styled from 'styled-components'
import {SolidButtonGreen, SolidButtonRed} from '../layouts/PixelBorder'


const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.marginTop || 0};
  margin-bottom: ${props => props.marginBottom || 0};
`
const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.marginBottom || 0};
`

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
  padding: 0;
  margin: 10px;
`

export default function NavButtons(props) {
  const { viewStats, nextRound, finished, round, statLines, table, startOver } = props
  if (round === 1) {
    return (
      <ButtonFlexContainer>
        <StyledSvgButton
          onClick={() => {nextRound()}}
          title='next round'
          >
          <SolidButtonGreen props='next round >>'/>
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
            <SolidButtonGreen props='<< back'/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {nextRound()}}
            title='next round'
            >
            <SolidButtonGreen props='next round >>'/>
          </StyledSvgButton>
      </ ButtonFlexContainer>
    )
  } else if (table) {
    return (
      <StyledSvgButton
        onClick={() => {startOver(true)}}
        title='start over'
        >
        <SolidButtonGreen props='start over?'/>
      </StyledSvgButton>
    )
  }
  return (
    <ButtonFlexContainer>
          <StyledSvgButton
            onClick={() => {viewStats(true)}}
            title='round stats'
            >
            <SolidButtonGreen props='round stats'/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {nextRound()}}
            title='next round'
            >
            <SolidButtonGreen props='next round >>'/>
          </StyledSvgButton>
          <StyledSvgButton
            onClick={() => {finished(true)}}
            title='end session'
            >
            <SolidButtonRed props='end session'/>
          </StyledSvgButton>
    </ButtonFlexContainer>
  )
}
