import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import * as responsiveStyles from './responsiveStyles'


export default function useWindowSize() {
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })
  const [sizedStyles, setSizedStyles] = useState(chooseSizedStyles(size, true))
  function chooseSizedStyles(size, init) {
    const screen = size.width > 500 ? 'LARGE' : 'SMALL'
    const matrix = size.width > 700 ? 'LARGE' : 'SMALL'
    if (init) {
      return {
        borderRadius: responsiveStyles.borderRadius,
        chordCrusher: responsiveStyles.chordCrusher[screen],
        music51: responsiveStyles.music51[screen],
        beta: responsiveStyles.beta[screen],
        input: responsiveStyles.inputSize[screen],
        questionText: responsiveStyles.questionText[screen],
        progressTitle: responsiveStyles.progressTitle[screen],
        progressSubtitle: responsiveStyles.progressSubtitle[screen],
        sessionTitle: responsiveStyles.sessionTitle[screen],
        statsTitle: responsiveStyles.statsTitle[screen],
        statsSubtitle: responsiveStyles.statsSubtitle[screen],
        staveSize: responsiveStyles.staveSize[screen],
        matrixSize: responsiveStyles.matrixSize[matrix]
      }
    } else {
      return setSizedStyles({
        borderRadius: responsiveStyles.borderRadius,
        chordCrusher: responsiveStyles.chordCrusher[screen],
        music51: responsiveStyles.music51[screen],
        beta: responsiveStyles.beta[screen],
        input: responsiveStyles.inputSize[screen],
        questionText: responsiveStyles.questionText[screen],
        progressTitle: responsiveStyles.progressTitle[screen],
        progressSubtitle: responsiveStyles.progressSubtitle[screen],
        sessionTitle: responsiveStyles.sessionTitle[screen],
        statsTitle: responsiveStyles.statsTitle[screen],
        statsSubtitle: responsiveStyles.statsSubtitle[screen],
        staveSize: responsiveStyles.staveSize[screen],
        matrixSize: responsiveStyles.matrixSize[matrix]
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
