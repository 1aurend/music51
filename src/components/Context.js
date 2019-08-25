import React, { createContext, useState, useEffect } from 'react'
import Start from './Start'

export const Session = createContext()
export const Progress = createContext()
export const Size = createContext()

export default function Context() {

  const [session, updateSession] = useState({
        user: 'anonymous for now',
        sessionId: Date.now(),
        settings: {
          numChords: 0,
          types: [],
          roots: ''
        },
        means: {
          noteNames: {
            attempts: [],
            times: []
          },
          roots: {
            attempts: [],
            times: []
          },
          quality: {
            attempts: [],
            times: []
          },
          inversions: {
            attempts: [],
            times: []
          },
          average: {
            attempts: [],
            times: []
          }
        },
        rounds: {},
        roundCount: 1
}
  )

  const [progress, updateProgress] = useState({
          attempts: {
            noteNames: [],
            roots: [],
            quality: [],
            inversions: [],
            overall: []
          },
          times: {
            noteNames: [],
            roots: [],
            quality: [],
            inversions: [],
            overall: []
          },
          roundCount: 1
        })

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
        <Start title={{headline: 'Chord Crusher', subtitle: 'Music 51'}}/>
      </Session.Provider>
    </Size.Provider>
  )
}
