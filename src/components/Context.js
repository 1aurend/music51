import React, { useContext, useState, useEffect } from 'react'
import Start from './Start'
import ProgressChart from './Progress'

export const Progress = React.createContext()
export const Size = React.createContext()

export default function Context() {

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
      <Progress.Provider value={[progress, updateProgress]}>
        <Start title={{headline: 'Music 51', subtitle: 'Chord Crusher', text: 'We recommend 10 chords with a goal of less than 2 seconds per question, but you can enter a different number of chords here for a longer or shorter session:'}}/>
      </Progress.Provider>
    </Size.Provider>
  )
}
