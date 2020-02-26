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

const Flexer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-evenly;
  > * {
    height: inherit !important;
    width: inherit;
    margin: 10px;
  }
`

const StyledTh = styled.th`
  font-family: 'Thintel', monospace;
  color: ${props => props.theme.colors.secondary};
  font-size: 30px;
  font-weight: 600;
`

const StyledTBody = styled.tbody`
  font-family: 'Thintel', monospace;
  color: ${props => props.theme.colors.dark};
  font-size: 28px;
`

// TODO: add styled-components
export default function VerticalTable(props) {
  const { greeting, verticalTableAtt, verticalTableT, startOver } = props
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para, input, layoutInfo, layoutQuiz} = sizedStyles

  return (
    <Theme>
      <Universe>
        <Grid style={layoutInfo}>
          <Appetizer>
            <MegaPixelBorder>
              <Row style={{display: 'flex', justifyContent: 'center', margin: '5%'}}><h2 style={h2}>Session Status</h2></Row>
              <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
                    <p style={para}>{greeting}</p>
              </Row>
            </MegaPixelBorder>
          </Appetizer>
          <Entree>
            <Flexer>
              <SmallPixelBorderDouble>
                <Row >
                  <Col>
                            <h3 className="m-0" style={h3}>ATTEMPTS</h3>
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <StyledTh scope="col" className="border-0">
                                  </StyledTh>
                                  <StyledTh scope="col" className="border-0">
                                    1ST
                                  </StyledTh>
                                  <StyledTh scope="col" className="border-0">
                                    LAST
                                  </StyledTh>
                                  <StyledTh scope="col" className="border-0">
                                    BEST
                                  </StyledTh>
                                </tr>
                              </thead>
                              <StyledTBody>
                                {verticalTableAtt}
                              </StyledTBody>
                            </table>
                      </Col>
                    </Row>
                </ SmallPixelBorderDouble>
                <SmallPixelBorderDouble>

                <Row >
                  <Col>
                        <h3 className="m-0" style={h3}>TIMES</h3>
                        <table className="table mb-0">
                          <thead>
                          <tr>
                            <StyledTh scope="col" className="border-0">
                            </StyledTh>
                            <StyledTh scope="col" className="border-0">
                              1ST
                            </StyledTh>
                            <StyledTh scope="col" className="border-0">
                              LAST
                            </StyledTh>
                            <StyledTh scope="col" className="border-0">
                              BEST
                            </StyledTh>
                          </tr>
                        </thead>
                        <StyledTBody>
                          {verticalTableT}
                          </StyledTBody>
                        </table>
                  </Col>
                </Row>
              </ SmallPixelBorderDouble>
            </Flexer>
          </Entree>
          <Dessert>
            <NavButtons table startOver={startOver}/>
          </Dessert>
        </Grid>
      </Universe>
    </Theme>
  )
}
