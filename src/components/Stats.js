import React, { useContext, useState } from 'react'
import { Means, Session } from './Context'
import {
  Container,
  Row,
  Col,
  Button,
} from 'shards-react'
import Quiz from './Quiz'
import ProgressMenu from './ProgressMenu'
import generateChords from '../chordGenerator'
import nextRoundSvg from '../assets/svgs-nextround.svg'
import backSvg from '../assets/svgs-backarrows.svg'
import useResponsiveStyles from '../hooks/useResponsiveStyles'


export default function RoundStats({ round, chartData }) {

  const means = useContext(Means)[0]
  const session = useContext(Session)[0]
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, statsTitle, statsSubtitle } = sizedStyles
  const [quiz, setQuiz] = useState(false)
  const [progressView, showProgress] = useState(false)


  let nextRound = () => {
    setQuiz(generateChords(session.settings.numChords, session.settings.options))
  }

  let headline = round === 1 ? 'First Round Complete!' : `Round ${round} Stats`
  let subtitle = round === 1 ? `Here's Your Benchmark:` : ''
  let navButtons = round === 1 ? (<Col sm='8' lg='4' style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', marginLeft: '5%', marginRight: '5%', marginBottom: '5%', padding: '0'}} onClick={(e) => {
                                      nextRound()
                                    }}><img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}></img></Button>
                                </Col>) :
                                (<><Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center', marginBottom: '5%'}}>
                                    <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', marginLeft: '5%', marginRight: '5%', padding: '0'}} onClick={(e) => {
                                      showProgress(true)
                                    }}><img src={backSvg} alt='next round' style={{width: '10rem'}}></img></Button>
                                </Col>
                                <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center', marginBottom: '5%'}}>
                                    <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', marginLeft: '5%', marginRight: '5%', padding: '0'}} onClick={(e) => {
                                      nextRound()
                                    }}><img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}></img></Button>
                                </Col></>)
  let closing = round === 1 ? 'Try to beat these numbers in the next round!' : ''

  let qTypes = Object.keys(means)
  let statLines = qTypes.map( type => {
    return <Row key={type} style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}><p><span style={{fontWeight: '600'}}>{type.toUpperCase()}: </span>{means[type].attempts[means[type].attempts.length-1]} attempts and {means[type].times[means[type].times.length-1]} seconds per question</p></Row>
  })


  if (quiz) {
    return <Quiz data={quiz} round={round+1} />
  }
  else if (progressView) {
    return <ProgressMenu round={round} chartData={chartData} qTypes={qTypes} />
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '5%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={statsTitle}>{headline}</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '2%', fontFamily: "'Overpass Mono', monospace"}}>
                <Col sm='12' lg='10'>
                  <Row style={{display: 'flex', justifyContent: 'center', marginBottom: '2%'}}><h3 style={statsSubtitle}>{subtitle}</h3></Row>
                    {statLines}
                  <Row style={{display: 'flex', justifyContent: 'center'}}><h3 style={statsSubtitle}>{closing}</h3></Row>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                  {navButtons}
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }


}
