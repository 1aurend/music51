import React, { useContext, useEffect, useRef, useState } from 'react'
import { Means } from './Context'
import RoundStats from './Stats'
import ChartData from './ChartData'
import Loading from './Loading'
import { mean, rounded } from './utility'


export function listAttemptsbyQuestionType(data, questionType) {
  return (data.map( chord => {
    return chord.questions.map( question => {
      if (question.type === questionType) {
        return question.answers.map( answer => {
          return answer.tries.length
        })
      }
      return null
    })
  })).flat(2).filter(val => val !== null)
}
export function listTimesbyQuestionType(data, questionType) {
  return (data.map( chord => {
    return chord.questions.map( question => {
      if (question.type === questionType) {
        return question.answers.map( answer => {
          return answer.elapsedTime
        })
      }
      return null
    })
  })).flat(2).filter(val => val !== null)
}
export function tallyRound(data) {
  const questionTypes = new Set((data.map( chord => {
    return chord.questions.map( question => {
      return question.type
    })
  })).flat())
  let means = {}
  questionTypes.forEach(type => {
    means[type] = {
      attempts: rounded(mean(listAttemptsbyQuestionType(data, type)),2),
      time: rounded(mean(listTimesbyQuestionType(data, type)),2)
    }
  })
  return calculateOverallMeans(means, questionTypes)
}
function calculateOverallMeans(means, questionTypes) {
  const overallAttempts = rounded(mean(
    [...questionTypes].map(type => {
    return means[type].attempts
  })), 2)
  const overallTime = rounded(mean(
    [...questionTypes].map(type => {
    return means[type].time
  })), 2)
  return {...means, Overall: {
    attempts: overallAttempts,
    time: overallTime
  }}
}


export default function Tally({ data, round }) {
  const [means, updateMeans] = useContext(Means)
  const roundTally = useState(tallyRound(data))[0]
  const [calculating, done] = useState(true)
  const tally = useRef()

  useEffect(() => {
    const questionTypes = Object.keys(roundTally)
    questionTypes.forEach( type => {
      tally.current = {...tally.current,
        [type]: {
          attempts: [...means[type].attempts, roundTally[type].attempts],
          times: [...means[type].times, roundTally[type].time]
        }}
    })
    updateMeans(tally.current)
    return done(false)
  }, [roundTally, updateMeans, round, means])

  if (!calculating && round === 1) {
    return <RoundStats round={round}/>
  } else if (!calculating) {
    return <ChartData round={round} data={tally.current}/>
  } else {
    return <Loading />
  }
}
