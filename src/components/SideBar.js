import React from 'react'
import { sidebar, sidebarh4 } from './quizStyles'


export default function SideBar(props) {

  let answersSideBarText

  if (props.text.length >= 1) {
    answersSideBarText = props.text.map((item) => {
      return <h4 style={sidebarh4} key={item}>{item}</h4>
    })
  }
  else {
    answersSideBarText = null
  }


  return (
    <div style={sidebar}>
      {answersSideBarText}
    </div>
  )

}
