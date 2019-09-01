import React, { useContext, useEffect, useRef } from 'react'
import { Means } from './Context'
import RoundStats from './Stats'
import ChartData from './ChartData'
import { Container, Row, Col } from 'shards-react'



export default function Tally({ data, round }) {

  console.log(data);
  console.log(round);

  const [means, updateMeans] = useContext(Means)
  const tally = useRef()

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
        function rounded(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

      noteNames.meanAttempts = rounded(mean(noteNames.attempts),2)
      noteNames.meanTime = rounded(mean(noteNames.times),2)
      roots.meanAttempts = rounded(mean(roots.attempts),2)
      roots.meanTime = rounded(mean(roots.times),2)
      quality.meanAttempts = rounded(mean(quality.attempts),2)
      quality.meanTime = rounded(mean(quality.times),2)
      inversions.meanAttempts = rounded(mean(inversions.attempts),2)
      inversions.meanTime = rounded(mean(inversions.times),2)
      overall.attempts = (noteNames.meanAttempts+roots.meanAttempts+quality.meanAttempts+inversions.meanAttempts)/4
      overall.time = (noteNames.meanTime+roots.meanTime+quality.meanTime+inversions.meanTime)/4



    useEffect(() => {
        tally.current = {
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

        updateMeans(tally.current)
        console.log('here is progress: ' + JSON.stringify(tally));
    }, [])


  if (round === 1) {
    return <RoundStats round={round}/> //need to add some props here so benchmark language displays?
  }
  else if (tally.current) {
    return <ChartData round={round} data={tally.current}/>
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
        <Row style={{paddingTop: '25%', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}></Row>
        <Col sm='12' lg='12'>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
              <h2 style={{color: '#17c671', fontFamily: "'Press Start 2P', cursive"}}>Calculating your progress...</h2>
          </Row>
        </Col>
    </Container>
    )
  }
}
