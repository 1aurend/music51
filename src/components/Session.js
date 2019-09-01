import React, { useContext, useEffect, useState } from 'react'
import { Means, Size } from './Context'
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from 'shards-react'
import Context from './Context'


function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


export default function SessionMatrix({ round }) {

  const [means, udpateMeans] = useContext(Means)
  const [fast, setFast] = useState()
  const [accurate, setAcc] = useState()
  const [reset, startOver] = useState(false)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '1rem' : '1rem'
  let fontStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em'}
  let subtitleStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'}



  useEffect(() => {
    let fastest = {
          noteNames: {
            round: means.noteNames.times.indexOf(Math.min(...means.noteNames.times)),
            time: rounded(Math.min(...means.noteNames.times), 2),
          },
          roots: {
            round: means.roots.times.indexOf(Math.min(...means.roots.times)),
            time: rounded(Math.min(...means.roots.times), 2),
          },
          quality: {
            round: means.quality.times.indexOf(Math.min(...means.quality.times)),
            time: rounded(Math.min(...means.quality.times), 2),
          },
          inversions: {
            round: means.inversions.times.indexOf(Math.min(...means.inversions.times)),
            time: rounded(Math.min(...means.inversions.times), 2),
          },
          average: {
            round: means.average.times.indexOf(Math.min(...means.average.times)),
            time: rounded(Math.min(...means.average.times), 2),
          }
    }
    let mostAcc = {
          noteNames: {
            round: means.noteNames.attempts.lastIndexOf(Math.min(...means.noteNames.attempts)),
            att: rounded(Math.min(...means.noteNames.attempts), 2),
          },
          roots: {
            round: means.roots.attempts.lastIndexOf(Math.min(...means.roots.attempts)),
            att: rounded(Math.min(...means.roots.attempts), 2),
          },
          quality: {
            round: means.quality.attempts.lastIndexOf(Math.min(...means.quality.attempts)),
            att: rounded(Math.min(...means.quality.attempts), 2),
          },
          inversions: {
            round: means.inversions.attempts.lastIndexOf(Math.min(...means.inversions.attempts)),
            att: rounded(Math.min(...means.inversions.attempts), 2),
          },
          average: {
            round: means.average.attempts.lastIndexOf(Math.min(...means.average.attempts)),
            att: rounded(Math.min(...means.average.attempts), 2),
          },
          perfect: (means.average.attempts.filter(average => average === 1)).length
    }
    console.log(fastest);
    console.log(mostAcc);
    setFast(fastest)
    setAcc(mostAcc)
  }, [means])

  if (reset) {
    return <Context />
  }
  else if (accurate && size.width >= 500) {

    let greeting = accurate.perfect >= 1 ? `Pefection! You completed ${accurate.perfect} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`

    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '150vh', fontFamily: "'Overpass Mono', monospace"}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb', fontFamily: "'Overpass Mono', monospace"}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{marginBottom: 10}}>{greeting}</p>
              </Row>
                <Col sm='12' lg='10'>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>Attempts</h6>
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
                              <td>{rounded(means.noteNames.attempts[0], 2)}</td>
                              <td>{rounded(means.roots.attempts[0],2)}</td>
                              <td>{rounded(means.quality.attempts[0],2)}</td>
                              <td>{rounded(means.inversions.attempts[0],2)}</td>
                              <td>{rounded(means.average.attempts[0],2)}</td>
                            </tr>
                            <tr>
                              <td>Last</td>
                              <td>{rounded(means.noteNames.attempts[round-1],2)}</td>
                              <td>{rounded(means.roots.attempts[round-1],2)}</td>
                              <td>{rounded(means.quality.attempts[round-1],2)}</td>
                              <td>{rounded(means.inversions.attempts[round-1],2)}</td>
                              <td>{rounded(means.average.attempts[round-1],2)}</td>
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
                <Row style={{paddingTop: '2%'}}>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>Times</h6>
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
                              <td>{rounded(means.noteNames.times[0],2)}</td>
                              <td>{rounded(means.roots.times[0],2)}</td>
                              <td>{rounded(means.quality.times[0],2)}</td>
                              <td>{rounded(means.inversions.times[0],2)}</td>
                              <td>{rounded(means.average.times[0],2)}</td>
                            </tr>
                            <tr>
                              <td>Last</td>
                              <td>{rounded(means.noteNames.times[round-1],2)}</td>
                              <td>{rounded(means.roots.times[round-1],2)}</td>
                              <td>{rounded(means.quality.times[round-1],2)}</td>
                              <td>{rounded(means.inversions.times[round-1],2)}</td>
                              <td>{rounded(means.average.times[round-1],2)}</td>
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
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                  <Button theme='success' onClick={(e) => {
                    startOver(true)
                  }}>Start Over</Button>
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }
  else if (accurate && size.width <= 500) {

    let greeting = accurate.perfect >= 1 ? `Pefection! You completed ${accurate.perfect} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`

    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh', fontFamily: "'Overpass Mono', monospace"}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb', fontFamily: "'Overpass Mono', monospace"}}>
            <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%', marginTop: '5%'}}><h2 style={fontStyle}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{marginBottom: 10}}>{greeting}</p>
              </Row>
                <Col sm='12' lg='10'>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>Attempts</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                              </th>
                              <th scope="col" className="border-0">
                                1st
                              </th>
                              <th scope="col" className="border-0">
                                Last
                              </th>
                              <th scope="col" className="border-0">
                                Best
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Names</td>
                              <td>{rounded(means.noteNames.attempts[0], 2)}</td>
                              <td>{rounded(means.noteNames.attempts[round-1],2)}</td>
                              <td>{accurate.noteNames.att}</td>
                            </tr>
                            <tr>
                              <td>Roots</td>
                              <td>{rounded(means.roots.attempts[0],2)}</td>
                              <td>{rounded(means.roots.attempts[round-1],2)}</td>
                              <td>{accurate.roots.att}</td>
                            </tr>
                            <tr>
                              <td>Qual</td>
                              <td>{rounded(means.quality.attempts[0],2)}</td>
                              <td>{rounded(means.quality.attempts[round-1],2)}</td>
                              <td>{accurate.quality.att}</td>
                            </tr>
                            <tr>
                              <td>Inv</td>
                              <td>{rounded(means.inversions.attempts[0],2)}</td>
                              <td>{rounded(means.inversions.attempts[round-1],2)}</td>
                              <td>{accurate.inversions.att}</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{rounded(means.average.attempts[0],2)}</td>
                              <td>{rounded(means.average.attempts[round-1],2)}</td>
                              <td>{accurate.average.att}</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row style={{paddingTop: '2%'}}>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>Times</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                          <tr>
                            <th scope="col" className="border-0">
                            </th>
                            <th scope="col" className="border-0">
                              1st
                            </th>
                            <th scope="col" className="border-0">
                              Last
                            </th>
                            <th scope="col" className="border-0">
                              Best
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Names</td>
                            <td>{rounded(means.noteNames.times[0], 2)}</td>
                            <td>{rounded(means.noteNames.times[round-1],2)}</td>
                            <td>{fast.noteNames.time}</td>
                          </tr>
                          <tr>
                            <td>Roots</td>
                            <td>{rounded(means.roots.times[0],2)}</td>
                            <td>{rounded(means.roots.times[round-1],2)}</td>
                            <td>{fast.roots.time}</td>
                          </tr>
                          <tr>
                            <td>Qual</td>
                            <td>{rounded(means.quality.times[0],2)}</td>
                            <td>{rounded(means.quality.times[round-1],2)}</td>
                            <td>{fast.quality.time}</td>
                          </tr>
                          <tr>
                            <td>Inv</td>
                            <td>{rounded(means.inversions.times[0],2)}</td>
                            <td>{rounded(means.inversions.times[round-1],2)}</td>
                            <td>{fast.inversions.time}</td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>{rounded(means.average.times[0],2)}</td>
                            <td>{rounded(means.average.times[round-1],2)}</td>
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
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                  <Button theme='success' onClick={(e) => {
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
