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
    console.log(choice);
    switch (choice) {
      case "A":
      case "A♭":
      case "A𝄫":
      case "A♯":
      case "A𝄪":
        keystroke = "A"
        break
      case "B":
      case "B♭":
      case "B𝄫":
      case "B♯":
      case "B𝄪":
        keystroke = "B"
        break
      case "C":
      case "C♭":
      case "C𝄫":
      case "C♯":
      case "C𝄪":
        keystroke = "C"
        break
      case "D":
      case "D♭":
      case "D𝄫":
      case "D♯":
      case "D𝄪":
        keystroke = "D"
        break
      case "E":
      case "E♭":
      case "E𝄫":
      case "E♯":
      case "E𝄪":
        keystroke = "E"
        break
      case "F":
      case "F♭":
      case "F𝄫":
      case "F♯":
      case "F𝄪":
        keystroke = "F"
        break
      case "G":
      case "G♭":
      case "G𝄫":
      case "G♯":
      case "G𝄪":
        keystroke = "G"
        break
      default:
        break
    }


    // case choice.includes("M"):
    //   keystroke = "M"
    //   break
    // case choice.includes("m"):
    //   keystroke = "m"
    //   break
    // case choice.includes("o"):
    //   keystroke = "d"
    //   break
    // case choice.includes("ø") :
    //   keystroke = "h"
    //   break
    // case choice.includes("+"):
    //   keystroke = "A"
    //   break
    // case choice.includes("63"):
    // case choice.includes("43"):
    //   keystroke = "3"
    //   break
    // case choice.includes("64"):
    //   keystroke = "4"
    //   break
    // case choice.includes("65"):
    //   keystroke = "5"
    //   break
    // case choice.includes("42"):
    //   keystroke = "2"
    //   break
    // case choice.includes("root"):
    //   keystroke = "r"
    //   break

    if (choice.includes('6') || choice.includes('4')) {
      inversion = <span style={{postion: 'absolute'}}><sup style={{display:'inline-block', position:'relative', left:'0px', top:'-13px'}}>{choice.charAt(choice.length-2)}</sup><sub style={{position:'relative', left:'-14px', top:'10px'}}>{choice.charAt(choice.length-1)}</sub></span>
      choice = choice.slice(0,-2)
    }


  return (
    <Button theme="light" style={style} onClick={onClick}>{choice}{inversion}<p style={{fontSize: '10px', color: '#17c671', marginBottom: '0', marginTop: '2'}}>[{keystroke}]</p></Button>
  )

}
