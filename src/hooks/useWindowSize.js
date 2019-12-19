import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'


export default function useWindowSize() {

  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })
  const [sizedStyles, setSizedStyles] = useState(chooseSizedStyles(size, true))

  // TODO: add more breakpoints for better responsive styling
  // TODO: push all border styling in here and out of other components
  // potentially push all of this into a commonStyles file?
  function chooseSizedStyles(size, init) {
    const border = '1rem'
    const title = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '3em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2.5em'}
    const subtitle = size.width > 500 ? {fontFamily: "'Overpass Mono', monospace", textAlign: 'center', fontSize: '2em'} : {fontFamily: "'Overpass Mono', monospace", textAlign: 'center', fontSize: '2em'}
    const beta = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'}
    const inputSize = size >= 500 ? '10vw' : '20vw'
    if (init) {
      return {
        border: border,
        mainTitle: title,
        subtitle: subtitle,
        beta: beta,
        input: inputSize
      }
    } else {
      return setSizedStyles({
        border: border,
        mainTitle: title,
        subtitle: subtitle,
        beta: beta,
        input: inputSize
      })
    }
  }
  const handleResize = () => {
    return setSize({width: window.innerWidth, height: window.innerHeight})
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])
  useLayoutEffect(() => {
    chooseSizedStyles(size, false)
  }, [size])


  return sizedStyles
}
