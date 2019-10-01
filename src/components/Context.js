import React, { createContext, useState, useEffect } from 'react'
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
  const [means, updateMeans] = useState({})
  const [rounds, updateRounds] = useState({})
  const [count, increment] = useState(1)
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })


  useEffect(() => {
    const handleResize = () => setSize({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
  }
  },[])


  return (
    <Size.Provider value={size}>
      <Session.Provider value={[session, updateSession]}>
        <Means.Provider value={[means, updateMeans]}>
          <Rounds.Provider value={[rounds, updateRounds]}>
            <Count.Provider value={[count, increment]}>
                  <Start title={{headline: 'Chord Crusher', beta: '*beta*', subtitle: 'MUSIC 51'}} round={1}/>
            </Count.Provider>
          </Rounds.Provider>
        </Means.Provider>
      </Session.Provider>
    </Size.Provider>
  )
}
