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
              <label class="container">Triads
                  <input type="checkbox" value={'triads'} checked={checked.chordTypes.triads} onChange={(e) => onCheck(e, 'chord')}/>
                  <span class="checkmark"></span>
              </label>
              <label class="container">7ths
                  <input type="checkbox" value={'sevenths'}checked={checked.chordTypes.sevenths} onChange={e => onCheck(e, 'chord')}/>
                  <span class="checkmark"></span>
              </label>
            </div>
            <div>
              <h3>Root Notes</h3>
                <label class="container">Common
                    <input type="checkbox" value={'common'} checked={checked.roots.common} onChange={e => onCheck(e, 'root')}/>
                    <span class="checkmark"></span>
                </label>
                <label class="container">Any
                    <input type="checkbox" value={'any'} checked={checked.roots.any} onChange={e => onCheck(e, 'root')}/>
                    <span class="checkmark"></span>
                </label>
              </div>
      </div>
    )

}
