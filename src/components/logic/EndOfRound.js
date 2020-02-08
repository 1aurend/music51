import React, { useContext, useState } from 'react'
import Context, { Session } from '../Context'
import ChartLayout from '../views/layouts/ChartLayout'
import generateChords from '../../generator/chordGenerator'
import StatLines from '../views/layouts/StatLines'
import Quiz from './Quiz'
import ResultsTable from '../views/layouts/ResultsTable'


export default function EndOfRoundMenu({ round, chartData, qTypes }) {
  const session = useContext(Session)[0]
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
    return <StatLines round={round} qTypes={qTypes} nextRound={nextRound} setShowStats={setShowStats} finished={setEndSession} />
  } else {
    return <ChartLayout chartData={chartData} qTypes={qTypes} round={round} finished={setEndSession} viewStats={setShowStats} nextRound={nextRound} />
  }
}
