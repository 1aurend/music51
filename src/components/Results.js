import React from 'react'


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
  noteNames.meanAttempts = mean(noteNames.attempts)
  noteNames.meanTime = mean(noteNames.times)
  roots.meanAttempts = mean(roots.attempts)
  roots.meanTime = mean(roots.times)
  quality.meanAttempts = mean(quality.attempts)
  quality.meanTime = mean(quality.times)
  inversions.meanAttempts = mean(inversions.attempts)
  inversions.meanTime = mean(inversions.times)

  return (
    <>
      <h2>Your Results:</h2>
      <p>Note Names: You averaged {noteNames.meanAttempts} attempts and {noteNames.meanTime} seconds per question.</p>
      <p>Root Notes: You averaged {roots.meanAttempts} attempts and {roots.meanTime} seconds per question.</p>
      <p>Chord Quality: You averaged {quality.meanAttempts} attempts and {quality.meanTime} seconds per question.</p>
      <p>Inversions: You averaged {inversions.meanAttempts} attempts and {inversions.meanTime} seconds per question.</p>
    </>
  )

}
