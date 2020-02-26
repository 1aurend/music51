import React, { useState } from 'react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

const ExpanderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 4%;
  > p {
    color: ${props => props.theme.colors.light};
    text-align: left !important;
    margin: 0 15%;

`
const ExpanderLink = styled.a`
  cursor: pointer;
  transition: 0.5s;
  color: ${props => props.theme.buttonColors.green1}!important;
  &:hover {
    color: ${props => props.theme.buttonColors.green3}!important;
  }
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
