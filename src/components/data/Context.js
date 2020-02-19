import React, { createContext, useReducer } from 'react'
import StartMenu from '../logic/StartMenu'
import sessionDataReducer from './sessionDataReducer'

export const Session = createContext()
export const Dispatch = createContext()

export default function Context() {
  const initialSettings = {
        user: 'anonymous for now',
        sessionId: Date.now(), // TODO: come up with a system for this
        settings: {
          numChords: 0,
          options: {}
        },
        rounds: {},
        means: {},
      }
  const [sessionData, dispatch] = useReducer(sessionDataReducer, initialSettings)
  return (
    <Session.Provider value={sessionData}>
      <Dispatch.Provider value={dispatch}>
        {/*do headline and round need to start here as props?*/}
        {/*also round really shouldn't be a prop; can get this from Object.keys(sessionData.rounds)*/}
        <StartMenu title={{headline: 'Chord Crusher', mode: '*non-diatonic mode*', subtitle: 'MUSIC 51'}} round={1}/>
      </Dispatch.Provider>
    </Session.Provider>
  )
}
