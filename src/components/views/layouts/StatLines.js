import React, { useContext, useEffect } from 'react'
import { Means } from '../../Context'
import {
  Container,
  Row,
  Col
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import styled from 'styled-components'
import NavButtons from '../buttons/NavButtons'

// TODO: finish implementing styled-components and refactor
const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: ${props => props.margintop || 0};
  margin-bottom: ${props => props.marginbottom || 0};
`

export default function StatLines(props) {
  const { round, qTypes, setShowStats, nextRound, finished } = props
  const means = useContext(Means)[0]
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, statsTitle, statsSubtitle } = sizedStyles

  const headline = round === 1 ? 'First Round Complete!' : `Round ${round} Stats`
  const subtitle = round === 1 ? `Here's Your Benchmark:` : ''
  let closing = round === 1 ? 'Try to beat these numbers in the next round!' : ''

  let statLines = qTypes.map( type => {
    return <Row key={type} style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>{type.toUpperCase()}: </span>{means[type].attempts[means[type].attempts.length-1]} attempts and {means[type].times[means[type].times.length-1]} seconds per question</p></Row>
  })

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])



  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
          <StyledRow margintop='5%'>
            <h2 style={statsTitle}>
              {headline}
            </h2>
          </StyledRow>
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '2%', fontFamily: "'Overpass Mono', monospace"}}>
            <Col sm='12' lg='10'>
              <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3 style={statsSubtitle}>{subtitle}</h3></Row>
                {statLines}
              <Row style={{display: 'flex', justifyContent: 'center'}}><h3 style={statsSubtitle}>{closing}</h3></Row>
          </Col>
          </Row>
            <StyledRow marginbottom='5%'>
              <NavButtons viewStats={setShowStats} nextRound={nextRound} finished={finished} round={round} statLines/>
            </StyledRow>
          </Col>
        </Row>
    </Container>
  )
}
