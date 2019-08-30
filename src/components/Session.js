import React, { useContext, useEffect, useState } from 'react'
import { Means } from './Context'


export default function SessionMatrix({ round }) {

  const [means, udpateMeans] = useContext(Means)
  const [fast, setFast] = useState()
  const [accurate, setAcc] = useState()

  //need rounds.1 and rounds[round] and best

  useEffect(() => {
    let fastest = {
          noteNames: {
            round: means.noteNames.times.indexOf(Math.min(...means.noteNames.times)),
            time: Math.min(...means.noteNames.times),
          },
          roots: {
            round: means.roots.times.indexOf(Math.min(...means.roots.times)),
            time: Math.min(...means.roots.times),
          },
          quality: {
            round: means.quality.times.indexOf(Math.min(...means.quality.times)),
            time: Math.min(...means.quality.times),
          },
          inversions: {
            round: means.inversions.times.indexOf(Math.min(...means.inversions.times)),
            time: Math.min(...means.inversions.times),
          },
          average: {
            round: means.average.times.indexOf(Math.min(...means.average.times)),
            time: Math.min(...means.average.times),
          }
    }
    let mostAcc = {
          noteNames: {
            round: means.noteNames.attempts.lastIndexOf(Math.min(...means.noteNames.attempts)),
            att: Math.min(...means.noteNames.attempts),
          },
          roots: {
            round: means.roots.attempts.lastIndexOf(Math.min(...means.roots.attempts)),
            att: Math.min(...means.roots.attempts),
          },
          quality: {
            round: means.quality.attempts.lastIndexOf(Math.min(...means.quality.attempts)),
            att: Math.min(...means.quality.attempts),
          },
          inversions: {
            round: means.inversions.attempts.lastIndexOf(Math.min(...means.inversions.attempts)),
            att: Math.min(...means.inversions.attempts),
          },
          average: {
            round: means.average.attempts.lastIndexOf(Math.min(...means.average.attempts)),
            att: Math.min(...means.average.attempts),
          },
          perfect: (means.average.attempts.filter(average => average === 1)).length
    }
    setFast(fastest)
    setAcc(mostAcc)
  }, [means])


  if (accurate) {
    console.log(fast)
    console.log(accurate)
    return (
      <>
      <p>Benchmark: {means.average.times[0]}</p>
      <p>Last: {means.average.times[round-1]}</p>
      <p>Best: {fast.average.time}</p>
      </>
    )
  }
  else {
    return <h2>Loading...</h2>
  }
}
