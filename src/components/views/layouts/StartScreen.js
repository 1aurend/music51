import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import SessionOptions from '../buttons/SessionOptions'
import Go from '../buttons/Go'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from './PixelBorder'
import Marquee from './Marquee'
import Expander from './Expander'
import Instructions from './Instructions'
import {Bug, SpeechBubble} from '../buttons/Bug'
import {Grid, Cell, SubCell, BugWrapper} from './Grids'
import Theme from '../Theme'


export default function StartScreen({ title, generateQuiz, numQs, onCheck, options }) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, gridMarquee, gridMain, gridMisc, rowOrCol} = sizedStyles

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Theme>
      <Grid>
        <Cell style={gridMarquee}>
          <MegaPixelBorder>
            <Marquee title={title}/>
          </MegaPixelBorder>
        </Cell>
        <Cell style={gridMain}>
          <SmallPixelBorderSingle>
              <Instructions infoText="In a round of Chord Crusher, you/’ll answer a series of questions about each chord. You can choose the number of chords in a round (if you/’re a newbie, try 5 chords). The goal is to answer questions in a round as quickly as possible, and then to beat your time in each successive round. Will you crush the chords? Or will the chords crush YOU?!"/>
              <Expander infoText="
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat eros eu lacus pretium accumsan. Vestibulum ultricies egestas augue ac auctor. In purus nulla, malesuada sed nulla sit amet, fermentum condimentum ipsum. Suspendisse mi augue, porttitor sit amet sem at, lobortis vehicula sapien. Nullam sit amet risus quis ex maximus volutpat vitae nec quam. Pellentesque rhoncus ligula enim, eu varius turpis dignissim vitae. Quisque finibus, enim et scelerisque pulvinar, nisl sapien maximus massa, id feugiat lacus augue ac diam. Proin cursus quam ut sem maximus aliquam. Phasellus non ornare nulla. Pellentesque non convallis sapien. Sed at nunc enim. Nam posuere imperdiet luctus. Sed eu blandit mi, sed ullamcorper leo. Aliquam lobortis bibendum lectus eget tempus. Sed quis est vel massa rhoncus convallis. Cras posuere egestas nulla. Vivamus turpis leo, convallis nec metus ut, dignissim mattis odio. Aenean consectetur condimentum orci a vehicula."/>
          </SmallPixelBorderSingle>
        </Cell>
        <Cell style={gridMisc}>
          <SubCell style={{alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <SessionOptions checked={options} onChange={(e) => { numQs.current = e.target.value }} onCheck={onCheck} size={input} />
            <Go onClick={generateQuiz} />
          </SubCell>
        </Cell>
        <BugWrapper>
          <SpeechBubble />
          <Bug />
        </BugWrapper>
      </Grid>
    </Theme>
  )
}
