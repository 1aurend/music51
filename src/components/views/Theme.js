import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalFonts from '../../fonts/fonts';


const pixelWeight = '3px'

const buttonColors = {
  green1: '#26AD5E',
  green2: '#186E3C',
  green3: '#50FA97',
  red1: '#c4183c',
  red2: '#780720',
  red3: '#FF3863'
}

const rosequartz16 = {
  colors: {
    primary: '#FFF9FF',
    secondary: '#3791B3',
    tertiary: '#8285B8',
    light: '#F7CAC9',
    dark: '#3E515E'
  },
  pixelWeight:pixelWeight,
  buttonColors:buttonColors
}

const greenery17 = {
  colors: {
    primary: '#88B04B',
    secondary: '#6E4BE3',
    tertiary: '#994CB0',
    light: '#CDFC86',
    dark: '#233323'
  },
  pixelWeight:pixelWeight,
  buttonColors:buttonColors
}

const ultraviolet18 = {
  colors: {
    primary: '#5F4B8B',
    secondary: '#D622F2',
    tertiary: '#6AD97A',
    light: '#FFFFFF',
    dark: '#271C40',
  },
  pixelWeight:pixelWeight,
  buttonColors:buttonColors
}

const livingcoral19 = {
  colors: {
    primary: '#4082C7',
    secondary: '#FA7268',
    tertiary: '#39D4D2',
    light: '#FFFFFF',
    dark: '#1B4B7A'
  },
  pixelWeight:pixelWeight,
  buttonColors:buttonColors
}

const classicblue20 = {
  colors: {
    primary: '#0F4C81',
    secondary: '#B53F04',
    tertiary: '#7979E8',
    light: '#FFFFFF',
    dark: '#082742'
  },
  pixelWeight:pixelWeight,
  buttonColors:buttonColors
}

export default function Theme({ children }){
  return(
    <ThemeProvider theme={classicblue20}>
      <GlobalFonts />{children}
    </ThemeProvider>
  )
};
