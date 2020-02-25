import React from 'react'
import styled from 'styled-components'

const PixelWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items:stretch;
`
const PixelButtonWrapper = styled.div`
  display:block;
`

const PixelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items:stretch;
`
const Px1 = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.primary};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const Px1v = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.primary};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const Px1h = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.primary};
  height:${props => props.theme.pixelWeight};
  width:100%;
`
const Px0 = styled.div`
  display: block;
  background-color: none;
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const Px0v = styled.div`
  display: block;
  background-color: none;
  height:1;
  width:${props => props.theme.pixelWeight};
`
const Px0h = styled.div`
  display: block;
  background-color: none;
  height:${props => props.theme.pixelWeight};
  width:100%;
`
const Px2 = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.secondary};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const Px2v = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.secondary};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const Px2h = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.secondary};
  height:${props => props.theme.pixelweight};
  width:100%;
`
const ContentPane = styled.div`
  background-color: ${props => props.theme.colors.light};
  height: 100%;
  width: 100%;
  padding: 10px 30px;
`
const ContentPaneClear = styled.div`
  background-color: none;
  height: 100%;
  width: 100%;
  padding: 10px 30px;
`



// Button-specific definitions
const ButtonText = styled.h3`
  font-family : 'Thintel', monospace;
  font-size: 64px;
  text-align: center;
  font-weight: 600;
  padding: 16px 20px 0px 20px;
  color: white;
  line-height: 20px;
  white-space: nowrap;
  transition: 0.5s;
  &:hover {
    color: ${props => props.theme.colors.dark};
`
const ButtonContent = styled.div`
  background-color: none;
`
const BtG1 = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green1};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const BtG1v = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green1};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const BtG1h = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green1};
  height:${props => props.theme.pixelweight};
  width:100%;
`
const BtG2 = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green2};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const BtG2v = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green2};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const BtG2h = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.green2};
  height:${props => props.theme.pixelweight};
  width:100%;
`
const BtR1 = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red1};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const BtR1v = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red1};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const BtR1h = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red1};
  height:${props => props.theme.pixelweight};
  width:100%;
`
const BtR2 = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red2};
  height:${props => props.theme.pixelWeight};
  width:${props => props.theme.pixelWeight};
`
const BtR2v = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red2};
  height:1;
  width:${props => props.theme.pixelWeight};
`
const BtR2h = styled.div`
  display: block;
  background-color: ${props => props.theme.buttonColors.red2};
  height:${props => props.theme.pixelweight};
  width:100%;
`



export const SmallPixelBorderDouble = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px2v /><ContentPane>
          {children}
        </ContentPane><Px2v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}


export const SmallPixelBorderSingle = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px0v /><ContentPane>
          {children}
        </ContentPane><Px0v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}

export const SmallPixelBorderOutline = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px0v /><ContentPaneClear>
          {children}
        </ContentPaneClear><Px0v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0h /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}

export const MediumPixelBorder = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0 /><Px2h /><Px0 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px2v /><ContentPane>
          {children}
        </ContentPane><Px2v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0 /><Px2h /><Px0 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}


export const LargePixelBorder = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px0v /><Px2v /><ContentPane>
          {children}
        </ContentPane><Px2v /><Px0v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0h /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}


export const JumboPixelBorder = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px1v /><Px0v /><Px0v /><Px2v /><ContentPane>
          {children}
        </ContentPane><Px2v /><Px0v /><Px0v /><Px1v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1h /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
    </PixelWrapper>
  )
}

export const MegaPixelBorder = ({children}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px2 /><Px2 /><Px0 /><Px1h /><Px0 /><Px2 /><Px2 />
      </ PixelRow>
      <PixelRow>
        <Px2 /><Px0 /><Px1h /><Px0 /><Px2 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px1v /><Px0v /><Px0v /><Px2v /><Px2v /><ContentPane>
          {children}
        </ContentPane><Px2v /><Px2v /><Px0v /><Px0v /><Px1v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px0 /><Px0 /><Px0 /><Px2h /><Px0 /><Px0 /><Px0 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px1 /><Px1 /><Px0h /><Px1 /><Px1 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px2 /><Px0 /><Px1h /><Px0 /><Px2 />
      </ PixelRow>
      <PixelRow>
        <Px2 /><Px2 /><Px0 /><Px1h /><Px0 /><Px2 /><Px2 />
      </ PixelRow>
    </PixelWrapper>
  )
}

export const ButtonBorder = ({children}) => {
  return (
    <PixelButtonWrapper>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0 /><Px2h /><Px0 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px1v /><Px0v /><Px2v /><ButtonContent>
          {children}
        </ButtonContent><Px2v /><Px0v /><Px1v />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px1 /><Px0 /><Px2h /><Px0 /><Px1 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px1 /><Px0h /><Px1 /><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><Px0 /><Px1h /><Px0 /><Px0 /><Px0 />
      </ PixelRow>
    </PixelButtonWrapper>
  )
}

export const SolidButtonGreen = ({props}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><BtG1h/><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><BtG1h/><Px0 />
      </ PixelRow>
      <PixelRow>
        <BtG1 /><BtG1h /><BtG1 />
      </ PixelRow>
      <PixelRow>
        <BtG1h><ButtonText>{props}</ButtonText></ BtG1h>
      </ PixelRow>
      <PixelRow>
        <BtG2 /><BtG1h /><BtG2 />
      </PixelRow>
      <PixelRow>
        <BtG2 /><BtG2 /><BtG1h /><BtG2 /><BtG2 />
      </PixelRow>
      <PixelRow>
        <Px0 /><BtG2h /><Px0 />
      </PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><BtG2h/><Px0 /><Px0 />
      </ PixelRow>
    </ PixelWrapper>
  )
}

export const SolidButtonRed = ({props}) => {
  return (
    <PixelWrapper>
      <PixelRow>
        <Px0 /><Px0 /><BtR1h/><Px0 /><Px0 />
      </ PixelRow>
      <PixelRow>
        <Px0 /><BtR1h/><Px0 />
      </ PixelRow>
      <PixelRow>
        <BtR1 /><BtR1h /><BtR1 />
      </ PixelRow>
      <PixelRow>
        <BtR1h><ButtonText>{props}</ButtonText></ BtR1h>
      </ PixelRow>
      <PixelRow>
        <BtR2 /><BtR1h /><BtR2 />
      </PixelRow>
      <PixelRow>
        <BtR2 /><BtR2 /><BtR1h /><BtR2 /><BtR2 />
      </PixelRow>
      <PixelRow>
        <Px0 /><BtR2h /><Px0 />
      </PixelRow>
      <PixelRow>
        <Px0 /><Px0 /><BtR2h/><Px0 /><Px0 />
      </ PixelRow>
    </ PixelWrapper>
  )
}
