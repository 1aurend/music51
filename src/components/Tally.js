import React, { useContext, useEffect, useRef, useState } from 'react'
import { Means } from './Context'
import RoundStats from './Stats'
import ChartData from './ChartData'
import Loading from './views/Loading'
import { mean, rounded } from './utility'


export function listAttemptsByQuestionType(data, questionType) {
  return (data.map( chord => {
    return chord.questions.filter( question => question.type === questionType )
      .map( question => {
        return question.answers.map(answer => {
          return answer.tries.length
          })
        })
    })
  ).flat(2)
}
export function listTimesByQuestionType(data, questionType) {
  return (data.map( chord => {
    return chord.questions.filter( question => question.type === questionType )
      .map( question => {
        return question.answers.map(answer => {
          return answer.elapsedTime
          })
        })
    })
  ).flat(2)
}
export function tallyRound(data) {
  //still not sure where the best place is for this. Need to create and hold onto this array somewhere so we don't keep iterating through the data to recreate it. Could be at start as context or here and passed down as a prop?
  const questionTypes = new Set((data.map( chord => {
    return chord.questions.map( question => {
      return question.type
    })
  })).flat())
  const means =
    [...questionTypes].map(type => {
      return {
              type: type,
              means: {
                      attempts: rounded(mean(listAttemptsByQuestionType(data, type)),2),
                      time: rounded(mean(listTimesByQuestionType(data, type)),2)
                      }
              }
    }).reduce((obj, item) => {
          obj[item.type] = item.means
            return obj
          } ,{})
  return calculateOverallMeans(means, [...questionTypes])
}
function calculateOverallMeans(means, questionTypes) {
  const overallAttempts = rounded(mean(
    questionTypes.map(type => {
    return means[type].attempts
  })), 2)
  const overallTime = rounded(mean(
    questionTypes.map(type => {
    return means[type].time
  })), 2)
  return {
          roundMeans: {...means, Overall: {
                  attempts: overallAttempts,
                  time: overallTime
                  }},
          questionTypes: questionTypes
        }
}
export function tallyMeans(means, data) {
  const { roundMeans, questionTypes } = tallyRound(data)
  //get rid of mutation here?
  let tally
  questionTypes.forEach( type => {
    //make this a conditional so we don't have to construct the means object back in Start? how does this work if different rounds have different question types?
    tally = {...tally,
      [type]: {
        attempts: [...means[type].attempts, roundMeans[type].attempts],
        times: [...means[type].times, roundMeans[type].time]
      }}
  })
  return tally
}


export default function Tally({ data, round }) {
  const [means, updateMeans] = useContext(Means)
  const meansTally = useState(tallyMeans(means, data))[0]
  const [calculating, done] = useState(true)

  // QUESTION: Why am I storing the current version of the means object in a Ref (tally) and passing it down as a prop rather than grabbing it from Context over in ChartData? This should be fixed so we don't need this tally object. It's probably related to how long it takes to paint the screen with the d3 charts... but I don't remember what render errors I was getting that caused me to use tally.
  // Now that updateMeans uses useCallback this should be a *relatively* easy fix...
  useEffect(() => {
    updateMeans(meansTally)
    return done(false)
  }, [meansTally, updateMeans])

  if (!calculating && round === 1) {
    return <RoundStats round={round}/>
  } else if (!calculating) {
    return <ChartData round={round} data={meansTally}/>
  } else {
    return <Loading />
  }
}
