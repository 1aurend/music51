import React, { useState, useRef, useContext } from 'react'
import Quiz from './Quiz'
import generateChords from '../chordGenerator'
import { Session, Means } from './Context'
import StartMenu from './views/StartMenu'


export default function Start({ title, round }) {
  const [session, updateSession] = useContext(Session)
  const updateMeans = useContext(Means)[1]
  const numQs = useRef(5)
  const [ready, launchQuiz] = useState(false)
  const [quiz, setQuiz] = useState()
  const [options, updateOptions] = useState({
    chordTypes: {triads:true, sevenths:true},
    roots: {common:true, any:false}
  })

  // QUESTION: Does this need 'e'? Does it ultimately need to await?
  const generateQuiz = async (e) => {
      //name this variable better
      const data = await generateChords(numQs.current, options)
      //move this to the end and get rid of ready
      setQuiz(data)
      //this logic seems like it duplicates logic in the revamped generator.
      // TODO: after we merge, decide whether we'd be pushing this sort of info to a db from here or in the generator, and if from here, grab the options enum and switch over it to get these values
      let chordTypes
      if (options.chordTypes.triads && options.chordTypes.sevenths) {
        chordTypes= ['triads', 'sevenths']
      }
      else if (options.chordTypes.triads && !options.chordTypes.sevenths) {
        chordTypes= ['triads']
      }
      else if (!options.chordTypes.triads && options.chordTypes.sevenths) {
        chordTypes= ['sevenths']
      }
      // QUESTION: why is options here in addition to roots and chordTypes?
      const settings = {
        numChords: numQs.current,
        chordTypes: chordTypes,
        roots: options.roots.common ? 'common' : 'any',
        options: options
      }
      updateSession({...session, settings: settings })
      //I think this now handles chords with different question types.
      // QUESTION: Is it useful to construct these empty objects here vs. just saving questionTypes as an array in context?
      const questionTypes = new Set((data.map( chord => {
        return chord.questions.map( question => {
          return question.type
        })
      })).flat())
      let means = {}
      questionTypes.forEach(question => {
        means = {...means, [question]: {
                            attempts: [],
                            times: []
                          }}
      })
      means = {...means, Overall: {
        attempts: [],
        times: []
      }}
      updateMeans(means)
      //get rid of this
      launchQuiz(true)
  }

  // QUESTION: What about 'e' here?
  const onCheck = (e, type, option) => {
    //are these necessary? they do make coping with two layers of object destructuring more parsible, but could easily get away with just next?
    let prev
    let next

    switch (type) {
      case 'chord':
          prev = options.chordTypes
          //there are 3 cases here but really only 2 things we do... is there a better way to organize this? maybe a single if/else?
          switch (prev[option]) {
            case false:
                next = {...prev, [option]: !prev[option]}
                updateOptions({...options, chordTypes: next })
                break
            case true:
                if (prev.triads === prev.sevenths) {
                  next = {...prev, [option]: !prev[option]}
                  updateOptions({...options, chordTypes: next })
                }
                else {
                  next = {triads:!prev.triads, sevenths:!prev.sevenths}
                  updateOptions({...options, chordTypes: next })
                }
                break
            default: alert('something went wrong selecting options')
          }
          break
      // QUESTION: This is commented out for roman numerals mode. Eventually we'll need to make a function that determines what mode we're in and whether to allow root options. Do we want to do anything about that now?
      case 'root':
          // prev = options.roots
          // next = {common: !prev.common, any: !prev.any}
          // updateOptions({...options, roots: next })
          break
      default: alert('something went wrong selecting options')

    }

  }

  if (!ready) {
    return <StartMenu title={title} generateQuiz={generateQuiz} numQs={numQs} onCheck={onCheck} options={options} />
  } else {
    return <Quiz data={quiz} round={round}/>
  }
}
