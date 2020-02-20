import React, { useState, useRef, useContext } from 'react'
import Quiz from './Quiz'
import generateChords from '../../generator/chordGenerator'
import { Dispatch } from '../data/Context'
import StartScreen from '../views/layouts/StartScreen'


export default function Start({ title, round }) {
  const dispatch = useContext(Dispatch)
  const numQs = useRef(5)
  const [quiz, setQuiz] = useState()
  const [options, updateOptions] = useState({
    chordTypes: {triads:true, sevenths:true},
    roots: {common:true, any:false}
  })

  const generateQuiz = async () => {
    //this probably doesn't actually need to await
    const questions = await generateChords(numQs.current, options)
    // TODO: after the generator refactor is finished, figure out what info about the session settings we'll want to push to a db and where to store that info
    const settings = {
      numChords: numQs.current,
      options: options
    }
    dispatch({type: 'settings', data: settings})
    setQuiz(questions)
  }
  const onCheck = (type, option) => {
    switch (type) {
      case 'chord':
        const disallowed = options.chordTypes.triads !== options.chordTypes.sevenths && options.chordTypes[option] ? true : false
        switch (disallowed) {
          case false:
            updateOptions({roots: options.roots, chordTypes: {...options.chordTypes, [option]: !options.chordTypes[option]}})
            break
          case true:
            updateOptions({roots: options.roots, chordTypes: {triads: !options.chordTypes.triads, sevenths: !options.chordTypes.sevenths}})
            break
          default: alert('something went wrong selecting options')
        }
        break
      case 'root':
        // QUESTION: this is commented out for roman numerals mode. Eventually we'll need to make a function that determines what mode we're in and whether to allow root options. Do we want to do anything about that now?
        // updateOptions({chordTypes: options.chordTypes, roots: {common: !options.roots.common, any: !options.roots.any}})
        break
      default: alert('something went wrong selecting options')
    }
  }

  if (!quiz) {
    return <StartScreen title={title} generateQuiz={generateQuiz} numQs={numQs} onCheck={onCheck} options={options} />
  } else {
    return <Quiz data={quiz} round={round}/>
  }
}
