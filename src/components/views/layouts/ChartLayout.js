import React, { useEffect, useContext } from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import NavButtons from '../buttons/RoundEndNav'
import Chart from '../charts/ProgressChart'
import styled from 'styled-components'
import { Session } from '../../data/Context'

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
`
const StyledCenterPane = styled(Col)`
  border: 5px solid black;
  border-radius: 1rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  background-color: #e5e6eb;
`

// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function ChartLayout({ chartData, round, finished, viewStats, nextRound }) {
  const qTypes = useContext(Session).means.questionTypes
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { progressTitle, progressSubtitle } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '150vh', fontFamily: "'Overpass Mono', monospace"}}>
      <StyledRow noGutters>
        <StyledCenterPane sm='12' lg='8'>
          <StyledRow margintop='5%'>
            <h2 style={progressTitle}>Round {round} Complete!</h2>
          </StyledRow>
          <StyledRow margintop='3%'>
            <h2 style={progressSubtitle}>Your Progress:</h2>
          </StyledRow>
          <Col sm='12' lg='12'>
            <StyledRow margintop='3%' marginbottom='1%'>
              <p style={{marginBottom: 0}}>
                <span style={{fontWeight: '600'}}>
                  ATTEMPTS:{'\u00A0'}
                </span>
                 Your total attempt count{'\u00A0'}
                <span style={vAColor}>
                  {verbA}{'\u00A0'}
                </span>
                 by{'\u00A0'}
                <span style={{fontWeight: '600'}}>
                  {attemptsSummary.num}{'\u00A0'}
                </span>
                 attempts per question or{'\u00A0'}
                <span style={{fontWeight: '600'}}>
                  {`${attemptsSummary.percent}%`}
                </span>
                .
              </p>
            </StyledRow>
            <StyledRow>
              <p style={{marginBottom: 10}}>
                <span style={{fontWeight: '600'}}>
                  TIME:{'\u00A0'}
                </span>
                Your overall time{'\u00A0'}
                <span style={vTColor}>
                  {verbT}{'\u00A0'}
                </span>
                 by{'\u00A0'}
                <span style={{fontWeight: '600'}}>
                  {timesSummary.num}{'\u00A0'}
                </span>
                 seconds per question or{'\u00A0'}
                <span style={{fontWeight: '600'}}>
                  {`${timesSummary.percent}%`}
                </span>
                .
              </p>
            </StyledRow>
            <StyledRow margintop='5%'>
              <Chart showLegend={true} chartData={chartData} qTypes={qTypes} metric={'attempts'} />
            </StyledRow>
            <StyledRow margintop='-50'>
              <Chart showLegend={false} chartData={chartData} qTypes={qTypes} metric={'times'} />
            </StyledRow>
          </Col>
            <NavButtons viewStats={viewStats} nextRound={nextRound} finished={finished}/>
        </StyledCenterPane>
      </StyledRow>
    </Container>
  )
}

export default React.memo(ChartLayout)
