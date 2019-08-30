import React, { useContext, useEffect, useState } from 'react'
import { Means, Size } from './Context'
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from 'shards-react'
import Context from './Context'


export default function SessionMatrix({ round }) {

  const [means, udpateMeans] = useContext(Means)
  const [fast, setFast] = useState()
  const [accurate, setAcc] = useState()
  const [reset, startOver] = useState(false)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '2rem' : '1rem'
  let fontStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2.5em'} : {textAlign: 'center', fontSize: '2em'}
  let subtitleStyle = size.width > 500 ? {textAlign: 'center', fontSize: '2em'} : {textAlign: 'center', fontSize: '1.5em'}



  useEffect(() => {
    let fastest = {
          noteNames: {
            round: means.noteNames.times.indexOf(Math.min(...means.noteNames.times)),
            time: Math.min(...means.noteNames.times),
          },
          roots: {
            round: means.roots.times.indexOf(Math.min(...means.roots.times)),
            time: Math.min(...means.roots.times),
          },
          quality: {
            round: means.quality.times.indexOf(Math.min(...means.quality.times)),
            time: Math.min(...means.quality.times),
          },
          inversions: {
            round: means.inversions.times.indexOf(Math.min(...means.inversions.times)),
            time: Math.min(...means.inversions.times),
          },
          average: {
            round: means.average.times.indexOf(Math.min(...means.average.times)),
            time: Math.min(...means.average.times),
          }
    }
    let mostAcc = {
          noteNames: {
            round: means.noteNames.attempts.lastIndexOf(Math.min(...means.noteNames.attempts)),
            att: Math.min(...means.noteNames.attempts),
          },
          roots: {
            round: means.roots.attempts.lastIndexOf(Math.min(...means.roots.attempts)),
            att: Math.min(...means.roots.attempts),
          },
          quality: {
            round: means.quality.attempts.lastIndexOf(Math.min(...means.quality.attempts)),
            att: Math.min(...means.quality.attempts),
          },
          inversions: {
            round: means.inversions.attempts.lastIndexOf(Math.min(...means.inversions.attempts)),
            att: Math.min(...means.inversions.attempts),
          },
          average: {
            round: means.average.attempts.lastIndexOf(Math.min(...means.average.attempts)),
            att: Math.min(...means.average.attempts),
          },
          perfect: (means.average.attempts.filter(average => average === 1)).length
    }
    setFast(fastest)
    setAcc(mostAcc)
  }, [means])

  if (reset) {
    return <Context />
  }
  else if (accurate) {
    console.log(fast)
    console.log(accurate)
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb'}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{marginBottom: 10}}><strong>Pefection! </strong> You completed {accurate.perfect} rounds with 100% accuracy this session.</p>
              </Row>
                <Col sm='12' lg='10'>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center'}}>Attempts</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                                Round
                              </th>
                              <th scope="col" className="border-0">
                                Names
                              </th>
                              <th scope="col" className="border-0">
                                Roots
                              </th>
                              <th scope="col" className="border-0">
                                Quality
                              </th>
                              <th scope="col" className="border-0">
                                Inversions
                              </th>
                              <th scope="col" className="border-0">
                                Overall
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1st</td>
                              <td>{means.noteNames.attempts[0]}</td>
                              <td>{means.roots.attempts[0]}</td>
                              <td>{means.quality.attempts[0]}</td>
                              <td>{means.inversions.attempts[0]}</td>
                              <td>{means.average.attempts[0]}</td>
                            </tr>
                            <tr>
                              <td>Last</td>
                              <td>{means.noteNames.attempts[round-1]}</td>
                              <td>{means.roots.attempts[round-1]}</td>
                              <td>{means.quality.attempts[round-1]}</td>
                              <td>{means.inversions.attempts[round-1]}</td>
                              <td>{means.average.attempts[round-1]}</td>
                            </tr>
                            <tr>
                              <td>Best</td>
                              <td>{accurate.noteNames.att}</td>
                              <td>{accurate.roots.att}</td>
                              <td>{accurate.quality.att}</td>
                              <td>{accurate.inversions.att}</td>
                              <td>{accurate.average.att}</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center'}}>Times</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                                Round
                              </th>
                              <th scope="col" className="border-0">
                                Names
                              </th>
                              <th scope="col" className="border-0">
                                Roots
                              </th>
                              <th scope="col" className="border-0">
                                Quality
                              </th>
                              <th scope="col" className="border-0">
                                Inversions
                              </th>
                              <th scope="col" className="border-0">
                                Overall
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1st</td>
                              <td>{means.noteNames.times[0]}</td>
                              <td>{means.roots.times[0]}</td>
                              <td>{means.quality.times[0]}</td>
                              <td>{means.inversions.times[0]}</td>
                              <td>{means.average.times[0]}</td>
                            </tr>
                            <tr>
                              <td>Last</td>
                              <td>{means.noteNames.times[round-1]}</td>
                              <td>{means.roots.times[round-1]}</td>
                              <td>{means.quality.times[round-1]}</td>
                              <td>{means.inversions.times[round-1]}</td>
                              <td>{means.average.times[round-1]}</td>
                            </tr>
                            <tr>
                              <td>Best</td>
                              <td>{fast.noteNames.time}</td>
                              <td>{fast.roots.time}</td>
                              <td>{fast.quality.time}</td>
                              <td>{fast.inversions.time}</td>
                              <td>{fast.average.time}</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginBottom: '5%'}}>
                  <Button style={{margin: '5%'}} theme='success' onClick={(e) => {
                    startOver(true)
                  }}>Start Over</Button>
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }
  else {
    return <h2>Loading...</h2>
  }
}
