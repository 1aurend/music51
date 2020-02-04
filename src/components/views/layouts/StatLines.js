import React, { useContext, useEffect } from 'react'
import { Means } from '../../Context'
import {
  Container,
  Row,
  Col
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import NavButtons from '../buttons/RoundEndNav'

// TODO: finish implementing styled-components and refactor
const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
  font-family: ${props => props.font ? "'Overpass Mono', monospace ": 0}
`
const StyledCenterPane = styled(Col)`
  border: 5px solid black;
  border-radius: 1rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  background-color: #e5e6eb;
`

export default function StatLines(props) {
  const { round, qTypes, setShowStats, nextRound, finished } = props
  const means = useContext(Means)[0]
  const sizedStyles = useResponsiveStyles()
  const { statsTitle, statsSubtitle } = sizedStyles

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  const headline = round === 1 ? 'First Round Complete!' : `Round ${round} Stats`
  const subtitle = round === 1 ? `Here's Your Benchmark:` : null
  const closing = round === 1 ? 'Try to beat these numbers in the next round!' : null
  const statLines = qTypes.map( type => {
    return <Row
            key={type}
            style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>
              <p>
                <span style={{fontWeight: '600'}}>{type.toUpperCase()}: </span>
                {means[type].attempts[means[type].attempts.length-1]} attempts and {means[type].times[means[type].times.length-1]} seconds per question
              </p>
            </Row>
  })

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <StyledCenterPane sm='12' lg='8'>
          <StyledRow margintop='5%'>
            <h2 style={statsTitle}>
              {headline}
            </h2>
          </StyledRow>
          <StyledRow margintop='5%' marginbottom='2%' font>
            <Col sm='12' lg='10'>
              {subtitle && <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}>
                <h3 style={statsSubtitle}>{subtitle}</h3>
              </Row>}
                {statLines}
              {closing && <Row style={{display: 'flex', justifyContent: 'center'}}>
                <h3 style={statsSubtitle}>{closing}</h3>
              </Row>}
            </Col>
          </StyledRow>
          <StyledRow marginbottom='5%'>
            <NavButtons viewStats={setShowStats} nextRound={nextRound} finished={finished} round={round} statLines/>
          </StyledRow>
        </StyledCenterPane>
      </Row>
    </Container>
  )
}
