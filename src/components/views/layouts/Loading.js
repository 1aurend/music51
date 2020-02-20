import React from 'react'
import styled from 'styled-components'
import useResponsiveStyles from '../../../hooks/useResponsiveStyles'
import Theme from '../Theme'



const Universe = styled.div`
  background-color: ${props => props.theme.colors.dark};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10%;
`

const LoadingText = styled.h1`
  color: ${props => props.theme.colors.light};
  line-height: 2em;
`

export default function Loading() {
  const sizedStyles = useResponsiveStyles()
  const {h1} = sizedStyles
  return (
    <Theme>
      <Universe>
        <LoadingText style={h1}>
          Calculating your stats...
        </LoadingText>
      </Universe>
    </Theme>
  )
}
