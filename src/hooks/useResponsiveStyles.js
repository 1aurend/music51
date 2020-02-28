import { useState, useEffect, useLayoutEffect } from 'react'
import * as responsiveStyles from './responsiveStyles'


export default function useResponsiveStyles() {
  const [size, setSize] = useState({
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  })
  const [sizedStyles, setSizedStyles] = useState(chooseSizedStyles(size, true))
  function chooseSizedStyles(size, init) {
    const screen = size.width >= 1024 ? 'LARGE' : 'SMALL'
    const table = size.width >= 1024 ? 'LARGE' : 'SMALL'
    if (init) {
      return {
        h1: responsiveStyles.h1[screen],
        h2: responsiveStyles.h2[screen],
        h3: responsiveStyles.h3[screen],
        h4: responsiveStyles.h4[screen],
        h5: responsiveStyles.h5[screen],
        para: responsiveStyles.para[screen],
        universeSizing: responsiveStyles.universeSizing[screen],
        layoutInfo: responsiveStyles.layoutInfo[screen],
        layoutQuiz: responsiveStyles.layoutQuiz[screen],
        layoutStart: responsiveStyles.layoutStart[screen],
        input: responsiveStyles.input[screen],
        questionText: responsiveStyles.questionText[screen],
        progressTitle: responsiveStyles.progressTitle[screen],
        progressSubtitle: responsiveStyles.progressSubtitle[screen],
        sessionTitle: responsiveStyles.sessionTitle[screen],
        statsTitle: responsiveStyles.statsTitle[screen],
        statsSubtitle: responsiveStyles.statsSubtitle[screen],
        staveSize: responsiveStyles.staveSize[screen],
        tableSize: responsiveStyles.tableSize[table],
        loadingMargin: responsiveStyles.loadingMargin[screen],
        answerChoiceSize: responsiveStyles.answerChoiceSize[screen]
      }
    } else {
      return setSizedStyles({
        h1: responsiveStyles.h1[screen],
        h2: responsiveStyles.h2[screen],
        h3: responsiveStyles.h3[screen],
        h4: responsiveStyles.h4[screen],
        h5: responsiveStyles.h5[screen],
        para: responsiveStyles.para[screen],
        universeSizing: responsiveStyles.universeSizing[screen],
        layoutInfo: responsiveStyles.layoutInfo[screen],
        layoutQuiz: responsiveStyles.layoutQuiz[screen],
        layoutStart: responsiveStyles.layoutStart[screen],
        input: responsiveStyles.input[screen],
        questionText: responsiveStyles.questionText[screen],
        progressTitle: responsiveStyles.progressTitle[screen],
        progressSubtitle: responsiveStyles.progressSubtitle[screen],
        sessionTitle: responsiveStyles.sessionTitle[screen],
        statsTitle: responsiveStyles.statsTitle[screen],
        statsSubtitle: responsiveStyles.statsSubtitle[screen],
        staveSize: responsiveStyles.staveSize[screen],
        tableSize: responsiveStyles.tableSize[table],
        loadingMargin: responsiveStyles.loadingMargin[screen],
        answerChoiceSize: responsiveStyles.answerChoiceSize[screen]
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
