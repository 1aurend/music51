import React, { useEffect } from 'react'
import { Container, Row, Col } from 'shards-react'

export default function Loading() {

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
      <Row style={{paddingTop: '25%', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}></Row>
      <Col sm='12' lg='12'>
        <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}} noGutters>
            <h2 style={{color: '#17c671', fontFamily: "'Press Start 2P', cursive"}}>Calculating your stats...</h2>
        </Row>
      </Col>
  </Container>
  )
}
