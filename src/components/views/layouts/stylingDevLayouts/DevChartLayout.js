import React, { useEffect } from 'react'
import useResponsiveStyles from '../../../../hooks/useResponsiveStyles'
import NavButtons from '../../buttons/RoundEndNav'
import Chart from '../../charts/ProgressChart'
import styled from 'styled-components'
import {Bug} from '../../buttons/Bug'
import {SmallPixelBorderDouble, SmallPixelBorderOutline, MegaPixelBorder} from '../PixelBorder'
import {Universe, Bento, VFlex, HFlex, Grid} from '../Grids'
import Legend from '../../charts/Legend'


const Compartment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 30px;
`

const HVBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center
`

const StatsH1 = styled.h1`
  color: ${props => props.theme.colors.dark};
  margin: 12px 6px 4px 6px;
`

const StatsH3 = styled.h3`
  color: ${props => props.theme.colors.tertiary};
`
const Stats = styled.h4`
  color: ${props => props.theme.colors.light};
  .category {
    color: ${props => props.theme.colors.tertiary};
    font-weight: 600;
    text-transform: uppercase;
  }
  .num {
    color: ${props => props.theme.colors.secondary};
  }
  p {
    line-height:0.8;
    margin-bottom:12px;
    text-align: center
  }
`


// QUESTION: should we not display graphs on moblile? too small to read? or how to scale?
function DevChartLayout({ chartData, round, finished, viewStats, nextRound }) {
  const timesSummary = chartData.progressSummary.times
  const attemptsSummary = chartData.progressSummary.attempts
  const verbT = timesSummary.verb
  const verbA = attemptsSummary.verb
  const sizedStyles = useResponsiveStyles()
  const { h1, h3, h4, largeHSmallV, universeSizing } = sizedStyles
  const vTColor = verbT === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null
  const vAColor = verbA === 'decreased' ? {color: '#26AD5E', fontWeight: '600'} : null
  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  return (
      <Universe style={universeSizing}>
        <Bento>
          <MegaPixelBorder>
            <StatsH1 style={h1}>Round {round} Complete!</StatsH1>
          </MegaPixelBorder>
          <SmallPixelBorderOutline>
            <VFlex>
              <StatsH3 style={h3}>Here's Your Progress:</StatsH3>
              <HVBox style={largeHSmallV}>
                <Compartment>
                  <Stats style={h4}>
                    <div class='category' style={{width:'100%', display:'block'}}>
                      attempts:
                    </div>
                    <p>
                       Your total attempt count{'\u00A0'}<br />
                      <span style={vAColor}>{verbA}{'\u00A0'}</span>
                       by{'\u00A0'}
                      <span class='num'>{attemptsSummary.num}{'\u00A0'}</span><br />
                       attempts per question or{'\u00A0'}
                      <span class='num'>{`${attemptsSummary.percent}%`}</span>
                      .
                    </p>
                  </Stats>
                </Compartment>
                <Compartment>
                  <Stats style={h4}>
                    <div class='category' style={{width:'100%', display:'block'}}>
                      time:
                    </div>
                    <p>
                      Your overall time{'\u00A0'}<br />
                      <span style={vTColor}>
                        {verbT}{'\u00A0'}
                      </span>
                       by{'\u00A0'}
                      <span class='num'>
                        {timesSummary.num}{'\u00A0'}
                      </span><br />
                       seconds per question or{'\u00A0'}
                      <span class='num'>
                        {`${timesSummary.percent}%`}
                      </span>
                      .
                    </p>
                  </Stats>
                </Compartment>
              </HVBox>
            </VFlex>
          </SmallPixelBorderOutline>
          <SmallPixelBorderDouble>
            <VFlex style={{margin:'10px 10px 0 10px'}}>
                <StatsH3 style={h3}>Here's what changed the most this round!</StatsH3>
                <HVBox style={largeHSmallV}>
                  <Chart showLegend={false} chartData={chartData} qTypes={chartData.chartData.categoriesAtt} metric={'attempts'} />
                  <Chart showLegend={false} chartData={chartData} qTypes={chartData.chartData.categoriesTime} metric={'times'} />
                </HVBox>
              <Legend chartData={chartData} />
            </VFlex>
          </ SmallPixelBorderDouble>

          <NavButtons viewStats={viewStats} nextRound={nextRound} finished={finished}/>
        </Bento>
        <Bug />
      </Universe>
  )
}

export default React.memo(DevChartLayout)
