import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import {
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
} from 'victory'
import VictoryChart from './withMemoVictoryChart'
import nextRoundSvg from '../../assets/svgs-nextround.svg'
import endSessionSvg from '../../assets/svgs-endsessionred.svg'
import roundStatsSvg from '../../assets/svgs-roundstats.svg'
import { rounded } from '../utility'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'


// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function ProgressChart({ chartData, qTypes, round, finished, viewStats, nextRound }) {
  const chartParams = chartData.chartData
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, progressTitle, progressSubtitle } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null

  // //why is this here? shouldn't it be in ChartData?
  // let chartLegendData = []
  // qTypes.map( type =>
  //   chartLegendData.push({ name: type.toUpperCase(), labels: {fontSize: 10, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}})
  // )

  let chartLinesAtt = qTypes.map( type => {
    return (
      <VictoryGroup data={chartParams.data.attempts[type]}>
        <VictoryLine/>
        <VictoryScatter/>
      </VictoryGroup>
    )
  })

  let chartLinesTs = qTypes.map( type => {
    return (
      <VictoryGroup data={chartParams.data.times[type]}>
        <VictoryLine/>
        <VictoryScatter/>
      </VictoryGroup>
    )
  })
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
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryLegend x={75} y={0}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }} }
                    data={chartData.legend}
                    colorScale={['#b7b8bc', '#898a8d', '#9fbfdf', '#6699cc', '#5b5c5e', '#17c671']}
                  />
                  <VictoryAxis
                    style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 11, padding: 18}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                     tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`} label={'ROUNDS'}
                    />
                    <VictoryAxis dependentAxis
                      label={'# ATTEMPTS'} style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 11, padding: 30}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                      domain={{y: [0, chartParams.domainMaxYAtt]}} tickFormat={(t) => rounded(t, 2)}
                      />
                    <VictoryGroup offset={20}
                      colorScale={['#b7b8bc', '#898a8d', '#9fbfdf', '#6699cc', '#5b5c5e', '#17c671']}>
                        {chartLinesAtt}
                    </VictoryGroup>
                </VictoryChart>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop:'-50'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '100%'}}}>
                <VictoryAxis
                  style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 11, padding: 18}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                  tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`} label={'ROUNDS'}
                  />
                  <VictoryAxis dependentAxis
                    label={'TIME (secs)'} style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 11, padding: 30}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                    domain={{y: [0, chartParams.domainMaxYTime]}} tickFormat={(t) => rounded(t, 2)}
                    />
                  <VictoryGroup offset={20}
                    colorScale={['#b7b8bc', '#898a8d', '#9fbfdf', '#6699cc', '#5b5c5e', '#17c671']}>
                      {chartLinesTs}
                  </VictoryGroup>
              </VictoryChart>
            </Row>
            </Col>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
                <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={(e) => {viewStats(true)}}><img src={roundStatsSvg} alt='round stats' style={{width: '15rem'}}></img></Button>
              </Col>
              <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
                <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={(e) => {
                  nextRound()
                }}><img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}></img></Button>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
                  <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={(e) => {
                    finished(true)
                  }}><img src={endSessionSvg} alt='end session' style={{width: '15rem'}}></img></Button>
                </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )
}

export default React.memo(ProgressChart)
