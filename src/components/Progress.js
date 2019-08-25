import React, { useContext, useState, useEffect } from 'react'
import { Session, Size } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Start from './Start'
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel
} from 'victory'



function round(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function chartMath(noteNames, roots, quality, inversions, average, attempts, times) {

  //question: move structuring of progress data in here so we have a clean progress object for later? that would simplify these domain max calculations

  let chartParams = {
    domainMaxYAtt: 0,
    domainMaxYTime: 0,
    rounds: []
  }

  for (var i = 0; i < attempts.noteNames.length; i++) {
    chartParams.rounds.push(i+1)
  }

  let atts = []
  let ts = []

  for (var i = 0; i < attempts.noteNames.length; i++) {
    atts.push(attempts.noteNames[i].y)
  }
  for (var i = 0; i < attempts.roots.length; i++) {
    atts.push(attempts.roots[i].y)
  }
  for (var i = 0; i < attempts.quality.length; i++) {
    atts.push(attempts.quality[i].y)
  }
  for (var i = 0; i < attempts.inversions.length; i++) {
    atts.push(attempts.inversions[i].y)
  }
  for (var i = 0; i < attempts.overall.length; i++) {
    atts.push(attempts.overall[i].y)
  }
  chartParams.domainMaxYAtt = Math.max(...atts)

  for (var i = 0; i < times.noteNames.length; i++) {
    ts.push(times.noteNames[i].y)
  }
  for (var i = 0; i < times.roots.length; i++) {
    ts.push(times.roots[i].y)
  }
  for (var i = 0; i < times.quality.length; i++) {
    ts.push(times.quality[i].y)
  }
  for (var i = 0; i < times.inversions.length; i++) {
    ts.push(times.inversions[i].y)
  }
  for (var i = 0; i < times.overall.length; i++) {
    ts.push(times.overall[i].y)
  }
  chartParams.domainMaxYTime = Math.max(...ts)

  let attChange = attempts.overall[0].y-attempts.overall[attempts.overall.length-1].y
  let timeChange = times.overall[0].y-times.overall[times.overall.length-1].y
  let accuracy = {
    attempts: round(attChange, 2),
    percentAtt: round(((attChange/attempts.overall[0].y)*100),0),
    time: round(timeChange, 2),
    percentTime: round(((timeChange/times.overall[0].y)*100),0)
  }

  return( { chartParams, accuracy } )

}


export default function ProgressChart() {

  const [session, updateSession] = useContext(Session)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  const [reset, newRound] = useState(false)
  const [done, finished] = useState(false)


  let noteNames = session.means.noteNames
  let roots = session.means.roots
  let quality = session.means.quality
  let inversions = session.means.inversions
  let average = session.means.average
  let attempts
  let times

  // Question: should we not display graphs on moblile? too small to read? or how to scale?



  if (reset) {
    return <Start title={{headline: 'Welcome Back!', subtitle: '', text: 'Choose your settings for the next round:'}}/>
  }
  else if (done) {
    return <Start title={{headline: 'Music 51', subtitle: 'Chord Identification'}}/>
  }
  else {
  let { chartParams, accuracy } = chartMath(noteNames, roots, quality, inversions, average)
  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 10}}><strong>Time: </strong>You improved by <strong>{accuracy.time}</strong> seconds per question or <strong>{`${accuracy.percentTime}%`}</strong> between your first and last rounds.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 0}}><strong>Accuracy: </strong>You improved by <strong>{accuracy.attempts}</strong> attempts per question or <strong>{`${accuracy.percentAtt}%`}</strong> between your first and last rounds.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}} domain={{y: [6, 0]}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryLegend x={50} y={0}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }, title: {fontSize: 15 } }}
                    data={[
                      { name: "Note Names"},
                      { name: "Roots"},
                      { name: "Chord Quality"},
                      { name: "Inversions"},
                      { name: "Average"}
                    ]}
                    colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}
                  />
                  <VictoryAxis
                    style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                    domain={{x: [1, session.roundCount-1]}} tickValues={chartParams.rounds} tickFormat={(t) => `${Math.round(t)}`}
                    />
                    <VictoryAxis dependentAxis
                      label={'# Attempts'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                      domain={{y: [6, 0]}} tickFormat={(t) => round(t, 2)}
                      />
                    <VictoryGroup offset={20}
                      colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}>
                      <VictoryGroup data={attempts.noteNames}>
                        <VictoryLine/>
                        <VictoryScatter/>
                        {/*labelComponent={<VictoryLabel dy={20}/>} labels={(d) => d.y} style={{ labels: { fontSize: '9', fontWeight: '700', padding: 1 } }}*/}
                      </VictoryGroup>
                      <VictoryGroup data={attempts.roots}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={attempts.quality}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={attempts.inversions}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={attempts.overall}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                    </VictoryGroup>
                </VictoryChart>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryAxis
                  style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                  domain={{x: [1, session.roundCount-1]}} tickValues={chartParams.rounds} tickFormat={(t) => `${Math.round(t)}`}
                  />
                  <VictoryAxis dependentAxis
                    label={'Time (secs)'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                    domain={{y: [0, chartParams.domainMaxYTime]}} tickFormat={(t) => round(t, 2)}
                    />
                  <VictoryGroup offset={20}
                    colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}>
                    <VictoryGroup data={times.noteNames}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={times.roots}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={times.quality}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={times.inversions}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={times.overall}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                  </VictoryGroup>
              </VictoryChart>
            </Row>
            </Col>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {newRound(true)}}>Round Stats</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {newRound(true)}}>Next Round</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {
                  finished(true)
                  updateSession({
                          attempts: {
                            noteNames: [],
                            roots: [],
                            quality: [],
                            inversions: [],
                            overall: []
                          },
                          times: {
                            noteNames: [],
                            roots: [],
                            quality: [],
                            inversions: [],
                            overall: []
                          },
                          roundCount: 1
                        })
                }}>End Session</Button>
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )}
}
