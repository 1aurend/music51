import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'
import NavButtons from './NavButtons'
import Chart from './Chart'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.marginTop || 0}
  margin-bottom: ${props => props.marginBottom || 0}
`

// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function ChartLayout({ chartData, qTypes, round, finished, viewStats, nextRound }) {
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, progressTitle, progressSubtitle } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '150vh', fontFamily: "'Overpass Mono', monospace"}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={progressTitle}>Round {round} Complete!</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '3%'}}><h2 style={progressSubtitle}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '3%', marginLeft: '5%', marginRight: '5%', marginBottom: '1%'}}>
              <p style={{marginBottom: 0}}><span style={{fontWeight: '600'}}>ATTEMPTS: </span>Your total attempt count <span style={vAColor}>{verbA}</span> by <span style={{fontWeight: '600'}}>{attemptsSummary.num}</span> attempts per question or <span style={{fontWeight: '600'}}>{`${attemptsSummary.percent}%`}</span>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 10}}><span style={{fontWeight: '600'}}>TIME: </span>Your overall time <span style={vTColor}>{verbT}</span> by <span style={{fontWeight: '600'}}>{timesSummary.num}</span> seconds per question or <span style={{fontWeight: '600'}}>{`${timesSummary.percent}%`}</span>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
              <Chart showLegend={true} chartData={chartData} qTypes={qTypes} metric={'attempts'} />
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop:'-50'}}>
              <Chart showLegend={false} chartData={chartData} qTypes={qTypes} metric={'times'} />
            </Row>
            </Col>
            <NavButtons viewStats={viewStats} nextRound={nextRound} finished={finished}/>
          </Col>
        </Row>
    </Container>
  )
}

export default React.memo(ChartLayout)
