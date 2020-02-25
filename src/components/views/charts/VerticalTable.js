import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import NavButtons from '../buttons/RoundEndNav'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, SmallPixelBorderOutline, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from '../layouts/PixelBorder'
import {Universe, Grid, Appetizer, Entree, Dessert, BugWrapper} from '../layouts/Grids'
import Theme from '../Theme'
import styled from 'styled-components'

const StyledEntree = styled(Entree)`
  display: flex;
  flex-flow: column nowrap;
  > * {
    margin: 10px;
  }
`

// TODO: add styled-components
export default function VerticalTable(props) {
  const { greeting, verticalTableAtt, verticalTableT, startOver } = props
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, layoutInfo, layoutQuiz} = sizedStyles

  return (
    <Theme>
      <Universe>
        <Grid style={layoutQuiz}>
          <Appetizer>
            <MegaPixelBorder>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}><h2 style={h2}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                    <p style={para}>{greeting}</p>
              </Row>
            </MegaPixelBorder>
          </Appetizer>
          <StyledEntree>
              <SmallPixelBorderOutline>
                <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                  <Col sm='12' lg='10'>
                        <Card small className="mb-4">
                          <CardHeader className="border-bottom">
                            <h3 className="m-0" style={h3}>ATTEMPTS</h3>
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
              </SmallPixelBorderOutline>
              <SmallPixelBorderOutline>
                <Row style={{paddingTop: '2%'}}>
                  <Col>
                    <Card small className="mb-4">
                      <CardHeader className="border-bottom">
                        <h3 className="m-0" style={h3}>TIMES</h3>
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

                <Row style={{display: 'flex', justifyContent: 'center'}}>
                  <NavButtons table startOver={startOver}/>
                </Row>
              </SmallPixelBorderOutline>
          </StyledEntree>
        </Grid>
      </Universe>
    </Theme>
  )
}
