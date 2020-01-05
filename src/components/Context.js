import React, { createContext, useState, useCallback } from 'react'
import Start from './Start'

export const Session = createContext()
export const Means = createContext()
export const Rounds = createContext()
export const Count = createContext()
export const Progress = createContext()
export const Size = createContext()

export default function Context() {
  const [session, updateSession] = useState({
        user: 'anonymous for now',
        sessionId: Date.now(),
        settings: {
          numChords: 0,
          types: [],
          roots: '',
          options: {}
        }
      })
  const [means, setMeans] = useState({})
  const updateMeans = useCallback((val) => setMeans(val), [])
  const [rounds, updateRounds] = useState({})
  const [count, increment] = useState(1)
  return (
      <Session.Provider value={[session, updateSession]}>
        <Means.Provider value={[means, updateMeans]}>
          <Rounds.Provider value={[rounds, updateRounds]}>
            <Count.Provider value={[count, increment]}>
              {/*do headline and round need to start here as props?*/}
              <Start title={{headline: 'Chord Crusher', beta: '*beta*', subtitle: 'MUSIC 51'}} round={1}/>
            </Count.Provider>
          </Rounds.Provider>
        </Means.Provider>
      </Session.Provider>
  )
}
