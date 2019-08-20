import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'shards-react'


export default function Chord(props) {

  const container = useRef(document.createElement('container'))
  const [loading, done] = useState(true)

  let formattedNotes = []
  let accidentals = []
    for (var i = 0; i < props.notes.length; i++) {
      formattedNotes.push(props.notes[i].letter + '/' + props.notes[i].octave)
      if (props.notes[i].accidental) {
        accidentals.push({note: i, accidental: props.notes[i].accidental})
      }}

    console.log(accidentals);
    console.log(formattedNotes);

  let colors = []
    for (var i = 0; i < props.colors.length; i++) {
      for (var j = 0; j < props.notes.length; j++) {
        let noteName = props.notes[j].letter
        if (props.colors[i] === noteName) {
          colors.push({key: j, color: '#17c671'})
        }
      }
    }


  useEffect(() => {

    let staveSize = {
      svgWidth: '',
      svgHeight: '',
      viewBoxWidth: 0,
      viewBoxHeight: 0,
    }

    if (props.size >= 500) {
      staveSize.svgWidth = '500px'
      staveSize.svgHeight = '250px'
      staveSize.viewBoxWidth = 200
      staveSize.viewBoxHeight = 100
    }
    else {
      staveSize.svgWidth = '300px'
      staveSize.svgHeight = '150px'
      staveSize.viewBoxWidth = 200
      staveSize.viewBoxHeight = 100
    }


    let Vex = require('vexflow')

    if (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild)
    }

    let VF = Vex.Flow

    let renderer = new VF.Renderer(container.current, VF.Renderer.Backends.SVG);

    renderer.resize(staveSize.svgWidth, staveSize.svgHeight)

    let context = renderer.getContext()

    context.setViewBox(-10,0,staveSize.viewBoxWidth,staveSize.viewBoxHeight)

    let stave = new VF.Stave(0, 0, 180)

    stave.addClef(props.clef).addTimeSignature("4/4")

    stave.addModifier(new Vex.Flow.KeySignature('F'))

    stave.setContext(context).draw()


    if (props.notes.length > 0) {

      let notes = [new VF.StaveNote({clef: 'treble', keys: formattedNotes, duration: "w", align_center: true})]

      if (accidentals.length > 0) {
        for (var i = 0; i < accidentals.length; i++) {
           notes = [notes[0].addAccidental(accidentals[i].note, new VF.Accidental(accidentals[i].accidental))]
        }
      }

      if (colors.length > 0) {
        for (var i = 0; i < colors.length; i++) {
          notes[0].setKeyStyle(colors[i].key, { fillStyle: colors[i].color});
        }
      }

      let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
      voice.addTickables(notes);

      let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);

      voice.draw(context, stave);
  }



    done(false)

  }, [props.notes, props.colors, loading, props.size])


  return (
    <div ref={container} style={{
      display: "block",
      alignItems: 'center',
      // padding: 10,
      width: '100%',
      height: '100%',
  }}>
  </div>
)

}
