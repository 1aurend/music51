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
const StyledSvgButton = styled(Button)`
  display: block;
  cursor: pointer;
  background-color: #e5e6eb;
  border: none;
  margin: 5%;
  padding: 0;
`

export default function NavButtons(props) {
  const { viewStats, nextRound, finished, round, statLines, table, startOver } = props
  if (round === 1) {
    return (
      <StyledCol sm='8' lg='4'>
        <StyledSvgButton
          theme="light"
          onClick={() => {nextRound()}}
          >
          <img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}/>
        </StyledSvgButton>
      </StyledCol>
    )
  } else if (statLines) {
    return (
      <>
        <StyledCol sm='8' lg='5' marginBottom='5%'>
          <StyledSvgButton
            theme="light"
            onClick={() => {viewStats(false)}}
            >
            <img src={backSvg} alt='back' style={{width: '10rem'}}/>
          </StyledSvgButton>
        </StyledCol>
        <StyledCol sm='8' lg='5' marginBottom='5%'>
          <StyledSvgButton
            theme="light"
            onClick={() => {nextRound()}}
            >
            <img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
      </>
    )
  } else if (table) {
    return (
      <StyledSvgButton
        theme="light"
        onClick={() => {startOver(true)}}
        >
        <img src={startOverSvg} alt='start over' style={{width: '15rem'}}/>
      </StyledSvgButton>
    )
  }
  return (
    <>
      <StyledRow>
        <StyledCol sm='8' lg='5'>
          <StyledSvgButton
            theme="light"
            onClick={() => {viewStats(true)}}
            >
            <img src={roundStatsSvg} alt='round stats' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
        <StyledCol sm='8' lg='5'>
          <StyledSvgButton
            theme="light"
            onClick={() => {nextRound()}}
            >
            <img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
      </StyledRow>
      <StyledRow marginBottom='5%'>
        <StyledCol sm='8' lg='5'>
         <StyledSvgButton
            theme="light"
            onClick={() => {finished(true)}}
            >
            <img src={endSessionSvg} alt='end session' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
      </StyledRow>
    </>
  )
}
