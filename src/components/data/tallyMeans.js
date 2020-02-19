import { mean, rounded } from '../../utility'
import { questionsList } from '../../generator/questionsList'


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
  const questionsThisRound = [...new Set((data.map( chord => {
    return chord.questions.map( question => {
      return question.type
    })
  })).flat())]
  const means =
    questionsThisRound.map(type => {
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
          }, {})
  return calculateOverallMeans(means, questionsThisRound)
}
function calculateOverallMeans(means, questionsThisRound) {
  const overallAttempts = rounded(mean(
    questionsThisRound.map(type => {
    return means[type].attempts
  })), 2)
  const overallTime = rounded(mean(
    questionsThisRound.map(type => {
    return means[type].time
  })), 2)
  return {
          roundMeans: {...means, Overall: {
                  attempts: overallAttempts,
                  time: overallTime
                  }},
          questionsThisRound: [...questionsThisRound, 'Overall']
        }
}
export function tallyMeans(state, data) {
  const { roundMeans, questionsThisRound } = tallyRound(data)
  const means = state.tally ? state.tally : {}
  //gave up on avoiding mutation here... fix later when data is restructured
  let tally
  Object.keys(questionsList).forEach( type => {
    if (questionsThisRound.includes(type)) {
      tally = means[type] ? {...tally,
        [type]: {
          attempts: [...means[type].attempts, roundMeans[type].attempts],
          times: [...means[type].times, roundMeans[type].time]
        }} :
        {...tally,
          [type]: {
            attempts: [roundMeans[type].attempts],
            times: [roundMeans[type].time]
          }
        }
    } else {
      tally = means[type] ? {...tally,
        [type]: {
          attempts: [...means[type].attempts, null],
          times: [...means[type].times, null]
        }} :
        {...tally,
          [type]: {
            attempts: [null],
            times: [null]
          }
        }
    }
  })
  tally = means.Overall ? {...tally,
    Overall: {
      attempts: [...means.Overall.attempts, roundMeans.Overall.attempts],
      times: [...means.Overall.times, roundMeans.Overall.time]
    }} :
    {...tally,
      Overall: {
        attempts: [roundMeans.Overall.attempts],
        times: [roundMeans.Overall.time]
      }
    }
  // TODO: get questionTypes out of here when we're not using it anymore? or at least label it accurately
  return {tally: tally, questionsCurrentRound: questionsThisRound}
}
