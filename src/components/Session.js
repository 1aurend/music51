import React, { useContext, useEffect, useState } from 'react'
import { Means, Rounds } from './Context'


export default function SessionMatrix({ round }) {

  const [means, udpateMeans] = useContext(Means)
  const [rounds, updateRounds] = useContext(Rounds)
  const [bestRound, setBest] = useState(null)
  let bestKey

  //need rounds.1 and rounds[round] and best

  useEffect(() => {
    bestKey = means.average.indexOf(Math.min(...means.average))
    setBest(rounds[bestKey])
  }, [])


  if (bestRound) {
    return (
      <>
      <p>Benchmark: 1</p>
      <p>Last: {round}</p>
      <p>Best: {bestKey}</p>
      </>
    )
  }
}
