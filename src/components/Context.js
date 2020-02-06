// TODO: refactor this when ready to introduce reducers
import React, { createContext, useState, useCallback, useReducer } from 'react'
import StartMenu from './logic/StartMenu'
import sessionDataReducer from './actions/sessionDataReducer'

export const Session = createContext()
export const SessionVal = createContext()
export const Means = createContext()
export const MeansVal = createContext()
export const Rounds = createContext()
export const Chart = createContext()
export const ChartData = createContext()

export default function Context() {
  const initialSettings = {
        user: 'anonymous for now',
        sessionId: Date.now(),
        settings: {
          numChords: 0,
          types: [],
          roots: '',
          options: {}
        }
      }
  const [session, dispatch] = useReducer(sessionDataReducer, initialSettings)
  console.log(session)
  const [means, meansDispatch] = useReducer(sessionDataReducer, {})
  console.log(means)
  const [chart, chartDispatch] = useReducer(sessionDataReducer, null)
  // console.log(chart)
  // const updateMeans = useCallback(val => setMeans(val), [])
  const [rounds, updateRounds] = useState({})
  // TODO: read more about passing arrays to a provider. does this create a new array each time as is the case for objects?
  return (
      <Session.Provider value={dispatch}>
      <SessionVal.Provider value={session}>
        <Means.Provider value={meansDispatch}>
        <MeansVal.Provider value={means}>
          <Chart.Provider value={chartDispatch}>
          <ChartData.Provider value={chart}>
          <Rounds.Provider value={[rounds, updateRounds]}>
              {/*do headline and round need to start here as props?*/}
              {/*also round really shouldn't be a prop*/}
              <StartMenu title={{headline: 'Chord Crusher', beta: '*beta*', subtitle: 'MUSIC 51'}} round={1}/>
          </Rounds.Provider>
          </ChartData.Provider>
        </Chart.Provider>
        </MeansVal.Provider>
        </Means.Provider>
      </SessionVal.Provider>
      </Session.Provider>
  )
}
