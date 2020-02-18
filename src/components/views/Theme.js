import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalFonts from '../../fonts/fonts';

const rosequartz16 = {
  colors: {
    primary: '#F7CAC9',
    secondary: '#3791B3',
    tertiary: '#EAE377',
    light: '#FFE8E8',
    dark: '#382E2D'
  },
  pixelweight: '3px',
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

const greenery17 = {
  colors: {
    primary: '#88B04B',
    secondary: '#FC7D60',
    tertiary: '#647DBD',
    light: '#CDFC86',
    dark: '#3D4A3E'
  },
  pixelweight: '3px',
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

const ultraviolet18 = {
  colors: {
    primary: '#5F4B8B',
    secondary: '#6AD97A',
    tertiary: '#27592E',
    light: '#C1B6D9',
    dark: '#271C40',
  },
  pixelweight: '3px',
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

const livingcoral19 = {
  colors: {
    primary: '#FA7268',
    secondary: '#26AD5E',
    tertiary: '#FF8D85',
    light: '#EDFB82',
    dark: '#3B1B19'
  },
  pixelweight: '3px',
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

const classicblue20 = {
  colors: {
    primary: '#0F4C81',
    secondary: '#B53F04',
    tertiary: '#7979E8',
    light: '#FFFFF8',
    dark: '#082742'
  },
  pixelweight: '3px',
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}


export default function Theme({ children }){
  return(
    <ThemeProvider theme={classicblue20}>
      <GlobalFonts />{children}
    </ThemeProvider>
  )
};
