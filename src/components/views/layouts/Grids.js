import React from 'react'
import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
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
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const SubCellMargin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  > * {
    margin: 2%
  }
`

export const BugWrapper = styled.div`
  display: grid;
  grid-template-rows:  42px 50px;
  grid-template-columns: 50px 50px;
  position: absolute;
  bottom: 5%;
  right: 5%;
`
