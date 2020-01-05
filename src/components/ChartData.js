import React, { useContext, useEffect, useState, useRef } from 'react'
import ProgressChart from './Progress'
import { Means } from './Context'
import Loading from './views/Loading'
import { rounded } from './utility'



async function chartMath(data, qTypes) {

  //question: move structuring of progress data in here so we have a clean progress object for later? that would simplify these domain max calculations

  let chartParams = {
    domainMaxYAtt: 0,
    domainMaxYTime: 0,
    labelsX: [],
    data: {
      attempts: {
      },
      times: {
      }
    }
  }
  console.log(data[qTypes[0]]);
  for (var i = 0; i < data[qTypes[0]].attempts.length; i++) {
    chartParams.labelsX.push(i+1)
  }

  let atts = []
  qTypes.map( type => {atts = atts.concat(data[type].attempts)})
  console.log(atts)
  chartParams.domainMaxYAtt = Math.max(...atts)
  let ts = []
  qTypes.map( type => {ts = atts.concat(data[type].times)})
  chartParams.domainMaxYTime = Math.max(...ts)

  //make these nested .map() to get rid of use of spread
  qTypes.map(type => {
    let dataPoints = []
    for (var j = 0; j < data[type].attempts.length; j++) {
      dataPoints.push({x: j+1, y: data[type].attempts[j], symbol: "square", size: 5})
    }
    chartParams.data.attempts = {...chartParams.data.attempts, [type]: dataPoints}
  })
  qTypes.map(type => {
    let dataPoints = []
    for (var k = 0; k < data[type].times.length; k++) {
      dataPoints.push({x: k+1, y: data[type].times[k], symbol: "square", size: 5})
    }
    chartParams.data.times = {...chartParams.data.times, [type]: dataPoints}
  })

  console.log(chartParams.data)
  let attChange = chartParams.data.attempts.Overall[0].y-chartParams.data.attempts.Overall[chartParams.data.attempts.Overall.length-1].y
  let timeChange = chartParams.data.times.Overall[0].y-chartParams.data.times.Overall[chartParams.data.times.Overall.length-1].y
  let progress = {
    numAtt: rounded(attChange, 2) >= 0 ? rounded(attChange, 2) : -rounded(attChange, 2),
    percentAtt: rounded(((attChange/chartParams.data.attempts.Overall[0].y)*100),0) >= 0 ? rounded(((attChange/chartParams.data.attempts.Overall[0].y)*100),0) : -rounded(((attChange/chartParams.data.attempts.Overall[0].y)*100),0),
    secs: rounded(timeChange, 2) >= 0 ? rounded(timeChange, 2) : -rounded(timeChange, 2),
    percentTime: rounded(((timeChange/chartParams.data.times.Overall[0].y)*100),0) >= 0 ? rounded(((timeChange/chartParams.data.times.Overall[0].y)*100),0) : -rounded(((timeChange/chartParams.data.times.Overall[0].y)*100),0)
  }
  let verbA = rounded(attChange, 2) >= 0 ? 'decreased' : 'increased'
  let verbT = rounded(timeChange, 2) >= 0 ? 'decreased' : 'increased'

  console.log(chartParams);

  return {
    chartParams: chartParams,
    progress: progress,
    verbA: verbA,
    verbT: verbT
  }

}




export default function ChartData({ round, questionTypes }) {
  const means = useRef(useContext(Means)[0])
  const [ready, setReady] = useState(false)
  const [chartData, setData] = useState(null)

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      (async () => {
        const result = await chartMath(means.current, questionTypes)
        setData(result)
      })()
    }
    return () => {cancel = true}
  }, [questionTypes])

  useEffect(() => {
    if (chartData) {
      setReady(true)
    }
  }, [chartData])

  if (ready) {
      return <ProgressChart round={round} chartData={chartData} qTypes={questionTypes}/>
  }
  else {
    return <Loading />
  }
}
