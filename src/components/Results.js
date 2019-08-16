import React from 'react'
import { Row } from 'shards-react'


export default function Results({ data }) {

  console.log(JSON.stringify(data, null, 4));

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

  data.results.map( chord => {
    chord.questions.map( question => {
      if (question.text.indexOf('pitches') !== -1) {
        question.answers.map( answer => {
            noteNames.attempts.push(answer.tries.length)
            noteNames.times.push(answer.elapsedTime)
        })
      }
      else if (question.text.indexOf('root') !== -1) {
        question.answers.map( answer => {
            roots.attempts.push(answer.tries.length)
            roots.times.push(answer.elapsedTime)
        })
      }
      else if (question.text.indexOf('quality') !== -1) {
        question.answers.map( answer => {
            quality.attempts.push(answer.tries.length)
            quality.times.push(answer.elapsedTime)
        })
      }
      else if (question.text.indexOf('inversion') !== -1) {
        question.answers.map( answer => {
            inversions.attempts.push(answer.tries.length)
            inversions.times.push(answer.elapsedTime)
        })
      }
    })})


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

  return (
    <>
      <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3>Your Results:</h3></Row>
      <Row><p><strong>Note Names: </strong>You averaged <strong>{noteNames.meanAttempts}</strong> attempts and <strong>{noteNames.meanTime}</strong> seconds per question.</p></Row>
      <Row><p><strong>Root Notes: </strong>You averaged <strong>{roots.meanAttempts}</strong> attempts and <strong>{roots.meanTime}</strong> seconds per question.</p></Row>
      <Row><p><strong>Chord Quality: </strong>You averaged <strong>{quality.meanAttempts}</strong> attempts and <strong>{quality.meanTime}</strong> seconds per question.</p></Row>
      <Row><p><strong>Inversions: </strong>You averaged <strong>{inversions.meanAttempts}</strong> attempts and <strong>{inversions.meanTime}</strong> seconds per question.</p></Row>
    </>
  )

}
