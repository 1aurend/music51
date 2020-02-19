import React, { useEffect, useContext } from 'react'
import {
  Container,
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import NavButtons from '../buttons/RoundEndNav'
import Chart from '../charts/ProgressChart'
import styled from 'styled-components'
import { Session } from '../../data/Context'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, SmallPixelBorderOutline, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from './PixelBorder'
import {Grid, Cell, SubCell} from './Grids'
import Theme from '../Theme'

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
`
const StyledCenterPane = styled(Col)`
  border: 5px solid black;
  border-radius: 1rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  background-color: #e5e6eb;
`
const StatsH3 = styled.h3`
color: ${props => props.theme.colors.tertiary};
`
const StatsH4 = styled.h4`
color: ${props => props.theme.colors.light};
.category {
  color: ${props => props.theme.colors.light};
  font-weight: 600;
}
.num {
  color: ${props => props.theme.colors.secondary};
}
`
// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function ChartLayout({ chartData, round, finished, viewStats, nextRound }) {
  const qTypes = chartData.chartData.categoriesIncluded
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, gridMarquee, gridMain, gridMisc, rowOrCol, progressTitle, progressSubtitle } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  return (
    <Theme>
      <Grid>
        <Cell style={gridMarquee}>
          <MegaPixelBorder>
            <h1 style={h1}>Round {round} Complete!</h1>
          </MegaPixelBorder>
        </Cell>
        <Cell style={gridMain}>
          <SubCell>
            <SmallPixelBorderOutline>
              <StatsH3 style={h3}>Here's Your Progress:</StatsH3>
              <StyledRow>
                <StatsH4 style={h4}>
                  <span class='category'>
                    attempts:
                  </span><br />
                   Your total attempt count{'\u00A0'}
                  <span style={vAColor}>
                    {verbA}{'\u00A0'}
                  </span>
                   by{'\u00A0'}
                  <span class='num'>
                    {attemptsSummary.num}{'\u00A0'}
                  </span>
                   attempts per question or{'\u00A0'}
                  <span class='num'>
                    {`${attemptsSummary.percent}%`}
                  </span>
                  .
                </StatsH4>
              </StyledRow>
              <StyledRow>
                <StatsH4 style={h4}>
                  <span class='category'>
                    time:
                  </span><br />
                  Your overall time{'\u00A0'}
                  <span style={vTColor}>
                    {verbT}{'\u00A0'}
                  </span>
                   by{'\u00A0'}
                  <span class='num'>
                    {timesSummary.num}{'\u00A0'}
                  </span>
                   seconds per question or{'\u00A0'}
                  <span class='num'>
                    {`${timesSummary.percent}%`}
                  </span>
                  .
                </StatsH4>
              </StyledRow>
            </SmallPixelBorderOutline>
          </SubCell>
          <SubCell>
            <SmallPixelBorderSingle>
                <StatsH3 style={h3}>Here's what changed the most this round!</StatsH3>
              <StyledRow margintop='5%'>
                <Chart showLegend={false} chartData={chartData} qTypes={qTypes} metric={'attempts'} />
              </StyledRow>
              <StyledRow margintop='-50'>
                <Chart showLegend={false} chartData={chartData} qTypes={qTypes} metric={'times'} />
              </StyledRow>
            </ SmallPixelBorderSingle>
          </SubCell>
        </Cell>
        <Cell style={gridMisc}>
          <SubCell style={{flexDirection:'column'}}>
            <NavButtons viewStats={viewStats} nextRound={nextRound} finished={finished}/>
          </SubCell>
        </Cell>
      </Grid>
    </Theme>
  )
}

export default React.memo(ChartLayout)
