import React, { useContext, useState, useEffect } from 'react'
import Start from './Start'
import ProgressChart from './Progress'

export const Progress = React.createContext()
export const Size = React.createContext()

export default function Context() {

  const [progress, updateProgress] = useState({
          noteNames: [],
          roots: [],
          quality: [],
          inversions: [],
          overall: []
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
        <Start title={{headline: 'Music 51', subtitle: 'Chord Identification'}}/>
      </Progress.Provider>
    </Size.Provider>
  )
}
