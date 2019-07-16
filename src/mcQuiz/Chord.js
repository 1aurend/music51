import React, { useEffect, useRef, useState } from 'react'


function Chord(props) {

  const container = useRef(document.createElement('container'))
  const [loading, done] = useState(true)

  let formattedNotes = []
  let accidentals = []
    for (var i = 0; i < props.notes.length; i++) {
      formattedNotes.push(props.notes[i] + '/' + props.octaves[i])
      if (props.notes[i].length > 1) {
        accidentals.push({note: i, accidental: props.notes[i].slice(1)})
      }
    }

  let colors = []
    for (var i = 0; i < props.colors.length; i++) {
      for (var j = 0; j < props.notes.length; j++) {
        let noteName = props.notes[j].length === 1 ? props.notes[j] : props.notes[j].slice(0,-1)
        if (props.colors[i] === noteName) {
          colors.push({key: j, color: 'chartreuse'})
        }
      }
    }


  useEffect(() => {

    let Vex = require('vexflow')

    if (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild)
    }

    let VF = Vex.Flow

    let renderer = new VF.Renderer(container.current, VF.Renderer.Backends.SVG);

    renderer.resize('1000px', '500px')

    let context = renderer.getContext()

    context.setViewBox(300,150,400,200)

    let stave = new VF.Stave(400, 200, 200)

    stave.addClef(props.clef).addTimeSignature("4/4")

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

      let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);

      voice.draw(context, stave);
  }



    done(false)

  }, [props.notes, props.colors, loading])


  return (
    <div ref={container} style={{
      display: "block",
      alignItems: 'center',
      padding: 10,
      width: '100%',
      height: '100%',
  }}>
  </div>
)

}

export default Chord
