import React from 'react'
import { selector } from './quizStyles'



export default function Options({checked, onChange, onCheck}) {

  console.log(JSON.stringify(checked));

    return (
      <div style={selector}>
        <h3>We recommend 10 chords with a goal of less than 2 seconds per question, but you can enter a different number of chords here for a longer or shorter session:</h3>
        <input onChange={onChange} type="text" placeholder="10"/>
        <div>
            <h3>Chord Types</h3>
            <label class="container">Major
                <input type="checkbox" value={'major'} checked={checked.chordTypes.major} onChange={(e) => onCheck(e, 'chord')}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Minor
                <input type="checkbox" value={'minor'}checked={checked.chordTypes.minor} onChange={e => onCheck(e, 'chord')}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Augmented
                <input type="checkbox" value={'aug'} checked={checked.chordTypes.aug} onChange={e => onCheck(e, 'chord')}/>
                <span class="checkmark"></span>
            </label>
            <label class="container">Diminished
                <input type="checkbox" value={'dim'} checked={checked.chordTypes.dim} onChange={e => onCheck(e, 'chord')}/>
                <span class="checkmark"></span>
            </label>
          </div>
          <div>
              <h3>Clefs</h3>
              <label class="container">Treble
                  <input type="checkbox" value={'treble'} checked={checked.clefs.treble} onChange={e => onCheck(e, 'clef')}/>
                  <span class="checkmark"></span>
              </label>
              <label class="container">Base
                  <input type="checkbox" value={'base'}checked={checked.clefs.base} onChange={e => onCheck(e, 'clef')}/>
                  <span class="checkmark"></span>
              </label>
            </div>
            <div>
                <h3>Root Notes</h3>
                <label class="container">Easy
                    <input type="checkbox" value={'easy'} checked={checked.roots.easy} onChange={e => onCheck(e, 'root')}/>
                    <span class="checkmark"></span>
                </label>
                <label class="container">Medium
                    <input type="checkbox" value={'medium'} checked={checked.roots.medium} onChange={e => onCheck(e, 'root')}/>
                    <span class="checkmark"></span>
                </label>
                <label class="container">Hard
                    <input type="checkbox" value={'hard'} checked={checked.roots.hard} onChange={e => onCheck(e, 'root')}/>
                    <span class="checkmark"></span>
                </label>
              </div>
      </div>
    )

}
