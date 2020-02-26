//Junk file -- just organizing by role

let vexSig = keySignatures[keySignature].vexSig


  // build and begin populating the chord object
  let chord = {};
  // chord.rootLetter = rootLetter
  // chord.rootAccidental = rootAccidental
  // chord.type = newStructure
  // chord.inversion = inversion
  chord.clef = clef
  chord.keySignature = vexSig // from Flow.keySignature.keySpecs (vexflow /tables.js)
  chord.notes = []

  // only show natural in rootAccidental if it's an alteration from the key sig
  if ((rootAccidental === '♮') && (keySignatures[keySignature].notes[keySignatures[keySignature].notes.findIndex(function(syllable){return syllable.refIP === rootSyllable})].accidental != '♮')){
    rootAccidental = '♮'
  }
  else if (rootAccidental === '♮') {
    rootAccidental = ""
  }
