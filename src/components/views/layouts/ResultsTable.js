import React, { useContext, useEffect } from 'react'
import { Session } from '../../data/Context'
import { rounded } from '../../../utility'
// import HorizontalTable from '../charts/HorizontalTable'
import VerticalTable from '../charts/VerticalTable'
import { questionsList } from '../../../generator/questionsList'
import {Bug} from '../buttons/Bug'
import Theme from '../Theme'


function replaceNaNs(num) {
  if (isNaN(num) || num === 0) {
    return 'n/a'
  }
  return num
}

// QUESTION: when implementing reducers dispatch an update to session data that includes best/worst info?
export default function ResultsTable(props) {
  const { round, startOver } = props
  const means = useContext(Session).means.tally
  const qTypes = Object.keys(questionsList)
  const perfectRounds = (means.Overall.attempts.filter(average => average === 1)).length
  const greeting = perfectRounds >= 1 ? `Pefection! You completed ${perfectRounds} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  /*if (tableSize >= 900) {
    const headers = qTypes.map( type => {
      return  <th scope="col" className="border-0">
                {type.toUpperCase()}
              </th>
    })
    const firstRoundAtt = qTypes.map( type => {
      return <td>{rounded(means[type].attempts[0], 2)}</td>
    })
    const lastRoundAtt = qTypes.map( type => {
      return <td>{rounded(means[type].attempts[round-1], 2)}</td>
    })
    const firstRoundT = qTypes.map( type => {
      return <td>{rounded(means[type].times[0], 2)}</td>
    })
    const lastRoundT = qTypes.map( type => {
      return <td>{rounded(means[type].times[round-1], 2)}</td>
    })
    const bestRoundT = qTypes.map( type => {
      return <td>{rounded(Math.min(...means[type].times), 2)}</td>
    })
    const bestRoundAtt = qTypes.map( type => {
      return <td>{rounded(Math.min(...means[type].attempts), 2)}</td>
    })
    return <HorizontalTable
            greeting={greeting}
            headers={headers}
            firstRoundAtt={firstRoundAtt}
            firstRoundT={firstRoundT}
            lastRoundAtt={lastRoundAtt}
            lastRoundT={lastRoundT}
            bestRoundAtt={bestRoundAtt}
            bestRoundT={bestRoundT}
            startOver={startOver}
            />
  } else {*/
    const verticalTableAtt = [
      <tr>
        <td>Total</td>
        <td>{rounded(means.Overall.attempts[0], 2)}</td>
        <td>{rounded(means.Overall.attempts[round-1],2)}</td>
        <td>{rounded(Math.min(...means.Overall.attempts), 2)}</td>
      </tr>,
      qTypes.map( (type, i) => {
      return <tr key={i}>
              <td>{questionsList[type].abbrev}</td>
              <td>{replaceNaNs(rounded(means[type].attempts[0], 2))}</td>
              <td>{replaceNaNs(rounded(means[type].attempts[round-1],2))}</td>
              <td>{replaceNaNs(rounded(Math.min(...means[type].attempts), 2))}</td>
            </tr>
          })
    ]
    const verticalTableT = [
      <tr>
        <td>Total</td>
        <td>{rounded(means.Overall.times[0], 2)}</td>
        <td>{rounded(means.Overall.times[round-1],2)}</td>
        <td>{rounded(Math.min(...means.Overall.times), 2)}</td>
      </tr>,
      qTypes.map( (type, i) => {
        return <tr key={i}>
                <td>{questionsList[type].abbrev}</td>
                <td>{replaceNaNs(rounded(means[type].times[0], 2))}</td>
                <td>{replaceNaNs(rounded(means[type].times[round-1],2))}</td>
                <td>{replaceNaNs(rounded(Math.min(...means[type].times), 2))}</td>
              </tr>
            })
    ]
    return (
      <Theme>
        <VerticalTable
          greeting={greeting}
          verticalTableAtt={verticalTableAtt}
          verticalTableT={verticalTableT}
          startOver={startOver}
          />
        <Bug />
      </Theme>
    )

    /*}*/
}
