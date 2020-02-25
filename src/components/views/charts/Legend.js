import React, { useContext } from 'react'
import styled from 'styled-components'
import { Session } from '../../data/Context'
import {SmallPixelBorderSingle, SmallPixelBorderDouble, SmallPixelBorderOutline, MediumPixelBorder, LargePixelBorder, JumboPixelBorder, MegaPixelBorder} from './PixelBorder'


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

export function Legend({chartData}) {
  const qTypes = chartData.chartData.categoriesIncluded
  return (
    <LegendWrapper>
      {qTypes.map((value,index)=>{
        return <LegendDot />
      })}
    </LegendWrapper>
  )
}
