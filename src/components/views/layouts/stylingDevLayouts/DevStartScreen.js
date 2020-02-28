import React, { useEffect } from 'react'
import SessionOptions from '../../buttons/SessionOptions'
import Go from '../../buttons/Go'
import useResponsiveStyles from '../../../../hooks/useResponsiveStyles'
import {SmallPixelBorderSingle, MegaPixelBorder} from '../PixelBorder'
import Marquee from '../Marquee'
import Expander from '../Expander'
import Instructions from '../Instructions'
import {BugWithSpeechBubble} from '../../buttons/Bug'
import {Universe, Bento, VFlex, HFlex, Grid} from '../Grids'
import Theme from '../../Theme'
import {whatDoINeedToKnow} from '../../../../whatDoINeedToKnow'
import styled from 'styled-components'

export default function DevStartScreen({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const { h1, input, layoutStart, universeSizing } = sizedStyles
  const onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      generateQuiz()
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Theme>
      <div style={{outline:'none'}}
        onKeyDown={(e) => onKeyPressed(e)}
        tabIndex="1"
        ref={keyboard => keyboard && keyboard.focus()}
        >
        <Universe style={universeSizing}>
          <Bento style={layoutStart}>
            <VFlex>
              <MegaPixelBorder>
                <Marquee title={title}/>
              </MegaPixelBorder>
              <HFlex>
                <SessionOptions checked={options} onChange={(e) => { numQs.current = e.target.value }} onCheck={onCheck} size={input} />
                <Go onClick={generateQuiz} />
              </HFlex>
            </VFlex>
            <VFlex>
              <SmallPixelBorderSingle>
                  <Instructions />
              </SmallPixelBorderSingle>
              <Expander infoText={whatDoINeedToKnow}/>
            </VFlex>
          </Bento>
          <BugWithSpeechBubble />
        </Universe>
      </div>
    </Theme>
  )
}
