import React, { useContext, useState } from 'react'
import Context, { SessionVal } from '../Context'
import ChartLayout from '../views/layouts/ChartLayout'
import generateChords from '../../generator/chordGenerator'
import StatLines from '../views/layouts/StatLines'
import Quiz from './Quiz'
import ResultsTable from '../views/layouts/ResultsTable'
import ChartData from '../actions/ChartData'
import Loading from '../views/layouts/Loading'


export default function EndOfRoundMenu({ round, chartData, qTypes }) {
  const session = useContext(SessionVal)
  const [nextQuiz, setNextQuiz] = useState(false)
  const [endSession, setEndSession] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showStart, setShowStart] = useState(false)

  const nextRound = () => {
    setNextQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  if (nextQuiz) {
    return <Quiz data={nextQuiz} round={round+1}/>
  } else if (showStart) {
    return <Context/>
  } else if (endSession) {
    return <ResultsTable round={round} qTypes={qTypes} startOver={setShowStart} />
  } else if (showStats || round === 1) {
    return <StatLines round={round} nextRound={nextRound} setShowStats={setShowStats} finished={setEndSession} />
  } else if (chartData) {
    return <ChartLayout chartData={chartData} round={round} finished={setEndSession} viewStats={setShowStats} nextRound={nextRound} />
  } else {
    return <ChartData round={round} />
  }
}
