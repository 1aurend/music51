import React, { useContext, useState } from 'react'
import { Session } from '../Context'
import Quiz from './Quiz'
import ProgressMenu from './ProgressMenu'
import generateChords from '../../generator/chordGenerator'
import StatLines from '../views/StatLines'


export default function RoundStats({ round, chartData, qTypes }) {
  const session = useContext(Session)[0]
  const [quiz, setQuiz] = useState(false)
  const [progressChart, showProgress] = useState(false)

  const nextRound = () => {
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  if (quiz) {
    return <Quiz data={quiz} round={round+1} />
  } else if (progressChart) {
    return <ProgressMenu round={round} chartData={chartData} qTypes={qTypes} />
  } else {
    return <StatLines round={round} qTypes={qTypes} nextRound={nextRound} showProgress={showProgress} />
  }

}
