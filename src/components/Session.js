import React, { useContext, useEffect, useState } from 'react'
import { Means, Size } from './Context'
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from 'shards-react'
import Context from './Context'
import startOverSvg from '../assets/svgs-startover.svg'


function rounded(value, decimals) {
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


export default function SessionMatrix({ round, qTypes }) {

  const [means, udpateMeans] = useContext(Means)
  const [fast, setFast] = useState()
  const [accurate, setAcc] = useState()
  const [reset, startOver] = useState(false)
  const size = useContext(Size)
  let borderRadius = size.width > 500 ? '1rem' : '1rem'
  let fontStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2.5em', lineHeight: '1.5em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em', lineHeight: '1.25em'}
  let subtitleStyle = size.width > 500 ? {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '2em'} : {fontFamily: "'Press Start 2P', cursive", textAlign: 'center', fontSize: '1.5em'}


  useEffect(() => {

    let fastest = {}
    qTypes.map( type => {
                  fastest = {...fastest, [type]: {
                    round: means[type].times.indexOf(Math.min(...means[type].times)),
                    time: rounded(Math.min(...means[type].times), 2),
                  }}
                  return null
                })
    console.log(fastest);
    let mostAcc = {}
    qTypes.map( type => {
                  mostAcc = {...mostAcc, [type]: {
                    round: means[type].attempts.lastIndexOf(Math.min(...means[type].attempts)),
                    att: rounded(Math.min(...means[type].attempts), 2),
                  }}
                  return null
                })
    mostAcc = {...mostAcc, perfect: (means.Overall.attempts.filter(average => average === 1)).length}
    console.log(mostAcc);


    setFast(fastest)
    setAcc(mostAcc)
  }, [means])

  if (reset) {
    return <Context />
  }
  else if (accurate && size.width >= 700) {

    let greeting = accurate.perfect >= 1 ? `Pefection! You completed ${accurate.perfect} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`
    let headers = qTypes.map( type => {
                          return <th scope="col" className="border-0">
                            {type.toUpperCase()}
                          </th>
                      })
    let firstRoundAtt = qTypes.map( type => {
      return <td>{rounded(means[type].attempts[0], 2)}</td>
    })
    let lastRoundAtt = qTypes.map( type => {
      return <td>{rounded(means[type].attempts[round-1], 2)}</td>
    })
    let bestRoundAtt = qTypes.map( type => {
      return <td>{accurate[type].att}</td>
    })
    let firstRoundT = qTypes.map( type => {
      return <td>{rounded(means[type].times[0], 2)}</td>
    })
    let lastRoundT = qTypes.map( type => {
      return <td>{rounded(means[type].times[round-1], 2)}</td>
    })
    let bestRoundT = qTypes.map( type => {
      return <td>{fast[type].time}</td>
    })


    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '150vh', fontFamily: "'Overpass Mono', monospace"}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb', fontFamily: "'Overpass Mono', monospace"}}>
            <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}><h2 style={fontStyle}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{marginBottom: '4%'}}>{greeting}</p>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <Col sm='12' lg='10'>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h5 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>ATTEMPTS</h5>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                              </th>
                              {headers}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1ST</td>
                              {firstRoundAtt}
                            </tr>
                            <tr>
                              <td>LAST</td>
                              {lastRoundAtt}
                            </tr>
                            <tr>
                              <td>BEST</td>
                              {bestRoundAtt}
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
                        <h5 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600'}}>TIMES</h5>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                              </th>
                              {headers}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1ST</td>
                              {firstRoundT}
                            </tr>
                            <tr>
                              <td>LAST</td>
                              {lastRoundT}
                            </tr>
                            <tr>
                              <td>BEST</td>
                              {bestRoundT}
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
                  <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', padding: '0'}} onClick={(e) => {
                    startOver(true)
                  }}><img src={startOverSvg} alt='next round' style={{width: '15rem'}}></img></Button>
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }
  else if (accurate && size.width <= 700) {

    let greeting = accurate.perfect >= 1 ? `Pefection! You completed ${accurate.perfect} rounds with 100% accuracy this session.` : `No perfect rounds this session, but you'll get there next time!`

    let verticalTableAtt = qTypes.map( type => {
      return <tr>
              <td>{type[0].toUpperCase()}</td>
              <td>{rounded(means[type].attempts[0], 2)}</td>
              <td>{rounded(means[type].attempts[round-1],2)}</td>
              <td>{accurate[type].att}</td>
            </tr>
    })
    let verticalTableT = qTypes.map( type => {
      return <tr>
              <td>{type[0].toUpperCase()}</td>
              <td>{rounded(means[type].times[0], 2)}</td>
              <td>{rounded(means[type].times[round-1],2)}</td>
              <td>{fast[type].time}</td>
            </tr>
    })


    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh', fontFamily: "'Overpass Mono', monospace"}}>
        <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
          <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb', fontFamily: "'Overpass Mono', monospace"}}>
            <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}><h2 style={fontStyle}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{marginBottom: '4%'}}>{greeting}</p>
              </Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                <Col sm='12' lg='10'>
                <Row>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h5 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '800'}}>ATTEMPTS</h5>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th scope="col" className="border-0">
                              </th>
                              <th scope="col" className="border-0">
                                1ST
                              </th>
                              <th scope="col" className="border-0">
                                LAST
                              </th>
                              <th scope="col" className="border-0">
                                BEST
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {verticalTableAtt}
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
                        <h5 className="m-0" style={{textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '800'}}>TIMES</h5>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <thead className="bg-light">
                          <tr>
                            <th scope="col" className="border-0">
                            </th>
                            <th scope="col" className="border-0">
                              1ST
                            </th>
                            <th scope="col" className="border-0">
                              LAST
                            </th>
                            <th scope="col" className="border-0">
                              BEST
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {verticalTableT}
                          </tbody>
                        </table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <Button theme="dark" style={{display: 'block', cursor: 'pointer', backgroundColor: '#e5e6eb', border: 'none', padding: '0'}} onClick={(e) => {
                  startOver(true)
                }}><img src={startOverSvg} alt='next round' style={{width: '15rem'}}></img></Button>
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
