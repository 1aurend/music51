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
const mockData = {
          "Names": {
             "attempts": [
                3,
                1,
                7
             ],
             "times": [
                2.3,
                1.85,
                67.3
             ]
          },
          "Roots": {
             "attempts": [
                null,
                null,
                null,
             ],
             "times": [
                null,
                null,
                null
             ]
          },
          "Degrees": {
             "attempts": [
                4,
                9,
                2
             ],
             "times": [
                4.5,
                6,
                1.2
             ]
          },
          "Role": {
             "attempts": [
                2,
                6,
                3
             ],
             "times": [
                1.2,
                1.2,
                3.4
             ]
          },
          "Numerals": {
             "attempts": [
                null,
                null,
                null
             ],
             "times": [
                null,
                null,
                null
             ]
          },
          "Quality": {
             "attempts": [
                null,
                4,
                1,
                5
             ],
             "times": [
                null,
                0.5,
                1.2,
                1.9
             ]
          },
          "Inversions": {
             "attempts": [
                2,
                null,
                null
             ],
             "times": [
                0.3,
                null,
                null
             ]
          },
          "Follows": {
             "attempts": [
                null,
                null,
                2
             ],
             "times": [
                null,
                null,
                3.4
             ]
          },
          "Overall": {
             "attempts": [
                3,
                2,
                5
             ],
             "times": [
                1.18,
                2.3,
                6.4
             ]
          }
    }

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
            mockData={mockData}
            />} />
      </BrowserRouter>
    )
  }
