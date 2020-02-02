import React from 'react'
import nextRoundSvg from '../../../assets/svgs-nextround.svg'
import endSessionSvg from '../../../assets/svgs-endsessionred.svg'
import roundStatsSvg from '../../../assets/svgs-roundstats.svg'
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
  justifyContent: center;
`
const StyledSvgButton = styled(Button)`
  display: block;
  cursor: pointer;
  background-color: #e5e6eb;
  border: none;
  margin: 5%;
  padding: 0;
`

export default function NavButtons({ viewStats, nextRound, finished }) {
  return (
    <>
      <StyledRow>
        <StyledCol sm='8' lg='5'>
          <StyledSvgButton
            theme="dark"
            onClick={() => {viewStats(true)}}
            >
            <img src={roundStatsSvg} alt='round stats' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
        <StyledCol sm='8' lg='5'>
          <StyledSvgButton
            theme="dark"
            onClick={() => {nextRound()}}
            >
            <img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
      </StyledRow>
      <StyledRow marginBottom='5%'>
        <StyledCol sm='8' lg='5'>
         <StyledSvgButton
            theme="dark"
            onClick={() => {finished(true)}}
            >
            <img src={endSessionSvg} alt='end session' style={{width: '15rem'}}/>
          </StyledSvgButton>
        </StyledCol>
      </StyledRow>
    </>
  )

}
