// TODO: refactor this when ready to introduce reducers
import React, { createContext, useState, useReducer } from 'react'
import StartMenu from './logic/StartMenu'
import sessionDataReducer from './reducers/sessionDataReducer'

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
          options: {}
        },
        rounds: {},
        means: {},
        questionTypes: [],
      }
  const [session, dispatch] = useReducer(sessionDataReducer, initialSettings)
  console.log(session)
  const [means, meansDispatch] = useReducer(sessionDataReducer, {})
  console.log(means)
  const [rounds, updateRounds] = useState({})
  return (
      <Session.Provider value={dispatch}>
      <SessionVal.Provider value={session}>
        <Means.Provider value={meansDispatch}>
        <MeansVal.Provider value={means}>
          <Rounds.Provider value={[rounds, updateRounds]}>
              {/*do headline and round need to start here as props?*/}
              {/*also round really shouldn't be a prop*/}
              <StartMenu title={{headline: 'Chord Crusher', beta: '*beta*', subtitle: 'MUSIC 51'}} round={1}/>
          </Rounds.Provider>
        </MeansVal.Provider>
        </Means.Provider>
      </SessionVal.Provider>
      </Session.Provider>
  )
}
