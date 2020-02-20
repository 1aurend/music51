import { rounded } from '../../utility'
import { questionsList } from '../../generator/questionsList'


export function findYMax(data, qTypes, param) {
  return Math.max(...(qTypes.map( type => {
    return data[type][param]
  })).flat())
}
export function getDataPoints(data, qTypes, param) {
  return qTypes.map(type => {
    return {
      type: type,
      points: data[type][param].map((point, i) => {
        return {x: i+1, y: point, symbol: "square", size: 5}
      }).filter( point => (point.y !== null))
      }
    }).reduce((obj, item) => {
        obj[item.type] = item.points
          return obj
        } ,{})
}
export function getSummaryData(data, param, round) {
  const delta = data.Overall[param][round-1]-data.Overall[param][0]
  return {
    num: Math.abs(rounded(delta, 2)),
    percent: Math.abs(rounded((delta/data.Overall[param][0]*100), 0)),
    verb: delta >= 0 ? 'increased' : 'decreased'
  }
}
export function findThreeLargestDeltas(means, param) {
  const availableTypes = means.questionsCurrentRound.filter( type => type !== 'Overall')
  const deltas = availableTypes.map( type => {
    let delta
    for (let i in means.tally[type][param]) {
      if (means.tally[type][param][i]) {
        delta = Math.abs(means.tally[type][param][means.tally[type][param].length-1]-means.tally[type][param][i])
        break
      }
    }
    return [type, delta]
  })
  deltas.sort((a, b) => {
    return a[1] - b[1]
  })
  return [deltas[deltas.length-1][0], deltas[deltas.length-2][0], deltas[deltas.length-3][0]]
}
export function getChartData(means, round) {
  const categoriesToChartAtt = ['Overall', ...findThreeLargestDeltas(means, 'attempts')]
  const colorScaleAtt = ['#50FA97',
    categoriesToChartAtt.filter( type => type !== 'Overall' ).map( type => {return questionsList[type].chartColor} )
    ]
  const categoriesToChartTime = ['Overall', ...findThreeLargestDeltas(means, 'times')]
  const colorScaleTime = ['#50FA97',
    categoriesToChartTime.filter( type => type !== 'Overall' ).map( type => {return questionsList[type].chartColor} )
    ]
  const data = means.tally
  const chartData = {
    domainMaxYAtt: findYMax(data, categoriesToChartAtt, 'attempts'),
    domainMaxYTime: findYMax(data, categoriesToChartTime, 'times'),
    labelsX: Array(round).fill(1).map((x, i) => x + i),
    categoriesIncluded: [...new Set(categoriesToChartAtt, categoriesToChartTime)],
    categoriesAtt: categoriesToChartAtt,
    categoriesTime: categoriesToChartTime,
    colorScaleAtt: colorScaleAtt,
    colorScaleTime: colorScaleTime,
    data: {
      attempts: getDataPoints(data, categoriesToChartAtt, 'attempts'),
      times: getDataPoints(data, categoriesToChartTime, 'times')
    }
  }
  const progressSummary = {
    attempts: getSummaryData(data, 'attempts', round),
    times: getSummaryData(data, 'times', round)
  }
  return {
    chartData: chartData,
    progressSummary: progressSummary
  }
}
