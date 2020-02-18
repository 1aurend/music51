import React from 'react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'

const InstructionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > h3 {
    color: ${props => props.theme.colors.primary};
  }
  > p {
    color: ${props => props.theme.colors.secondary};
  }
`

export default function Instructions({infoText}) {
  const sizedStyles = useResponsiveStyles()
  const { h1, h2, h3, h4, para} = sizedStyles
    return(
      <InstructionsDiv>
        <h3 style={h3}>INSTRUCTIONS</h3>
        <p style={para}>
          In a round of Chord Crusher, you’ll answer a series of questions about each chord. You can choose the number of chords in a round (if you’re a newbie, try 5 chords). The goal is to answer questions in a round as quickly as possible, and then to beat your time in each successive round. Will you crush the chords? Or will the chords crush YOU?!</p>
      </InstructionsDiv>
    )
}
