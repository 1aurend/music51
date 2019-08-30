import React, { useContext, useEffect, useState, useRef } from 'react'
import ProgressChart from './Progress'
import { Means } from './Context'
import {Row, Container, Col} from 'shards-react'



function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

async function chartMath(noteNames, roots, quality, inversions, average) {

  //question: move structuring of progress data in here so we have a clean progress object for later? that would simplify these domain max calculations

  let chartParams = {
    domainMaxYAtt: 0,
    domainMaxYTime: 0,
    labelsX: [],
    data: {
      attempts: {
        noteNames: [],
        roots: [],
        quality: [],
        inversions: [],
        average: []
      },
      times: {
        noteNames: [],
        roots: [],
        quality: [],
        inversions: [],
        average: []
      }
    }
  }


  for (var i = 0; i < noteNames.attempts.length; i++) {
    chartParams.labelsX.push(i+1)
  }


  let atts = noteNames.attempts.concat(roots.attempts, quality.attempts, inversions.attempts, average.attempts)
  chartParams.domainMaxYAtt = Math.max(...atts)
  let ts = noteNames.times.concat(roots.times, quality.times, inversions.times, average.times)
  chartParams.domainMaxYTime = Math.max(...ts)


  for (var j = 0; j < noteNames.attempts.length; j++) {
    chartParams.data.attempts.noteNames.push({x: j+1, y: noteNames.attempts[j], symbol: "square", size: 5})
    chartParams.data.attempts.roots.push({x: j+1, y: roots.attempts[j], symbol: "square", size: 5})
    chartParams.data.attempts.quality.push({x: j+1, y: quality.attempts[j], symbol: "square", size: 5})
    chartParams.data.attempts.inversions.push({x: j+1, y: inversions.attempts[j], symbol: "square", size: 5})
    chartParams.data.attempts.average.push({x: j+1, y: average.attempts[j], symbol: "square", size: 5})
  }
  for (var k = 0; k < noteNames.times.length; k++) {
    chartParams.data.times.noteNames.push({x: k+1, y: noteNames.times[k], symbol: "square", size: 5})
    chartParams.data.times.roots.push({x: k+1, y: roots.times[k], symbol: "square", size: 5})
    chartParams.data.times.quality.push({x: k+1, y: quality.times[k], symbol: "square", size: 5})
    chartParams.data.times.inversions.push({x: k+1, y: inversions.times[k], symbol: "square", size: 5})
    chartParams.data.times.average.push({x: k+1, y: average.times[k], symbol: "square", size: 5})
  }

  let attChange = average.attempts[0]-average.attempts[average.attempts.length-1]
  let timeChange = average.times[0]-average.times[average.times.length-1]
  let progress = {
    numAtt: rounded(attChange, 2) >= 0 ? rounded(attChange, 2) : -rounded(attChange, 2),
    percentAtt: rounded(((attChange/average.attempts[0])*100),0) >= 0 ? rounded(((attChange/average.attempts[0])*100),0) : -rounded(((attChange/average.attempts[0])*100),0),
    secs: rounded(timeChange, 2) >= 0 ? rounded(timeChange, 2) : -rounded(timeChange, 2),
    percentTime: rounded(((timeChange/average.times[0])*100),0) >= 0 ? rounded(((timeChange/average.times[0])*100),0) : -rounded(((timeChange/average.times[0])*100),0)
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

    let noteNames = data.noteNames
    let roots = data.roots
    let quality = data.quality
    let inversions = data.inversions
    let average = data.average

    async function chartData() {
      let result = await chartMath(noteNames, roots, quality, inversions, average)
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
      return <ProgressChart round={round} chartParams={chartParams.current} progress={progress.current} verbA={verbA.current} verbT={verbT.current}/>
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row noGutters style={{paddingTop: '5%'}}></Row>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
            <h2 style={{color: '#17c671'}}>Calculating your progress...</h2>
        </Row>
    </Container>
    )
  }
}
