import React, { useContext, useEffect, useState, useRef } from 'react'
import EndOfRound from '../logic/EndOfRound'
import { MeansVal } from '../Context'
import Loading from '../views/layouts/Loading'
import { rounded } from '../utility'


export function findYMax(data, qTypes, param) {
  return Math.max(...(qTypes.map( type => {
    return data[type][param]
  })).flat())
}
export function getDataPoints(data, qTypes, param) {
  return qTypes.map(type => {
    return {
      type: type,
      points: data[type][param].map( (point, i) => {
       return {x: i+1, y: point, symbol: "square", size: 5}
       })
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
// TODO: get a prototype data set for testing this function
export function getChartData(means, round) {
  const data = means.tally
  const qTypes = means.questionTypes
  const chartData = {
    domainMaxYAtt: findYMax(data, qTypes, 'attempts'),
    domainMaxYTime: findYMax(data, qTypes, 'times'),
    labelsX: Array(round).fill(1).map((x, i) => x + i),
    legend: qTypes.map( type => {
      return { name: type.toUpperCase(), labels: {fontSize: 10, fontFamily: "'Overpass Mono', monospace"}, symbol: {type: 'square'}}
    }),
    data: {
      attempts: getDataPoints(data, qTypes, 'attempts'),
      times: getDataPoints(data, qTypes, 'times')
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


export default function ChartData({ round }) {
  const means = useRef(useContext(MeansVal))
  const [chartData, setData] = useState(false)
  console.log(chartData);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const result = await getChartData(means.current, round)
      if (!ignore) setData(result)
    })()
    return () => {ignore = true}
  }, [round])

  if (chartData) {
    return <EndOfRound round={round} chartData={chartData} />
  } else {
    return <Loading round={round} />
  }
}
