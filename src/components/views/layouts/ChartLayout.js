import React, { useEffect } from 'react'
import { Row } from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import NavButtons from '../buttons/RoundEndNav'
import Chart from '../charts/ProgressChart'
import styled from 'styled-components'
import {Bug} from '../buttons/Bug'
import {SmallPixelBorderDouble, SmallPixelBorderOutline, MegaPixelBorder} from './PixelBorder'
import {Universe, Grid, Appetizer, Entree, Dessert} from './Grids'
import Theme from '../Theme'
import Legend from '../charts/Legend'

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
`
const ChartWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center
`
const StatsH1 = styled.h1`
color: ${props => props.theme.colors.dark};
`

const StatsH3 = styled.h3`
color: ${props => props.theme.colors.tertiary};
`
const StatsH4 = styled.h4`
color: ${props => props.theme.colors.light};
.category {
  color: ${props => props.theme.colors.tertiary};
  font-weight: 600;
  text-transform: uppercase;
}
.num {
  color: ${props => props.theme.colors.secondary};
}
`
// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function ChartLayout({ chartData, round, finished, viewStats, nextRound }) {
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { h1, h3, h4, layoutInfo } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null
  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  return (
    <Theme>
      <Universe>
        <Grid style={layoutInfo}>
          <Appetizer>
            <MegaPixelBorder>
              <StatsH1 style={h1}>Round {round} Complete!</StatsH1>
            </MegaPixelBorder>
          </Appetizer>
          <Entree>
              <SmallPixelBorderDouble>
                  <StatsH3 style={h3}>Here's what changed the most this round!</StatsH3>
                <ChartWrapper>
                  <Chart showLegend={false} chartData={chartData} qTypes={chartData.chartData.categoriesAtt} metric={'attempts'} />
                  <Chart showLegend={false} chartData={chartData} qTypes={chartData.chartData.categoriesTime} metric={'times'} />
                </ChartWrapper>
                <Legend chartData={chartData} />
              </ SmallPixelBorderDouble>
          </Entree>
          <Dessert>
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
            <NavButtons viewStats={viewStats} nextRound={nextRound} finished={finished}/>
          </Dessert>
        </Grid>
        <Bug />
      </Universe>
    </Theme>
  )
}

export default React.memo(ChartLayout)
