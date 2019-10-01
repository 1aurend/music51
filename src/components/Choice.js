import React from 'react'
import { Button } from 'shards-react'


export default function Choice({ choice, keystroke, input, red, green, onClick }) {

  let style = {minHeight: '10vh', minWidth: '10vh', marginLeft: '2%', marginRight: '2%', marginBottom: '2%', fontSize: '2rem', textAlign: 'center', fontFamily: "'Overpass Mono', monospace", fontWeight: '600', borderWidth: '4px', borderRadius: '0'}
  let inversion

    if (choice === input) {
      if (red) {
        style = {...style, backgroundColor: '#c4183c'}
      }}

    if (green.includes(choice)) {
        style = {...style, backgroundColor: '#17c671'}
      }

    if (choice.includes('^')) {
      choice = <span>&nbsp;{choice.charAt(0)}<sup style={{position:'relative', left:'-15px', top:'-17px'}}>^</sup></span>
    }
    else if (choice.includes('6') || choice.includes('4')) {
      inversion = <span style={{postion: 'absolute'}}><sup style={{display:'inline-block', position:'relative', left:'0px', top:'-17px'}}>{choice.charAt(choice.length-2)}</sup><sub style={{position:'relative', left:'-14px', top:'6px'}}>{choice.charAt(choice.length-1)}</sub></span>
      choice = choice.slice(0,-2)
    }


  return (
    <Button theme="light" style={style} onClick={onClick}>{choice}{inversion}<p style={{fontSize: '14px', color: '#898a8d', marginBottom: '0', marginTop: '2'}}>[{keystroke}]</p></Button>
  )

}
