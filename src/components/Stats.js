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


export default function RoundStats({ data, round }) {

  const [means, updateMeans] = useContext(Means)
  const [count, increment] = useContext(Count)
  const [session, updateSession] = useContext(Session)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  let subtitleStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2em'} : {textAlign: 'center', fontSize: '1.5em'}
  const [quiz, setQuiz] = useState(false)
  const [progressView, showProgress] = useState(false)


  let nextRound = () => {
    increment(count+1)
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }


  if (quiz) {
    return <Quiz data={quiz} round={round+1}/>
  }
  else if (progressView) {
    return <ProgressChart />
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row noGutters style={{paddingTop: '5%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Session Complete!</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <Col sm='12' lg='8'>
                  <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3 style={subtitleStyle}>Your Results:</h3></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Note Names: </strong>You averaged <strong>{means.noteNames.attempts[means.noteNames.attempts.length-1]}</strong> attempts and <strong>{means.noteNames.times[means.noteNames.times.length-1]}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Root Notes: </strong>You averaged <strong>{means.roots.attempts[means.roots.attempts.length-1]}</strong> attempts and <strong>{means.roots.times[means.roots.times.length-1]}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Chord Quality: </strong>You averaged <strong>{means.quality.attempts[means.quality.attempts.length-1]}</strong> attempts and <strong>{means.quality.times[means.quality.times.length-1]}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Inversions: </strong>You averaged <strong>{means.inversions.attempts[means.inversions.attempts.length-1]}</strong> attempts and <strong>{means.inversions.times[means.inversions.times.length-1]}</strong> seconds per question.</p></Row>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                  <Button style={{margin: '5%'}} theme='success' onClick={e => nextRound()}>Next Round</Button>
                </Col>
                <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                  <Button style={{margin: '5%'}} theme='success' onClick={(e) => {showProgress(true)}}>Check My Progress</Button>
                </Col>
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }


}
