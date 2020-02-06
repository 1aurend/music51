import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'shards-react'
import EndOfRound from '../../logic/EndOfRound'

export default function Loading({round}) {
  const [first, setFirst] = useState(true)
  useEffect(() => {
      window.scrollTo(0, 0)
      if (round !== 1) {
        setTimeout(() => setFirst(false), 100)
        return
      }
      setFirst(false)
  },[round])

  if (first) {
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
  } else {
    return <EndOfRound round={round} />
  }

}
