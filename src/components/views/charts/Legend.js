import React from 'react'
import styled from 'styled-components'
import { types } from 'somewhere'

const LegendWrapper = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  :hover {
    background:transparent;
  }
  grid-column: 2/2;
  grid-row: 2/2;
`

const LegendDot = styled.div`
  display: block;
  color:${props => props.theme.colors.tertiary};
  cursor: pointer;
  padding: 0;
  background: transparent;
  :hover {
    background:transparent;
  }
`

export function Legend({types}) {
  return (
    <LegendWrapper>
      <LegendDot>
      </LegendDot>
    </LegendWrapper>
  )
}
