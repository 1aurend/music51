import React, { useContext, useState } from 'react'
import { Progress, Size } from './Context'
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



export default function ProgressChart() {

  const [progress, updateProgress] = useContext(Progress)
  const size = useContext(Size)
  let borderRadius = size > 500 ? '2rem' : '1rem'
  const [reset, startOver] = useState(false)
  const [done, finished] = useState(false)

  let attempts = progress.attempts
  let times = progress.times


  //add effect to clear progress history on done=true


  if (reset) {
    return <Start title={{headline: 'Welcome Back!', subtitle: 'Choose your settings for the next set.'}}/>
  }
  else if (done) {
    return <Start title={{headline: 'Music 51', subtitle: 'Chord Identification'}}/>
  }
  else {
  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={{textAlign: 'center'}}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryLegend x={50} y={0}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                    data={[
                      { name: "Note Names"},
                      { name: "Roots"},
                      { name: "Chord Quality"},
                      { name: "Inversions"},
                      { name: "Overall"}
                    ]}
                    colorScale={'heatmap'}
                  />
                  <VictoryAxis
                    label={'Round'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                    domain={{x: [1, 3]}} tickCount={2} tickFormat={(t) => `${Math.round(t)}`}
                    />
                    <VictoryAxis dependentAxis
                      label={'# Attempts'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                      domain={{y: [0, 5]}}
                      />
                    <VictoryGroup offset={20}
                      colorScale={"heatmap"}>
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
                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  <p style={{marginBottom: 0}}>Overall your accuracy improved by <strong>1</strong> attempt per question or <strong>50%</strong></p>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}}
                style={{parent: {maxHeight: '40%'}}}>
                <VictoryAxis
                  label={'Round'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                  domain={{x: [1, 3]}} tickCount={2} tickFormat={(t) => `${Math.round(t)}`}
                  />
                  <VictoryAxis dependentAxis
                    label={'Time (secs)'} style={{axisLabel: {fontSize: 15, padding: 30}, tickLabels: {fontSize: 15, padding: 5}}}
                    domain={{y: [0, 5]}}
                    />
                  <VictoryGroup offset={20}
                    colorScale={"heatmap"}>
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
            <Row style={{display: 'flex', justifyContent: 'center'}}>
              <p style={{marginBottom: 0}}>Overall your times improved by <strong>1</strong> second per question or <strong>50%</strong></p>
            </Row>
            </Col>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%', marginTop: '2%'}}>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {startOver(true)}}>Keep Going</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {finished(true)}}>End Session</Button>
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )}
}
