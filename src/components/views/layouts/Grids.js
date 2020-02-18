import React from 'react'
import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 10% auto auto auto 10%;
  grid-template-rows: 1fr auto auto auto 1fr;
  background-color: ${props => props.theme.colors.dark};
  grid-gap: 2%;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
`

export const Cell = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`

export const SubCell = styled.div`
  display: flex;
  align-items: flex-start;
  > * {
    margin: 2%;
  }
`
