import React from 'react'
import styled from 'styled-components'

export const Universe = styled.div`
  display: grid;
  grid-template-areas: ". . ." ". center ."". bug .";
  background-color: ${props => props.theme.colors.dark};
  height: 100vh;
  width: 100vw;
  overflow: scroll;
`

export const Grid = styled.div`
  display: grid;
  grid-area: center;
  grid-gap: 20px;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: minmax(min-content, max-content);
`

export const VFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  > * {
    margin: 5px 0px;
  }
`

export const HFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  > * {
    margin: 0px 5px;
  }
`



export const Bento = styled.div`
  display: flex;
  grid-area: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  > * {
    padding: 10px;
  }
`

export const Appetizer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  grid-area: B;
  align-items: center;
  justify-content: flex-start;
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
  justify-content: flex-start;
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
