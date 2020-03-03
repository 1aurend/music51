import React, {useContext} from 'react'
import styled from 'styled-components'
import {ThemeSwitch} from '../../data/Context'
import {SolidButtonTheme} from '../layouts/PixelBorder'


const StyledSvgButton = styled.div`
  display: block;
  cursor: pointer;
  border: none;
  padding: 10px;
`

export default function NextTheme({ onClick }) {
  const themeUpdate = useContext(ThemeSwitch)
  const testFunction = () =>{
    console.log('this is a test');
  }
  return (
    <>
      <StyledSvgButton
        onClick={themeUpdate} title='next theme' alt='next themeZ'
        >
        <SolidButtonTheme text='< THEME >' />
      </StyledSvgButton>
    </>
  )
}
