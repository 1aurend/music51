import React, { useState } from 'react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

const ExpanderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  > p {
    color: ${props => props.theme.colors.secondary};
  }
`
const ExpanderLink = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.tertiary}!important;
`
export default function Expander({href,infoText}) {
  const [expanded, setExpanded] = useState(false)
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para} = sizedStyles
  if (!expanded){
    return (
      <ExpanderDiv>
        <ExpanderLink style={h3} href={href} onClick={() => setExpanded(true)}>More...</ExpanderLink>
      </ExpanderDiv>
    )
  } else {
    return(
      <ExpanderDiv>
        <ExpanderLink style={h3} onClick={() => setExpanded(false)}>...Less</ExpanderLink>
        <p style={para}>
          {infoText}
        </p>
      </ExpanderDiv>
    )
  }
}
