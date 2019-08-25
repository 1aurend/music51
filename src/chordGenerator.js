import {
  templateTriads,
  templateSevenths,
  classes,
  ip,
  subsets,
  keySignatures,
  letters,
  octaveOrientedLetters,
  rootAccidentals,
  accidentals,
  clefs,
  triadInversions,
  seventhInversions
} from './chordConsts'

// a function to choose something random:
function randomchoice(array){
   return array[Math.floor(Math.random()*array.length)];
}

// the super cool Fisher-Yates shuffle
function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// adjusts the whole chord for clef/staff upper limit
// TODO: make sure this matches with the range set in randomChoice(clefs)
// this assumes a structure will only exceed ONE of those limits, not both. also has an "or" statement for upper limit octaves, but not lower (because chords are inverted/modified upward)
function staffAdjust(chord){
  let adjust = 0

  for(var i=0; i<chord.notes.length; i++){

    // bass clef upper limit is F4
    if (chord.clef === 'bass') {
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) > octaveOrientedLetters.indexOf("F")) {
        if (chord.notes[i].octave >= 4) {
          adjust = -1
          break
        }
      }
      else if (chord.notes[i].octave === 5) {
        adjust = -1
        break
      }
    }

    // bass clef lower limit is B1
    if (chord.clef === 'bass') {
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("B")) {
        if (chord.notes[i].octave <= 1) {
          adjust = 1
          break
        }
      }
    }

    // treble clef upper limit is F6
    if (chord.clef === 'treble') {
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) > octaveOrientedLetters.indexOf("F")) {
        if (chord.notes[i].octave >= 6) {
          adjust = -1
          break
        }
      }
      else if (chord.notes[i].octave === 6) {
        adjust = -1
        break
      }
    }

    // treble clef lower limit is G3
    if (chord.clef === 'treble') {
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("G")) {
        if (chord.notes[i].octave <= 3) {
          adjust = 1
          break
        }
      }
    }
  }

  // apply the adjust to each note
  for(var j=0; j<chord.notes.length; j++){
    chord.notes[j].octave += adjust
  }
    // console.log("adjust: " +adjust);
  return(chord)
}

