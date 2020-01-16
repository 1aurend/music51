import React, { useContext, useState } from 'react'
import { Session } from './Context'
import ChartLayout from './views/ChartLayout'
import generateChords from '../chordGenerator'
import RoundStats from './Stats'
import Quiz from './Quiz'
import SessionMatrix from './Session'


export default function ProgressMenu({ round, chartData, qTypes }) {
  const session = useContext(Session)[0]
  const [quiz, setQuiz] = useState(false)
  const [done, finished] = useState(false)
  const [stats, viewStats] = useState(false)

  const nextRound = () => {
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  if (quiz) {
    return <Quiz data={quiz} round={round+1}/>
  } else if (done) {
    return <SessionMatrix round={round} qTypes={qTypes} />
  } else if (stats) {
    return <RoundStats round={round} chartData={chartData} qTypes={qTypes} />
  } else {
    return <ChartLayout chartData={chartData} qTypes={qTypes} round={round} finished={finished} viewStats={viewStats} nextRound={nextRound} />
  }
}
