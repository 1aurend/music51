import React from 'react'
import { Button } from 'shards-react'


export default function Choice({ choice, input, red, green, onClick }) {

  let style = {minHeight: '10vh', minWidth: '10vh', marginLeft: '2%', marginRight: '2%', marginBottom: '2%', fontSize: '2rem', textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600', borderWidth: '4px', borderRadius: '0'}
  let inversion

    if (choice === input) {
      if (red) {
        style = {...style, backgroundColor: '#c4183c'}
      }}

    if (green.includes(choice)) {
        style = {...style, backgroundColor: '#17c671'}
      }

    let keystroke = ''
    switch (choice) {
      case "A":
      case "A♭":
      case "A𝄫":
      case "A♯":
      case "A𝄪":
        keystroke = "a"
        break
      case "B":
      case "B♭":
      case "B𝄫":
      case "B♯":
      case "B𝄪":
        keystroke = "b"
        break
      case "C":
      case "C♭":
      case "C𝄫":
      case "C♯":
      case "C𝄪":
        keystroke = "c"
        break
      case "D":
      case "D♭":
      case "D𝄫":
      case "D♯":
      case "D𝄪":
        keystroke = "d"
        break
      case "E":
      case "E♭":
      case "E𝄫":
      case "E♯":
      case "E𝄪":
        keystroke = "e"
        break
      case "F":
      case "F♭":
      case "F𝄫":
      case "F♯":
      case "F𝄪":
        keystroke = "f"
        break
      case "G":
      case "G♭":
      case "G𝄫":
      case "G♯":
      case "G𝄪":
        keystroke = "g"
        break
      case "1^":
        keystroke = "1"
        break
      case "2^":
        keystroke = "2"
        break
      case "3^":
        keystroke = "3"
        break
      case "4^":
        keystroke = "4"
        break
      case "5^":
        keystroke = "5"
        break
      case "6^":
        keystroke = "6"
        break
      case "7^":
        keystroke = "7"
        break
      default:
        break
    }

    if (choice.includes("63") || choice.includes("43")) {
      keystroke = "3"
    }
    else if (choice.includes("64")) {
      keystroke = "4"
    }
    else if (choice.includes("65")) {
      keystroke = "5"
    }
    else if (choice.includes("42")) {
      keystroke = "2"
    }
    else if (choice.includes("root")) {
      keystroke = "r"
    }
    else if (choice.includes("o") && choice !== 'root') {
      keystroke = "d"
    }
    else if (choice.includes("ø")) {
      keystroke = "h"
    }
    else if (choice.includes("M")) {
      keystroke = "M"
    }
    else if (choice.includes("+")) {
      keystroke = "A"
    }
    else if (choice.includes("7")) {
      keystroke = "7"
    }
    else if (choice.includes("m")) {
      keystroke = "m"
    }



    if (choice.includes('^')) {
      choice = <span style={{postion: 'absolute'}}>{choice.charAt(0)}<sup style={{display:'inline-block', position:'relative', left:'-10px', top:'-13px'}}>^</sup></span>
    }
    else if (choice.includes('6') || choice.includes('4')) {
      inversion = <span style={{postion: 'absolute'}}><sup style={{display:'inline-block', position:'relative', left:'0px', top:'-13px'}}>{choice.charAt(choice.length-2)}</sup><sub style={{position:'relative', left:'-14px', top:'10px'}}>{choice.charAt(choice.length-1)}</sub></span>
      choice = choice.slice(0,-2)
    }


  return (
    <Button theme="light" style={style} onClick={onClick}>{choice}{inversion}<p style={{fontSize: '14px', color: '#898a8d', marginBottom: '0', marginTop: '2'}}>[{keystroke}]</p></Button>
  )

}
