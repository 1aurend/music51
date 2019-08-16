import React from 'react'
import { Button } from 'shards-react'


export default function Choice({ choice, input, red, onClick}) {

  let style = {height: '10vh', width: '10vh', marginLeft: '2%', marginRight: '2%', marginBottom: '2%', fontWeight: '400', fontSize: '2rem'}

    if (choice === input) {
      if (red) {
        style = {...style, backgroundColor: 'red'}
      }
      else {
        style = {...style, backgroundColor: '#17c671'}
      }
    }


  return (
    <Button theme="light" style={style} onClick={onClick}>{choice}</Button>
  )

}
