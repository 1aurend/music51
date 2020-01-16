import React from 'react'
import nextRoundSvg from '../../assets/svgs-nextround.svg'
import endSessionSvg from '../../assets/svgs-endsessionred.svg'
import roundStatsSvg from '../../assets/svgs-roundstats.svg'
import {
  Row,
  Col,
  Button,
} from 'shards-react'

export default function NavButtons({ viewStats, nextRound, finished }) {
  return (
    <>
      <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
          <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={() => {viewStats(true)}}><img src={roundStatsSvg} alt='round stats' style={{width: '15rem'}}></img></Button>
        </Col>
        <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
          <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={() => {
            nextRound()
          }}><img src={nextRoundSvg} alt='next round' style={{width: '15rem'}}></img></Button>
        </Col>
        </Row>
        <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
          <Col sm='8' lg='5' style={{display: 'flex', justifyContent: 'center'}}>
            <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', margin: '5%', padding: '0'}} onClick={() => {
              finished(true)
            }}><img src={endSessionSvg} alt='end session' style={{width: '15rem'}}></img></Button>
          </Col>
      </Row>
    </>
  )

}
