import React, { useContext, useState, useEffect } from 'react'
import { Means, Size } from './Context'
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



function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function chartMath(noteNames, roots, quality, inversions, average) {

  //question: move structuring of progress data in here so we have a clean progress object for later? that would simplify these domain max calculations

  let chartParams = {
    domainMaxYAtt: 0,
    domainMaxYTime: 0,
    labelsX: [],
    data: {
      attempts: {
        noteNames: [],
        roots: [],
        quality: [],
        inversions: [],
        average: []
      },
      times: {
        noteNames: [],
        roots: [],
        quality: [],
        inversions: [],
        average: []
      }
    }
  }


  for (var i = 0; i < noteNames.attempts.length; i++) {
    chartParams.labelsX.push(i+1)
  }


  let atts = noteNames.attempts.concat(roots.attempts, quality.attempts, inversions.attempts, average.attempts)
  chartParams.domainMaxYAtt = Math.max(...atts)
  let ts = noteNames.times.concat(roots.times, quality.times, inversions.times, average.times)
  chartParams.domainMaxYTime = Math.max(...ts)


  for (var j = 0; j < noteNames.attempts.length; j++) {
    chartParams.data.attempts.noteNames.push({x: j+1, y: noteNames.attempts[j]})
    chartParams.data.attempts.roots.push({x: j+1, y: roots.attempts[j]})
    chartParams.data.attempts.quality.push({x: j+1, y: quality.attempts[j]})
    chartParams.data.attempts.inversions.push({x: j+1, y: inversions.attempts[j]})
    chartParams.data.attempts.average.push({x: j+1, y: average.attempts[j]})
  }
  for (var k = 0; k < noteNames.times.length; k++) {
    chartParams.data.times.noteNames.push({x: k+1, y: noteNames.times[k]})
    chartParams.data.times.roots.push({x: k+1, y: roots.times[k]})
    chartParams.data.times.quality.push({x: k+1, y: quality.times[k]})
    chartParams.data.times.inversions.push({x: k+1, y: inversions.times[k]})
    chartParams.data.times.average.push({x: k+1, y: average.times[k]})
  }
  console.log('data.attempts.noteNames: ' + JSON.stringify(chartParams.data.attempts.noteNames));


  let attChange = average.attempts[0]-average.attempts[average.attempts.length-1]
  let timeChange = average.times[0]-average.times[average.times.length-1]
  let progress = {
    numAtt: rounded(attChange, 2),
    percentAtt: rounded(((attChange/average.attempts[0])*100),0),
    secs: rounded(timeChange, 2),
    percentTime: rounded(((timeChange/average.times[0])*100),0)
  }

  return( { chartParams, progress } )

}


export default function ProgressChart({ round }) {

  const [means, updateMeans] = useContext(Means)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  const [reset, newRound] = useState(false)
  const [done, finished] = useState(false)


  let noteNames = means.noteNames
  let roots = means.roots
  let quality = means.quality
  let inversions = means.inversions
  let average = means.average


  // Question: should we not display graphs on moblile? too small to read? or how to scale?



  if (reset) {
    return <Start title={{headline: 'Welcome Back!', subtitle: '', text: 'Choose your settings for the next round:'}} round={round+1}/>
  }
  else if (done) {
    return <Start title={{headline: 'Music 51', subtitle: 'Chord Identification'}}/>
  }
  else {
  let { chartParams, progress } = chartMath(noteNames, roots, quality, inversions, average)
  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Your Progress:</h2></Row>
          <Col sm='12' lg='12'>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop: '2%', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 10}}><strong>Time: </strong>You improved by <strong>{progress.secs}</strong> seconds per question or <strong>{`${progress.percentTime}%`}</strong> between your first and last rounds.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
              <p style={{marginBottom: 0}}><strong>Accuracy: </strong>You improved by <strong>{progress.numAtt}</strong> attempts per question or <strong>{`${progress.percentAtt}%`}</strong> between your first and last rounds.</p>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}>
                <VictoryChart height={200} width={600} domainPadding={{x: 0}} domain={{y: [6, 0]}} //this is doing something!!
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
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {newRound(true)}}>Round Stats</Button>
              </Col>
              <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{margin: '5%'}} theme='success' onClick={(e) => {
                  newRound(true)
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
