import React from 'react'


function Results(props) {

  let times = []

  //TODO write all the math here! :)

  // for (var i = 0; i < props.times.length; i++) {
  //   times.push((props.times[i]-props.startTimes[i])/1000)
  // }
  //
  // const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length
  // let average = mean(times)
  // let tries = mean(props.tries)

  return (
    <React.Fragment>
      <h2>Your Results:</h2>
      <p>some seconds average per question</p>
      <p>some tries average per question</p>
      <p>check the browser console for the full log of your session :)</p>
    </React.Fragment>
  )

}

export default Results
