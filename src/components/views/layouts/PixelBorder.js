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
  height:${props => props.theme.pixelweight};
  width:${props => props.theme.pixelweight};
`
const Px1v = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.primary};
  height:1;
  width:${props => props.theme.pixelweight};
`
const Px1h = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.primary};
  height:${props => props.theme.pixelweight};
  width:100%;
`
const Px0 = styled.div`
  display: block;
  background-color: none;
  height:${props => props.theme.pixelweight};
  width:${props => props.theme.pixelweight};
`
const Px0v = styled.div`
  display: block;
  background-color: none;
  height:1;
  width:${props => props.theme.pixelweight};
`
const Px0h = styled.div`
  display: block;
  background-color: none;
  height:${props => props.theme.pixelweight};
  width:100%;
`
const Px2 = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.secondary};
  height:${props => props.theme.pixelweight};
  width:${props => props.theme.pixelweight};
`
const Px2v = styled.div`
  display: block;
  background-color: ${props => props.theme.colors.secondary};
  height:1;
  width:${props => props.theme.pixelweight};
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

const ButtonContent = styled.div`
  background-color: none;
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
