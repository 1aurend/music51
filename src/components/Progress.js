import React, { useContext, useState } from 'react'
import {Size, Session } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
} from 'victory'
import generateChords from '../chordGenerator'
import RoundStats from './Stats'
import Quiz from './Quiz'
import SessionMatrix from './Session'



function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


export default function ProgressChart({ round, chartParams, progress, verbA, verbT }) {

  const size = useContext(Size)
  const [session, updateSession] = useContext(Session)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em'}
  let subheadStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1em'}
  const [quiz, setQuiz] = useState(false)
  const [done, finished] = useState(false)
  const [stats, viewStats] = useState(false)
  let vTColor = verbT === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null
  let vAColor = verbA === 'decreased' ? {color: '#17c671', fontWeight: '600'} : null

  // Question: should we not display graphs on moblile? too small to read? or how to scale?

  let nextRound = () => {
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }



  if (quiz) {
    return <Quiz data={quiz} round={round+1}/>
  }
  else if (done) {
    return <SessionMatrix round={round} />
  }
  else if (stats) {
    return <RoundStats round={round} chartParams={chartParams} progress={progress} verbA={verbA} verbT={verbT} />
  }
  else {

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '150vh', fontFamily: "'Overpass Mono', monospace"}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Round {round} Complete!</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={subheadStyle}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '3%', marginLeft: '5%', marginRight: '5%', marginBottom: '1%'}}>
              <p style={{marginBottom: 0}}><span style={{fontWeight: '600'}}>ATTEMPTS: </span>Your total attempt count <span style={vAColor}>{verbA}</span> by <span style={{fontWeight: '600'}}>{progress.numAtt}</span> attempts per question or <span style={{fontWeight: '600'}}>{`${progress.percentAtt}%`}</span>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 10}}><span style={{fontWeight: '600'}}>TIME: </span>Your overall time <span style={vTColor}>{verbT}</span> by <span style={{fontWeight: '600'}}>{progress.secs}</span> seconds per question or <span style={{fontWeight: '600'}}>{`${progress.percentTime}%`}</span>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryLegend x={50} y={0}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }} }
                    data={[
                      { name: "Note Names", labels: {fontSize: 12, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}},
                      { name: "Roots", labels: {fontSize: 12, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}},
                      { name: "Chord Quality", labels: {fontSize: 12, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}},
                      { name: "Inversions", labels: {fontSize: 12, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}},
                      { name: "Average", labels: {fontSize: 12, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}}
                    ]}
                    colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}
                  />
                  <VictoryAxis
                    style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 13, padding: 18}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                     tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`} label={'Rounds'}
                    />
                    <VictoryAxis dependentAxis
                      label={'# Attempts'} style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 13, padding: 30}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                      domain={{y: [0, chartParams.domainMaxYAtt]}} tickFormat={(t) => rounded(t, 2)}
                      />
                    <VictoryGroup offset={20}
                      colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}>
                      <VictoryGroup data={chartParams.data.attempts.noteNames}>
                        <VictoryLine/>
                        <VictoryScatter style={{data: {symbol: 'square'}}}/>
                        {/*labelComponent={<VictoryLabel dy={20}/>} labels={(d) => d.y} style={{ labels: { fontSize: '9', fontWeight: '700', padding: 1 } }}*/}
                      </VictoryGroup>
                      <VictoryGroup data={chartParams.data.attempts.roots}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={chartParams.data.attempts.quality}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={chartParams.data.attempts.inversions}>
                        <VictoryLine style={{ data: {strokeWeight: '6px'}}}/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={chartParams.data.attempts.average}>
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                    </VictoryGroup>
                </VictoryChart>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop:'-50'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '100%'}}}>
                <VictoryAxis
                  style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 13, padding: 18}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                  tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`} label={'Rounds'}
                  />
                  <VictoryAxis dependentAxis
                    label={'Time (secs)'} style={{axisLabel: {fontFamily: "'Overpass Mono', monospace", fontSize: 13, padding: 30}, tickLabels: {fontFamily: "'Overpass Mono', monospace", fontSize: 10, padding: 5}}}
                    domain={{y: [0, chartParams.domainMaxYTime]}} tickFormat={(t) => rounded(t, 2)}
                    />
                  <VictoryGroup offset={20}
                    colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}>
                    <VictoryGroup data={chartParams.data.times.noteNames}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={chartParams.data.times.roots}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={chartParams.data.times.quality}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={chartParams.data.times.inversions}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                    <VictoryGroup data={chartParams.data.times.average}>
                      <VictoryLine/>
                      <VictoryScatter/>
                    </VictoryGroup>
                  </VictoryGroup>
              </VictoryChart>
            </Row>
            </Col>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {viewStats(true)}}>Round Stats</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {
                  nextRound()
                }}>Next Round</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {
                  finished(true)
                }}>End Session</Button>
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )}
}
