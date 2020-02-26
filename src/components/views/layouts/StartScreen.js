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
              <Expander infoText="Chord Crusher breaks apart the mental steps you take to identify a chord. Each step draws on some piece of knowledge you’ve gained in Music 51. <br> For the first three questions, you’ll need to be able to:<ul>name the notes you see on the staff,
              -   identify which of those notes is the root note of the chord,
              -   know which Major and minor keys correspond to a given key signature,
              -   and translate the root note to a degree of the key.</ul>

              Here in non-diatonic mode, you will get some chords that are not a part of the key. So your next step is to identify whether the chord is:

              -   in the key (a diatonic triad or seventh chord),
              -   a “Chromatic Variation” (a Neapolitan or Augmented Sixth chord),
              -   Mode Mixture (borrowed from the relative Major or minor key), or
              -   an Applied Chord (borrowed from a non-relative key).

              These groupings will help you narrow down the specific chord type, which you’ll identify by its chord symbol or roman numeral. For example, if it’s a Chromatic Variation, is it a N6, It+6, Fr+6, or Ger+6 chord? If it’s an Applied Chord, is it V/V, V7/iv, etc. This means you’ll want to know:

              -   which types of chords are part of the above groupings,
              -   how to recognize the symbol for each type of chord,
              -   whether the chord’s quality gives it a capital or lower-case roman numeral, and
              -   how this compares to the diatonic roman numerals for Major or minor keys.

              And finally, once you’ve got the chord type, you’ll need to identify:

              -   the chord’s inversion using figured bass symbols, and
              -   in the cases of Chromatic Variation or Applied Chords, which chord is most likely to follow.

              You’ve got this! All these are concepts we’ve covered in class, and you can always refer to *Nuts+Bolts* or reach out to the teaching staff if you have any questions.
"/>
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
