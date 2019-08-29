import React, { useContext, useState, useEffect } from 'react'
import {Size, Session } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Start from './Start'
import Context from './Context'
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel
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
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  const [quiz, setQuiz] = useState(false)
  const [done, finished] = useState(false)
  const [stats, viewStats] = useState(false)

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
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Round {round} Complete!</h2></Row>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 10}}><strong>Time: </strong>Your overall time <strong>{verbT}</strong> by <strong>{progress.secs}</strong> seconds per question or <strong>{`${progress.percentTime}%`}</strong>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 0}}><strong>Accuracy: </strong>Your overall accuracy <strong>{verbA}</strong> by <strong>{progress.numAtt}</strong> attempts per question or <strong>{`${progress.percentAtt}%`}</strong>.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
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
                     tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`}
                    />
                    <VictoryAxis dependentAxis
                      label={'# Attempts'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                      domain={{y: [0, chartParams.domainMaxYAtt]}} tickFormat={(t) => rounded(t, 2)}
                      />
                    <VictoryGroup offset={20}
                      colorScale={['#b7b8bc', '#a0a1a4', '#898a8d', '#5b5c5e', '#17c671']}>
                      <VictoryGroup data={chartParams.data.attempts.noteNames}>
                        <VictoryLine/>
                        <VictoryScatter/>
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
                        <VictoryLine/>
                        <VictoryScatter/>
                      </VictoryGroup>
                      <VictoryGroup data={chartParams.data.attempts.average}>
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
                  tickValues={chartParams.labelsX} tickFormat={(t) => `${Math.round(t)}`}
                  />
                  <VictoryAxis dependentAxis
                    label={'Time (secs)'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
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
