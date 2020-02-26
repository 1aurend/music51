import React from 'react'
import Context from './components/data/Context'
import { BrowserRouter, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import DevResultsTable from './components/views/layouts/stylingDevLayouts/DevResultsTable'
import DevStartScreen from './components/views/layouts/stylingDevLayouts/DevStartScreen'
import DevQuizQuestion from './components/views/layouts/stylingDevLayouts/DevQuizQuestion'
import DevStatLines from './components/views/layouts/stylingDevLayouts/DevStatLines'
import DevChartLayout from './components/views/layouts/stylingDevLayouts/DevChartLayout'


const mock = () => {
  alert('some function would run here')
}
const sampleChord =
   {
      "clef": "treble",
      "keySignature": "F",
      "notes": [
         {
            "letter": "G",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "B",
            "accidental": "",
            "octave": 4
         },
         {
            "letter": "D",
            "accidental": "",
            "octave": 5
         },
         {
            "letter": "F",
            "accidental": "",
            "octave": 5
         }
      ],
      "questions": [
         {
            "type": "Names",
            "questionText": "Name the letter positions from lowest to highest.",
            "answers": [
               "G",
               "B",
               "D",
               "F"
            ],
            "ordered": true,
            "choices": [
               {
                  "choice": "A",
                  "key": "a"
               },
               {
                  "choice": "B",
                  "key": "b"
               },
               {
                  "choice": "C",
                  "key": "c"
               },
               {
                  "choice": "D",
                  "key": "d"
               },
               {
                  "choice": "E",
                  "key": "e"
               },
               {
                  "choice": "F",
                  "key": "f"
               },
               {
                  "choice": "G",
                  "key": "g"
               }
            ]
         },
       ]
     }

const sampleRef = {current: sampleChord}

export default function Router() {
    return (
      <BrowserRouter>
        <Route path='/' exact component={Context} />
        <Route path='/start' exact render={() => <DevStartScreen
            title={{headline: 'Chord Crusher', mode: '*non-diatonic mode*', subtitle: 'MUSIC 51'}}
            generateQuiz={mock}
            numQs={1}
            onCheck={mock}
            options={{
              chordTypes: {triads:true, sevenths:true},
              roots: {common:true, any:false}
            }}
            />} />
        <Route path='/quiz' exact render={() => <DevQuizQuestion
            chord={sampleRef}
            question={sampleChord.questions[0]}
            colors={[]}
            handleClick={mock}
            onKeyPressed={mock}
            currentInput={'a'}
            />} />
        <Route path='/stats' exact render={() => <DevStatLines
            round={3}
            setShowStats={mock}
            nextRound={mock}
            finished={mock}
            />} />
          <Route path='/chart' exact render={() => <DevChartLayout
              chartData
              round={3}
              finished={mock}
              viewStats={mock}
              nextRound={mock}
              />} />
        <Route path='/table' exact render={() => <DevResultsTable
            round={3}
            startOver={mock}
            />} />
      </BrowserRouter>
    )
  }
