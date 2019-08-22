import React, { useContext, useEffect, useState } from 'react'
import { Progress, Size } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Start from './Start'
import ProgressChart from './Progress'


export default function Results({ data }) {

  const [progress, updateProgress] = useContext(Progress)
  const size = useContext(Size)
  let borderRadius = size > 500 ? '2rem' : '1rem'
  const [reset, newRound] = useState(false)
  const [progressView, showProgress] = useState(false)



  // console.log(JSON.stringify(data, null, 4));

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

  data.results.map( chord => {
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

  noteNames.meanAttempts = round(mean(noteNames.attempts),4)
  noteNames.meanTime = round(mean(noteNames.times),4)
  roots.meanAttempts = round(mean(roots.attempts),4)
  roots.meanTime = round(mean(roots.times),4)
  quality.meanAttempts = round(mean(quality.attempts),4)
  quality.meanTime = round(mean(quality.times),4)
  inversions.meanAttempts = round(mean(inversions.attempts),4)
  inversions.meanTime = round(mean(inversions.times),4)
  overall.attempts = (noteNames.meanAttempts+roots.meanAttempts+quality.meanAttempts+inversions.meanAttempts)/4
  overall.time = (noteNames.meanTime+roots.meanTime+quality.meanTime+inversions.meanTime)/4



  useEffect(() => {
    let tally = {
        attempts: {
          noteNames: [...progress.attempts.noteNames, {x: progress.roundCount, y: noteNames.meanAttempts}],
          roots: [...progress.attempts.roots, {x: progress.roundCount, y: roots.meanAttempts}],
          quality: [...progress.attempts.quality, {x: progress.roundCount, y: quality.meanAttempts}],
          inversions: [...progress.attempts.inversions, {x: progress.roundCount, y: inversions.meanAttempts}],
          overall: [...progress.attempts.overall, {x: progress.roundCount, y: overall.attempts}],
      },
        times: {
          noteNames: [...progress.times.noteNames, {x: progress.roundCount, y: noteNames.meanTime}],
          roots: [...progress.times.roots, {x: progress.roundCount, y: roots.meanTime}],
          quality: [...progress.times.quality, {x: progress.roundCount, y: quality.meanTime}],
          inversions: [...progress.times.inversions, {x: progress.roundCount, y: inversions.meanTime}],
          overall: [...progress.times.overall, {x: progress.roundCount, y: overall.time}],
      },
        roundCount: ++progress.roundCount
    }

    updateProgress(tally)
    console.log('here is progress: ' + JSON.stringify(tally));
  }, [])


  if (reset) {
    return <Start title={{headline: 'Welcome Back!', subtitle: 'Choose your settings for the next set.'}}/>
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
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={{textAlign: 'center'}}>Session Complete!</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <Col sm='12' lg='8'>
                  <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3>Your Results:</h3></Row>
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
