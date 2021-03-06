import React from 'react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

const MarqueeDiv = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  padding: 16px 8px 20px 8px;
  > h1 {
    color: ${props => props.theme.colors.dark};
    margin-bottom:6px;
  }
  > h2 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom:10px;
  }
  > h4 {
    color: ${props => props.theme.colors.tertiary};
    margin-bottom:0;
  }
`

export default function Marquee({title}) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h4} = sizedStyles
  return (
    <MarqueeDiv>
      <h2 style={h2}>{title.subtitle}</h2>
      <h1 style={h1}>{title.headline}</h1>
      <h4 style={h4}>{title.mode}</h4>
    </MarqueeDiv>
  )
}
