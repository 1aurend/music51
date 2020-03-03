import React, { createContext, useState, useReducer } from 'react'
import StartMenu from '../logic/StartMenu'
import sessionDataReducer from './sessionDataReducer'
import { ThemeProvider } from "styled-components";
import GlobalFonts from '../../fonts/fonts';
import * as Themes from '../views/Theme'

export const Session = createContext()
export const Dispatch = createContext()
export const ThemeSwitch = createContext()

let i = 0
let options = Object.keys(Themes)

export default function Context() {
  const [currentTheme, setCurrentTheme] = useState('fewerHues');
  const switchTheme = () => {
    setCurrentTheme(options[i])
    console.log(options[i]);
    i+=1
    if (i > options.length-1){
      i=0
    }
  }
  const initialSettings = {
        user: 'anonymous for now',
        sessionId: Date.now(), // TODO: come up with a system for this
        settings: {
          numChords: 0,
          options: {}
        },
        rounds: {},
        means: {},
      }
  const [sessionData, dispatch] = useReducer(sessionDataReducer, initialSettings)
  return (
    <Session.Provider value={sessionData}>
      <Dispatch.Provider value={dispatch}>
        <ThemeSwitch.Provider value={switchTheme}>
          <ThemeProvider theme={Themes[currentTheme]}>
            {/*do headline and round need to start here as props?*/}
            {/*also round really shouldn't be a prop; can get this from Object.keys(sessionData.rounds)*/}
            <GlobalFonts />
            <StartMenu title={{headline: 'Chord Crusher', mode: '*non-diatonic mode*', subtitle: 'MUSIC 51'}} round={1}/>
          </ThemeProvider>
        </ThemeSwitch.Provider>
      </Dispatch.Provider>
    </Session.Provider>
  )
}
