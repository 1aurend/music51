import React, { useContext, useState } from 'react'
import Context, { Session } from '../Context'
import ChartLayout from '../views/ChartLayout'
import generateChords from '../../generator/chordGenerator'
import RoundStats from './Stats'
import Quiz from './Quiz'
import ResultsTable from '../Session'


export default function EndOfRoundMenu({ round, chartData, qTypes }) {
  const session = useContext(Session)[0]
  const [nextQuiz, setNextQuiz] = useState(false)
  const [endSession, setEndSession] = useState(false)
  const [showStats, setsShowStats] = useState(false)
  const [showStart, setShowStart] = useState(false)

  const nextRound = () => {
    setNextQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  if (nextQuiz) {
    return <Quiz data={nextQuiz} round={round+1}/>
  } else if (endSession) {
    return <ResultsTable round={round} qTypes={qTypes} startOver={setShowStart} />
  } else if (showStats) { /*get rid of Stats.js also?*/
    return <RoundStats round={round} chartData={chartData} qTypes={qTypes} />
  } else if (showStart) {
    return <Context/>
  } else if (round === 1) { /*This isn't the right condition; figure out how to get rid of Stats.js. */
    return <RoundStats round={round} chartData={chartData} qTypes={qTypes} />
  } else {
    return <ChartLayout chartData={chartData} qTypes={qTypes} round={round} finished={setEndSession} viewStats={setsShowStats} nextRound={nextRound} />
  }
}
