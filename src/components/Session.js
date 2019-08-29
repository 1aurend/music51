import React, { useContext, useEffect, useState } from 'react'
import { Means } from './Context'


export default function SessionMatrix({ round }) {

  const [means, udpateMeans] = useContext(Means)
  const [bestRound, setBest] = useState(null)
  const [ready, done] = useState(false)

  //need rounds.1 and rounds[round] and best

  useEffect(() => {
    let best = Math.min(...means.average.times)
    console.log(best);
    let bestIndex = means.average.times.indexOf(best)
    console.log(bestIndex);
    setBest(bestIndex)
  }, [means.average.times])


  if (bestRound >= 0) {
    return (
      <>
      <p>Benchmark: {means.average.times[0]}</p>
      <p>Last: {means.average.times[round-1]}</p>
      <p>Best: {means.average.times[bestRound]}</p>
      </>
    )
  }
  else {
    return <h2>Loading...</h2>
  }
}
