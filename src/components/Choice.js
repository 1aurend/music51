import React from 'react'
import { Button } from 'shards-react'


export default function Choice({ choice, input, red, green, onClick }) {

  let style = {minHeight: '10vh', minWidth: '10vh', marginLeft: '2%', marginRight: '2%', marginBottom: '2%', fontWeight: '400', fontSize: '2rem', textAlign: 'center'}
  let inversion

    if (choice === input) {
      if (red) {
        style = {...style, backgroundColor: '#c4183c'}
      }}

    if (green.includes(choice)) {
        style = {...style, backgroundColor: '#17c671'}
      }


    if (choice.includes('6') || choice.includes('4')) {
      inversion = <span style={{postion: 'absolute'}}><sup style={{display:'inline-block', position:'relative', left:'0px', top:'-10px'}}>{choice.charAt(choice.length-2)}</sup><sub style={{position:'relative', left:'-14px', top:'8px'}}>{choice.charAt(choice.length-1)}</sub></span>
      choice = choice.slice(0,-2)
    }

  return (
    <Button theme="light" style={style} onClick={onClick}>{choice}{inversion}</Button>
  )

}
