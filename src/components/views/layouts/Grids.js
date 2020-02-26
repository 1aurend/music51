import React from 'react'
import styled from 'styled-components'

export const Universe = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10% 10% 0 10%;
  background-color: ${props => props.theme.colors.dark};
  height: 100vh;
  width: 100vw;
  overflow: scroll;
`

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: minmax(min-content, max-content);
`

export const Appetizer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  grid-area: B;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
`
export const Entree = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  grid-area: A;
  align-items: center;
  justify-content: center;
`
export const Dessert = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  grid-area: C;
  align-items: center;
  justify-content: center;
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