// and a big function to generate a random, correctly spelled chord structure within clef/staff limits:
function randomChord(options, templateTriads, templateSevenths, subsets, keySignatures, rootAccidentals, accidentals, ip, triadInversions, seventhInversions){

  let template
  let inversions
  let chordType

  // apply options for triad or seventh
  if((options.chordTypes.triads == true) && (options.chordTypes.sevenths == false)){
    template = templateTriads
    inversions = triadInversions
    chordType = 'triad'
  }
  if((options.chordTypes.triads == false) && (options.chordTypes.sevenths == true)){
    template = templateSevenths
    inversions = seventhInversions
    chordType = 'seventh'
  }
  if((options.chordTypes.triads == true) && (options.chordTypes.sevenths == true)){
    template = randomchoice([templateTriads,templateSevenths])
    if(template == templateTriads){
      inversions = triadInversions
      chordType = 'triad'
    }
    if(template == templateSevenths){
      inversions = seventhInversions
      chordType = 'seventh'
    }
  }
  // console.log('chord type is: '+chordType);

  // choose a random key keySignature
  let keySignature = randomchoice(Object.keys(keySignatures));
  let vexSig = keySignatures[keySignature].vexSig;
    console.log('key signature is: '+ vexSig)

  // choose a random chord type
  let newStructure = randomchoice(Object.keys(template));
  let newClass = template[newStructure].class
  let newRoot = template[newStructure].anchor

  let rootSyllable
  let rootAccidental

  // apply option for any root notes
  if((options.roots.common == false) && (options.roots.any == true)){

    rootSyllable = randomchoice(subsets.B); // B is set implicitly as the "reference" subset
    rootAccidental = randomchoice(rootAccidentals);

    // adjust 'o7' chords where the o7th would be a triple flat
    if ((newStructure == 'o7') && (rootSyllable == 'D' || rootSyllable == 'F') && (rootAccidental == "b")){
      rootAccidental = 'n'
    }
    // adjust '+' chords where the +5th would be a triple sharp
    if ((newStructure == '+') && (rootSyllable == 'T') && (rootAccidental == "#")){
      rootAccidental = 'n'
    }
  }

  // apply option for common root notes
    let modeNote

    // set the mode note based on chord type
    if(newStructure == 'M' || newStructure == '+' || newStructure == 'M7'){
      modeNote = 'Maj'
    }
    if(newStructure == 'm' || newStructure == 'm7'){
      modeNote = 'min'
    }
    if(newStructure == 'o' || newStructure == 'ø7' || newStructure == 'o7'){
      modeNote = 'loc'
    }
    if(newStructure == '7'){
      modeNote = randomchoice(["Dom","phr"])
    }

    // set root syllable and accidental based on the mode note
    for(i=0; i<keySignatures[keySignature].notes.length; i++){
      if(keySignatures[keySignature].notes[i].mode == modeNote){
        rootSyllable = keySignatures[keySignature].notes[i].refIP
        rootAccidental = keySignatures[keySignature].notes[i].accidental
      }
    }

  // translate the syllable "position" to a letter
  let rootLetter = letters[subsets.B.indexOf(rootSyllable)] // order of reference subset IPs and order of letters need to match
    // console.log(rootLetter+rootAccidental+" "+newStructure);

  // find the equivalent IP based on the accidental's offset from the "natural" root syllable
  let offset = (accidentals.indexOf(rootAccidental))-(accidentals.indexOf("n")) // the distance from natural!
    // console.log(offset + " from natural")
  let rootIp = ip[(ip.indexOf(rootSyllable)+offset)%12]
    // console.log("IP: " + rootIp)

  // choose the octave of the starting (root) note.
  // TODO: make sure this range matches with the range set in staffAdjust()
  let clef = randomchoice(clefs)
  // console.log(clef + " clef")
  let clefOctave
  if(clef === "bass"){
    clefOctave = Math.floor(Math.random() * 4) + 1 // range of 4 octaves starting from octave 1
  }
  if(clef === "treble"){
    clefOctave = Math.floor(Math.random() * 4) + 3 // range of 4 octaves starting from octave 3
  }
    // console.log('clefOctave: '+clefOctave)

  // choose an inversion
  let inversion = randomchoice(inversions);
  // console.log(inversion);

  // build and begin populating the chord object
  let chord = {};
  // chord.rootLetter = rootLetter
  // chord.rootAccidental = rootAccidental
  // chord.type = newStructure
  // chord.inversion = inversion
  chord.clef = clef
  chord.keySignature = "C" // from Flow.keySignature.keySpecs (vexflow /tables.js)
  chord.notes = [];

  chord.questions = [
    {
      "type": "Note Names",
      "questionText": "Name the letter positions from lowest to highest.",
      "answers": [], // will populate in the loop
      "ordered": true,
      "choices": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G"
      ]
    },
    {
      "type": "Root",
      "questionText": "What's the root note?",
      "answers": [rootLetter+rootAccidental],
      "choices": [] // will populate in the loop
    },
    {
      "type": "Chord Quality",
      "questionText": "What's the chord quality?",
      "answers": [newStructure],
      "choices": Object.keys(template)
    },
    {
      "type": "Inversions",
      "questionText": "What's the inversion?",
      "answers": [inversion],
      "choices": inversions
    }
  ]

  // build the structure with correct spellings
  for(var i=0; i<template[newStructure].structure.length; i++){

    // translate the template ip to a relative note in the class
    let newNote = (ip.indexOf(template[newStructure].structure[i].ip) - ip.indexOf(newRoot) + 12)%12
      // console.log(classes[newClass][newNote])

    // get the syllable "position" from the reference subset based on tensionMod7 value in the class
    let noteSyllable = subsets.B[((subsets.B.indexOf(rootSyllable) + classes[newClass][newNote].tensionMod7 -1)%7)]
      // console.log(noteSyllable)

    // find the equivalent IP based on the rootIp and tensionMod12 value in the class
    let noteIp = ip[(ip.indexOf(rootIp) + classes[newClass][newNote].tensionMod12 -1)%12]
      // console.log("IP: " + noteIp)

    // find the accidental from the diff between IP and "natural" syllable (natural is accidentals[2])
    let accidentalVal = (ip.indexOf(noteIp))-(ip.indexOf(noteSyllable))
      // adjusts for IPs on opposite ends of the array, like "D" from "R"
      // but something about this feels hacky... is there a better way?
      if(accidentalVal > ip.length/2)accidentalVal -= ip.length
      if(-accidentalVal > ip.length/2)accidentalVal += ip.length
    let accidental = accidentals[(2 + accidentalVal)%5]
      // console.log(accidental)

    // incredibly lazy, temporary way to put this in keySignature == "C"
    // this doesn't affect rootAccidental. which begs a larger philosophical question of whether the chord or the keySignature should be generated first. hint: not the chord.
    // if(accidental === "n") accidental = ""

    // translate the syllable "position" to a letter
    let noteLetter = letters[subsets.B.indexOf(noteSyllable)]
      // console.log(noteLetter+accidental)

    // octave adjustments:
    // TODO: will this also work for template structures bigger than an octave?
    let octaveIndex = octaveOrientedLetters.indexOf(noteLetter)
    let octave = clefOctave
    if(chord.notes.length > 0 && octaveIndex < octaveOrientedLetters.indexOf(chord.notes[chord.notes.length-1].letter)){
      octave += 1;
      clefOctave +=1 // sets the default octave up for the next note
    }

    // push all this good stuff into the chord object
    let note = {}
    note.letter = noteLetter
    note.accidental = accidental
    note.octave = octave
    chord.notes.push(note);

      // console.log("note: " + JSON.stringify(note));

    chord.questions[0].answers.push(noteLetter);
    chord.questions[1].choices.push(noteLetter+accidental);

  }

  // shuffles the root note choices so they're not always in root position haha
  shuffle(chord.questions[1].choices)

  // adjusts the chord so it's within staff limits
  chord = staffAdjust(chord);

  // check for inversion and invert if necessary
  if (inversion !== 'root' && inversion !== '7') {
    return handleInversion(chord, inversion)
  }
  else {
    return(chord)
  }

}

