import React, { useEffect } from 'react'
import SessionOptions from '../buttons/SessionOptions'
import Go from '../buttons/Go'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import {SmallPixelBorderSingle, MegaPixelBorder} from './PixelBorder'
import Marquee from './Marquee'
import Expander from './Expander'
import Instructions from './Instructions'
import {BugWithSpeechBubble} from '../buttons/Bug'
import {Universe, Grid, Appetizer, Entree, Dessert, SubCellMargin} from './Grids'
import Theme from '../Theme'
import {whatDoINeedToKnow} from '../../../whatDoINeedToKnow'


export default function StartScreen({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const { input, layoutInfo } = sizedStyles
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
        <Universe>
          <Grid style={layoutInfo}>
            <Appetizer>
              <MegaPixelBorder>
                <Marquee title={title}/>
              </MegaPixelBorder>
            </Appetizer>
            <Entree>
              <SmallPixelBorderSingle>
                  <Instructions infoText="In a round of Chord Crusher, you/’ll answer a series of questions about each chord. You can choose the number of chords in a round (if you/’re a newbie, try 5 chords). The goal is to answer questions in a round as quickly as possible, and then to beat your time in each successive round. Will you crush the chords? Or will the chords crush YOU?!"/>
              </SmallPixelBorderSingle>
              <Expander infoText={whatDoINeedToKnow}/>
            </Entree>
            <Dessert>
              <SubCellMargin>
                <SessionOptions checked={options} onChange={(e) => { numQs.current = e.target.value }} onCheck={onCheck} size={input} />
                <Go onClick={generateQuiz} />
              </SubCellMargin>
            </Dessert>
          </Grid>
          <BugWithSpeechBubble />
        </Universe>
      </div>
    </Theme>
  )
}
