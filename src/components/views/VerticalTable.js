import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'shards-react'
import useResponsiveStyles from '../hooks/useResponsiveStyles'
import startOverSvg from '../assets/svgs-startover.svg'


export default function VerticalTable(props) {
  const { greeting, verticalTableAtt, verticalTableT, startOver } = props
  const sizedStyles = useResponsiveStyles()
  const { borderRadius, sessionTitle } = sizedStyles

  return (
    <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '100vh', fontFamily: "'Overpass Mono', monospace"}}>
      <Row style={{display: 'flex', justifyContent: 'center'}} noGutters>
        <Col sm='12' lg='8' style={{border: '5px solid black', borderRadius: borderRadius, marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: '#e5e6eb', fontFamily: "'Overpass Mono', monospace"}}>
          <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}><h2 style={sessionTitle}>Session Status</h2></Row>
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
