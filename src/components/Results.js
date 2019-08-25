import React, { useContext, useEffect, useState } from 'react'
import { Session, Size } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Start from './Start'
import ProgressChart from './Progress'


export default function Results({ data }) {

  const [session, updateSession] = useContext(Session)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  let subtitleStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2em'} : {textAlign: 'center', fontSize: '1.5em'}
  const [reset, newRound] = useState(false)
  const [progressView, showProgress] = useState(false)



  console.log(session);

  let noteNames = {
    attempts: [],
    times: [],
    meanAttempts: null,
    meanTime: null,
  }
  let roots = {
    attempts: [],
    times: [],
    meanAttempts: null,
    meanTime: null,
  }
  let quality = {
    attempts: [],
    times: [],
    meanAttempts: null,
    meanTime: null,
  }
  let inversions = {
    attempts: [],
    times: [],
    meanAttempts: null,
    meanTime: null,
  }
  let overall = {
    attempts: null,
    time: null
  }

  data.map( chord => {
    chord.questions.map( question => {
      if (question.text.indexOf('letter') !== -1) {
        question.answers.map( answer => {
            noteNames.attempts.push(answer.tries.length)
            noteNames.times.push(answer.elapsedTime)
            return null
        })
      }
      else if (question.text.indexOf('root') !== -1) {
        question.answers.map( answer => {
            roots.attempts.push(answer.tries.length)
            roots.times.push(answer.elapsedTime)
            return null
        })
      }
      else if (question.text.indexOf('quality') !== -1) {
        question.answers.map( answer => {
            quality.attempts.push(answer.tries.length)
            quality.times.push(answer.elapsedTime)
            return null
        })
      }
      else if (question.text.indexOf('inversion') !== -1) {
        question.answers.map( answer => {
            inversions.attempts.push(answer.tries.length)
            inversions.times.push(answer.elapsedTime)
            return null
        })
      }
      return null
    })
    return null
  })


  const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length
  function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

  noteNames.meanAttempts = round(mean(noteNames.attempts),2)
  noteNames.meanTime = round(mean(noteNames.times),2)
  roots.meanAttempts = round(mean(roots.attempts),2)
  roots.meanTime = round(mean(roots.times),2)
  quality.meanAttempts = round(mean(quality.attempts),2)
  quality.meanTime = round(mean(quality.times),2)
  inversions.meanAttempts = round(mean(inversions.attempts),2)
  inversions.meanTime = round(mean(inversions.times),2)
  overall.attempts = (noteNames.meanAttempts+roots.meanAttempts+quality.meanAttempts+inversions.meanAttempts)/4
  overall.time = (noteNames.meanTime+roots.meanTime+quality.meanTime+inversions.meanTime)/4



  useEffect(() => {
    let means = session.means
    let tally = {
        noteNames: {
          attempts: [...means.noteNames.attempts, noteNames.meanAttempts],
          times: [...means.noteNames.times, noteNames.meanTime]
        },
        roots: {
          attempts: [...means.roots.attempts, roots.meanAttempts],
          times: [...means.roots.times, roots.meanTime]
        },
        quality: {
          attempts: [...means.quality.attempts, quality.meanAttempts],
          times: [...means.quality.times, quality.meanTime]
        },
        inversions: {
          attempts: [...means.inversions.attempts, inversions.meanAttempts],
          times: [...means.inversions.times, inversions.meanTime]
        },
        average: {
          attempts: [...means.average.attempts, overall.attempts],
          times: [...means.average.times, overall.time]
        }
    }

    updateSession({...session, means: tally, roundCount: session.roundCount+1})
    console.log('here is progress: ' + JSON.stringify(tally));
  }, [])


  if (reset) {
    return <Start title={{headline: 'Welcome Back!', subtitle: '', text: 'Choose your settings for the next round:'}}/>
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
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Note Names: </strong>You averaged <strong>{noteNames.meanAttempts}</strong> attempts and <strong>{noteNames.meanTime}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Root Notes: </strong>You averaged <strong>{roots.meanAttempts}</strong> attempts and <strong>{roots.meanTime}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Chord Quality: </strong>You averaged <strong>{quality.meanAttempts}</strong> attempts and <strong>{quality.meanTime}</strong> seconds per question.</p></Row>
                  <Row style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><strong>Inversions: </strong>You averaged <strong>{inversions.meanAttempts}</strong> attempts and <strong>{inversions.meanTime}</strong> seconds per question.</p></Row>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                <Col sm='8' lg='3' style={{display: 'flex', justifyContent: 'center'}}>
                  <Button style={{margin: '5%'}} theme='success' onClick={(e) => {newRound(true)}}>Keep Going</Button>
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
