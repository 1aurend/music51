import React from 'react'
import {
  Row,
  Col,
} from 'shards-react'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import NavButtons from '../buttons/RoundEndNav'
import {SmallPixelBorderDouble, MegaPixelBorder} from '../layouts/PixelBorder'
import {Universe, Bento, HFlex, VFlex, Grid} from '../layouts/Grids'
import {Bug} from '../buttons/Bug'
import Marquee from '../layouts/Marquee'
import styled from 'styled-components'

const HVBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  > * {
    width: 100%;
    padding: 10px;
  }
`

const VBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Padding10px = styled.div`
  padding: 10px 0px;
  width: 100%
`

const StyledTh = styled.th`
  font-family: 'Thintel', monospace;
  color: ${props => props.theme.colors.secondary};
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`

const StyledH3 = styled.h3`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0;
`

const StyledTBody = styled.tbody`
  font-family: 'Thintel', monospace;
  color: ${props => props.theme.colors.dark};
  font-size: 28px;
  text-align: center;
  th {
    color: ${props => props.theme.colors.secondary};
    font-size: 30px;
    font-weight: 600;
  }
`


// TODO: add styled-components
export default function VerticalTable(props) {
  const { greeting, verticalTableAtt, verticalTableT, startOver } = props
  const sizedStyles = useResponsiveStyles()
  const {h2, h3, para, largeHSmallV, universeSizing} = sizedStyles
  const title = {"headline":"Session Status", "mode":greeting}

  return (
      <Universe style={universeSizing}>
        <Bento>
          <MegaPixelBorder>
            <Marquee title={title} />
          </MegaPixelBorder>
          <HVBox style={largeHSmallV}>
            <VBox>
              <StyledH3 style={h3}>ATTEMPTS</StyledH3>
              <SmallPixelBorderDouble>
                <Padding10px>
                  <table style={{width:"100%"}}>
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
                  </Padding10px>
                </ SmallPixelBorderDouble>
              </VBox>
              <VBox>
                <StyledH3 style={h3}>TIMES</StyledH3>
                <SmallPixelBorderDouble>
                  <Padding10px>
                    <table style={{width:"100%"}}>
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
                  </ Padding10px>
                </ SmallPixelBorderDouble>
              </VBox>
          </HVBox>
          <NavButtons table startOver={startOver}/>
        </Bento>
        <Bug />
      </Universe>
  )
}
