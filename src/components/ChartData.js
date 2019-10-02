import React, { useContext, useEffect, useState, useRef } from 'react'
import ProgressChart from './Progress'
import { Means } from './Context'
import {Row, Container, Col} from 'shards-react'



function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

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

  for (var i = 0; i < data[qTypes[i]].attempts.length; i++) {
    chartParams.labelsX.push(i+1)
  }


  let atts = []
  qTypes.map( type => {atts = atts.concat(data[type].attempts)})
  chartParams.domainMaxYAtt = Math.max(...atts)
  let ts = []
  qTypes.map( type => {ts = atts.concat(data[type].times)})
  chartParams.domainMaxYTime = Math.max(...ts)

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

  return([chartParams, progress, verbA, verbT] )

}




export default function ChartData({ round, data }) {

  // const [means, updateMeans] = useContext(Means)
  const [ready, calculated] = useState(false)
  const chartParams = useRef()
  const progress = useRef()
  const verbA = useRef()
  const verbT = useRef()

  let qTypes = Object.keys(data)

    async function chartData() {
      let result = await chartMath(data, qTypes)
      console.log(result);
      chartParams.current = result[0]
      progress.current = result[1]
      verbA.current = result[2]
      verbT.current = result[3]
      console.log(chartParams.current);
      if (!ready) {
        calculated(true)
      }
    }

    if (!chartParams.current) {
      chartData()
    }


  if (ready) {
      return <ProgressChart round={round} chartParams={chartParams.current} qTypes={qTypes} progress={progress.current} verbA={verbA.current} verbT={verbT.current}/>
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
        <Row noGutters style={{paddingTop: '25%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '50%', marginRight: '50%'}} noGutters>
            <h2 style={{color: '#17c671', fontFamily: "'Press Start 2P', cursive"}}>Calculating your progress...</h2>
        </Row>
    </Container>
    )
  }
}