function handleInversion(chord, inversion) {

  // inverts the chord, reorders chord.notes, and adjusts the ordered answer for inversion
  if((inversion === "63") || (inversion === "65")){
    chord.notes[0].octave += 1
    chord.notes.push(chord.notes.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
  }
  if((inversion === "64") || (inversion === "43")){
    chord.notes[0].octave += 1
    chord.notes[1].octave += 1
    chord.notes.push(chord.notes.shift());
    chord.notes.push(chord.notes.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
  }
  if(inversion === "42"){
    chord.notes[0].octave += 1
    chord.notes[1].octave += 1
    chord.notes[2].octave += 1
    chord.notes.push(chord.notes.shift());
    chord.notes.push(chord.notes.shift());
    chord.notes.push(chord.notes.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
  }

// adjusts the inverted chord so it's within staff limits
  let finalChord = staffAdjust(chord)
  return(finalChord)
}

export default (numQs, options) => {
  console.log(JSON.stringify(options));
  let chords = []
  for (var i = 0; i < numQs; i++) {
    chords.push(randomChord(options, templateTriads, templateSevenths, subsets, keySignatures, rootAccidentals, accidentals, ip, triadInversions, seventhInversions))
  }
  console.log(JSON.stringify(chords, null, 4));
  return chords
}
