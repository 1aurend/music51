import React, { useRef } from 'react'
import useResponsiveStyles from '../../hooks/useResponsiveStyles'
import styled from 'styled-components'


const StyledSvgContainer = styled.div`
  display: block;
  align-items: center;
  width: 100%;
  height: 100%;
`

// QUESTION: I seem to remember we talked about pushing some other formatting work related to Vexflow out of the generator and into here. What did that include?
function Vexflow(props) {
  const { notes, keySig, clef, colors } = props
  const vexflowContainer = useRef(document.createElement('container'))
  const staveSize = useResponsiveStyles().staveSize
  const formattedNotes = notes.map(note => {
    return note.letter + '/' + note.octave
  })
  const accidentals = notes.map((note, i) => {
    switch (note.accidental) {
    case '♮':
      return {note: i, accidental: 'n'}
    case '♭':
      return {note: i, accidental: 'b'}
    case '𝄫':
      return {note: i, accidental: 'bb'}
    case '♯':
      return {note: i, accidental: '#'}
    case '𝄪':
      return {note: i, accidental: '##'}
    default:
      return null
    }
  }).filter(val => val !== null)
  const vexflowKeySig = keySig.length === 1 ? keySig : keySig.charAt(1) === '♯' ? keySig.charAt(0)+'#' : keySig.charAt(0)+'b'
  const noteColors = colors.map(color => {
    return notes.map(note => note.letter).indexOf(color.charAt(0))
    })

  const VF = require('vexflow').Flow
  if (vexflowContainer.current.firstChild) {
    vexflowContainer.current.removeChild(vexflowContainer.current.firstChild)
  }
  const renderer = new VF.Renderer(vexflowContainer.current, VF.Renderer.Backends.SVG)
  renderer.resize(staveSize.svgWidth, staveSize.svgHeight)
  const context = renderer.getContext()
  context.setViewBox(0,0,staveSize.viewBoxWidth,staveSize.viewBoxHeight)
  const stave = new VF.Stave(0, 0, 250)
  stave.addClef(clef).addTimeSignature("4/4")
  stave.addModifier(new VF.KeySignature(vexflowKeySig))
  stave.setContext(context).draw()
  const vexNotes = [new VF.StaveNote({clef: clef, keys: formattedNotes, duration: "w", align_center: true})]
  accidentals.forEach(accidental => {
    vexNotes[0].addAccidental(accidental.note, new VF.Accidental(accidental.accidental))
  })
  noteColors.forEach(index => {
    vexNotes[0].setKeyStyle(index, { fillStyle: '#26AD5E'})
  })
  const voice = new VF.Voice({num_beats: 4,  beat_value: 4})
  voice.addTickables(vexNotes)
  const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100)
  voice.draw(context, stave)

  return <StyledSvgContainer ref={vexflowContainer} />
}

export default React.memo(Vexflow)
