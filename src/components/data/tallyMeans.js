import { mean, rounded } from '../../utility'


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
  //what happens if this varies from round to round?
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
          }, {})
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
          questionTypes: [...questionTypes, 'Overall']
        }
}
export function tallyMeans(state, data) {
  const { roundMeans, questionTypes } = tallyRound(data)
  const means = state.tally? state.tally : {}
  //left this one for simplicity, but it could be a const structured like means in TallyRound() above
  let tally
  questionTypes.forEach( type => {
    tally = means[type] ? {...tally,
      [type]: {
        attempts: [...means[type].attempts, roundMeans[type].attempts],
        times: [...means[type].times, roundMeans[type].time]
      }} :
      {...tally,
        [type]: {
          attempts: [roundMeans[type].attempts],
          times: [roundMeans[type].time]
        }}
  })
  return {tally: tally, questionTypes: questionTypes}
}
