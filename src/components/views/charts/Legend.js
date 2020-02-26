import React from 'react'
import styled from 'styled-components'
import { questionsList } from '../../../generator/questionsList'


const LegendWrapper = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
`

const LegendItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const LegendDot = styled.div`
  display: block;
  background-color:${props => props.dotColor};
  width: 16px;
  height: 16px;
  margin: 8px;
`

const LegendText = styled.h3`
  font-family: 'Thintel', monospace;
  color: ${props => props.theme.colors.dark};
  font-size: 24px;
  font-weight: 600;
`

export default function Legend({ chartData }) {
  let legendItems = chartData.chartData.categoriesIncluded.filter(type => type !== 'Overall')
    .map( type => {
        return (
          <LegendItem>
            <LegendDot dotColor={questionsList[type].chartColor} />
            <LegendText>{questionsList[type].shortName}</LegendText>
          </LegendItem>
        )
    })
  legendItems = [...legendItems,
    <LegendItem>
      <LegendDot dotColor={'#000000'} />
      <LegendText>{'Overall'}</LegendText>
    </LegendItem>
  ]

  return (
    <LegendWrapper>
      {legendItems}
    </LegendWrapper>
  )
}
