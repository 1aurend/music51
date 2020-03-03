import React, { useEffect } from 'react'
import SessionOptions from '../buttons/SessionOptions'
import Go from '../buttons/Go'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import {SmallPixelBorderSingle, MegaPixelBorder} from './PixelBorder'
import Marquee from './Marquee'
import Expander from './Expander'
import Instructions from './Instructions'
import {BugWithSpeechBubble} from '../buttons/Bug'
import {Universe, Bento, VFlex, HFlex, Grid} from './Grids'
import Theme from '../Theme'
import {whatDoINeedToKnow} from '../../../whatDoINeedToKnow'
import styled from 'styled-components'
const HFlex10pxTop = styled(HFlex)`
  margin-top:10px;
`

export default function StartScreen({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const { h1, input, largeHSmallV, universeSizing } = sizedStyles
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
          <Bento style={largeHSmallV}>
            <VFlex>
              <MegaPixelBorder>
                <Marquee title={title}/>
              </MegaPixelBorder>
              <HFlex10pxTop>
                <SessionOptions checked={options} onChange={(e) => { numQs.current = e.target.value }} onCheck={onCheck} size={input} />
                <Go onClick={generateQuiz} />
              </HFlex10pxTop>
            </VFlex>
            <VFlex>
              <SmallPixelBorderSingle>
                <div style={{padding:'10px 16px 0 16px'}}>
                  <Instructions />
                </div>
              </SmallPixelBorderSingle>
                <div style={{marginTop:'16px'}}>
                  <Expander infoText={whatDoINeedToKnow}/>
                </div>
            </VFlex>
          </Bento>
          <BugWithSpeechBubble />
        </Universe>
      </div>
    </Theme>
  )
}
