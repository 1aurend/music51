import React, { useContext, useEffect, useState } from 'react'
import { Means, Size, Count, Session } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Start from './Start'
import Quiz from './Quiz'
import ProgressChart from './Progress'
import generateChords from '../chordGenerator'


export default function RoundStats({ round, chartParams, progress, verbA, verbT }) {

  const [means, updateMeans] = useContext(Means)
  const [session, updateSession] = useContext(Session)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em'}
  let subtitleStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.25em', lineHeight: '1.25em'}
  const [quiz, setQuiz] = useState(false)
  const [progressView, showProgress] = useState(false)


  let nextRound = () => {
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  let headline = round === 1 ? 'First Round Complete!' : `Round ${round} Stats`
  let subtitle = round === 1 ? `Here's Your Benchmark:` : ''
  let navButtons = round === 1 ? (<Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button style={{marginRight: '5%', marginLeft: '5%', marginTop: '2%'}} theme='success' onClick={e => nextRound()}>Next Round</Button>
                                </Col>) :
                                (<><Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center', marginBottom: '5%'}}>
                                    <Button style={{marginRight: '5%', marginLeft: '5%', marginTop: '2%'}} theme='success' onClick={e => nextRound()}>Next Round</Button>
                                </Col>
                                <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                                  <Button style={{marginRight: '5%', marginLeft: '5%', marginTop: '2%'}} theme='success' onClick={(e) => {showProgress(true)}}>Back to Progress</Button>
                                </Col></>)
  let closing = round === 1 ? 'Try to beat these numbers in the next round!' : ''


  if (quiz) {
    return <Quiz data={quiz} round={round+1}/>
  }
  else if (progressView) {
    return <ProgressChart round={round} chartParams={chartParams} progress={progress} verbA={verbA} verbT={verbT}/>
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>{headline}</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%', fontFamily: "'Overpass Mono', monospace"}}>
                <Col sm='12' lg='8'>
                  <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3 style={subtitleStyle}>{subtitle}</h3></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>NOTE NAMES: </span>{means.noteNames.attempts[means.noteNames.attempts.length-1]} attempts and {means.noteNames.times[means.noteNames.times.length-1]} seconds per question</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>ROOT NOTES: </span>{means.roots.attempts[means.roots.attempts.length-1]} attempts and {means.roots.times[means.roots.times.length-1]} seconds per question</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>CHORD QUALITY: </span>{means.quality.attempts[means.quality.attempts.length-1]} attempts and {means.quality.times[means.quality.times.length-1]} seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>INVERSIONS: </span>{means.inversions.attempts[means.inversions.attempts.length-1]} attempts and {means.inversions.times[means.inversions.times.length-1]} seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center'}}><h3 style={subtitleStyle}>{closing}</h3></Row>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                  {navButtons}
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }


}
