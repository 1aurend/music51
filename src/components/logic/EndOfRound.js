import React, { useContext, useState, useEffect, useRef } from 'react'
import Context, { Session } from '../data/Context'
import ChartLayout from '../views/layouts/ChartLayout'
import generateChords from '../../generator/chordGenerator'
import StatLines from '../views/layouts/StatLines'
import Quiz from './Quiz'
import ResultsTable from '../views/layouts/ResultsTable'
import { getChartData } from '../data/getChartData'
import Loading from '../views/layouts/Loading'


export default function EndOfRoundMenu({ round }) {
  const session = useContext(Session)
  const means = useRef(useContext(Session).means)
  const [nextQuiz, setNextQuiz] = useState(false)
  const [endSession, setEndSession] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showStart, setShowStart] = useState(false)
  const [chartData, setChartData] = useState(false)

  const nextRound = () => {
    setNextQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  useEffect(() => {
    if (round !== 1) {
      (async () => {
        const result = await getChartData(means.current, round)
        setTimeout(() => setChartData(result), 100)
      })()
    }
  }, [round])

  if (nextQuiz) {
    return <Quiz data={nextQuiz} round={round+1}/>
  } else if (showStart) {
    return <Context/>
  } else if (endSession) {
    return <ResultsTable round={round} startOver={setShowStart} />
  } else if (showStats || round === 1) {
    return <StatLines round={round} nextRound={nextRound} setShowStats={setShowStats} finished={setEndSession} />
  } else if (chartData) {
    return <ChartLayout chartData={chartData} round={round} finished={setEndSession} viewStats={setShowStats} nextRound={nextRound} />
  } else {
    return <Loading />
  }
}
