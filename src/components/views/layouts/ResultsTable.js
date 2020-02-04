import React, { useContext, useEffect } from 'react'
import { Means } from '../../Context'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import { rounded } from '../../utility'
import HorizontalTable from '../charts/HorizontalTable'
import VerticalTable from '../charts/VerticalTable'


// QUESTION: when implementing reducers dispatch an update to session data that includes best/worst info?
// TODO: add a better breakpoint for tables?
export default function ResultsTable(props) {
  const { qTypes, round, startOver } = props
  const means = useContext(Means)[0]
  const sizedStyles = useResponsiveStyles()
  const { matrixSize } = sizedStyles

  const perfectRounds = (means.Overall.attempts.filter(average => average === 1)).length
  const greeting = perfectRounds >= 1 ? `Pefection! You completed ${perfectRounds} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  if (matrixSize >= 700) {
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
  } else {
    const verticalTableAtt = qTypes.map( type => {
      return <tr>
              <td>{type[0].toUpperCase()}</td>
              <td>{rounded(means[type].attempts[0], 2)}</td>
              <td>{rounded(means[type].attempts[round-1],2)}</td>
              <td>{rounded(Math.min(...means[type].attempts), 2)}</td>
            </tr>
    })
    const verticalTableT = qTypes.map( type => {
      return <tr>
              <td>{type[0].toUpperCase()}</td>
              <td>{rounded(means[type].times[0], 2)}</td>
              <td>{rounded(means[type].times[round-1],2)}</td>
              <td>{rounded(Math.min(...means[type].times), 2)}</td>
            </tr>
    })
    return <VerticalTable
            greeting={greeting}
            verticalTableAtt={verticalTableAtt}
            verticalTableT={verticalTableT}
            startOver={startOver}
            />
    }
}
