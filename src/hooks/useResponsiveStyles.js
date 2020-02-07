import { useState, useEffect, useLayoutEffect } from 'react'
import * as responsiveStyles from './responsiveStyles'


export default function useResponsiveStyles() {
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })
  const [sizedStyles, setSizedStyles] = useState(chooseSizedStyles(size, true))
  function chooseSizedStyles(size, init) {
    const screen = size.width > 500 ? 'LARGE' : 'SMALL'
    const matrix = size.width > 900 ? 'LARGE' : 'SMALL'
    if (init) {
      return {
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
        matrixSize: responsiveStyles.matrixSize[matrix],
        loadingMargin: responsiveStyles.loadingMargin[screen]
      }
    } else {
      return setSizedStyles({
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
        matrixSize: responsiveStyles.matrixSize[matrix],
        loadingMargin: responsiveStyles.loadingMargin[screen]
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
