import {
  templateTriads,
  templateSevenths,
  classes,
  ip,
  subsets,
  letters,
  octaveOrientedLetters,
  rootAccidentals,
  accidentals,
  clefs,
  triadInversions,
  seventhInversions
} from './chordConsts'

// TODO:
// this all can happen inside randomChord function
// or in a function called handleOptions
// for now, use the options object inside of the randomChord.
const template = templateTriads // aggregate triads and sevenths into template
const inversions = triadInversions // aggregate triadInversions and seventhInversions into inversions


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
// TODO: make this easier to change, and match changes with the range of randomChoice(clefs)
// this assumes a structure will only exceed ONE of those limits, not both.
// also has an "or" statement for upper limit octaves, but not lower (because chords are inverted/modified upward)
function staffAdjust(chord){
  let adjust = 0

  for(var i=0; i<chord.notes.length; i++){

    // bass clef upper limit is F4
    // if(chord.clef === "bass" && (octaveOrientedLetters.indexOf((chord.notes[i].letter) > octaveOrientedLetters.indexOf("F") && chord.notes[i].octave >= 4) || chord.notes[i].octave === 5)){
    //   adjust = -1
    //   console.log('bass upper limit!');
    //   console.log('letter: ' + chord.notes[i].letter);
    //   console.log('octave: ' + chord.notes[i].octave);
    //   break
    // }
    if (chord.clef === 'bass') {
      console.log('bass=true');
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) > octaveOrientedLetters.indexOf("F")) {
        console.log('1st condition true');
        if (chord.notes[i].octave >= 4) {
          console.log('2nd condition true');
          console.log('letter index: '+octaveOrientedLetters.indexOf((chord.notes[i].letter)));
          console.log('F index: '+octaveOrientedLetters.indexOf("F"));
          adjust = -1
          console.log('bass upper limit!');
          console.log('letter: ' + chord.notes[i].letter);
          console.log('octave: ' + chord.notes[i].octave);
          break
        }
      }
      else if (chord.notes[i].octave === 5) {
        console.log('other condition true');
        adjust = -1
        console.log('bass upper limit!');
        console.log('letter: ' + chord.notes[i].letter);
        console.log('octave: ' + chord.notes[i].octave);
        break
      }
    }
    // bass clef lower limit is B1
    // if(chord.clef === "bass" && octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("B") && chord.notes[i].octave <= 1){
    //   adjust = 1
    //   console.log('bass lower limit!');
    //   console.log('letter: ' + chord.notes[i].letter);
    //   console.log('octave: ' + chord.notes[i].octave);
    //   break
    // }
    if (chord.clef === 'bass') {
      console.log('bass=true');
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("B")) {
        console.log('1st condition true');
        if (chord.notes[i].octave <= 1) {
          console.log('2nd condition true');
          console.log('letter index: '+octaveOrientedLetters.indexOf((chord.notes[i].letter)));
          adjust = 1
          console.log('bass lower limit!');
          console.log('letter: ' + chord.notes[i].letter);
          console.log('octave: ' + chord.notes[i].octave);
          break
        }
      }
    }
    // treble clef upper limit is F6
    if (chord.clef === 'treble') {
      console.log('treble=true');
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) > octaveOrientedLetters.indexOf("F")) {
        console.log('1st condition true');
        if (chord.notes[i].octave >= 6) {
          console.log('2nd condition true');
          console.log('letter index: '+octaveOrientedLetters.indexOf((chord.notes[i].letter)));
          console.log('F index: '+octaveOrientedLetters.indexOf("F"));
          adjust = -1
          console.log('treble upper limit!');
          console.log('letter: ' + chord.notes[i].letter);
          console.log('octave: ' + chord.notes[i].octave);
          break
        }
      }
      else if (chord.notes[i].octave === 6) {
        console.log('other condition true');
        adjust = -1
        console.log('treble upper limit!');
        console.log('letter: ' + chord.notes[i].letter);
        console.log('octave: ' + chord.notes[i].octave);
        break
      }
    }
    // if(chord.clef === "treble" && octaveOrientedLetters.indexOf((chord.notes[i].letter) > octaveOrientedLetters.indexOf("F") && chord.notes[i].octave >= 6) || chord.notes[i].octave === 6){
    //   adjust -= 1
    //   console.log('treble upper limit!');
    //   console.log('letter: ' + chord.notes[i].letter);
    //   console.log('octave: ' + chord.notes[i].octave);
    // }
    // treble clef lower limit is G3
    // if(chord.clef === "treble" && octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("G") && chord.notes[i].octave <= 3){
    //   adjust = 1
    //   console.log('treble lower limit!');
    //   console.log('letter: ' + chord.notes[i].letter);
    //   console.log('octave: ' + chord.notes[i].octave);
    //   break
    // }
    if (chord.clef === 'treble') {
      console.log('treble=true');
      if (octaveOrientedLetters.indexOf(chord.notes[i].letter) < octaveOrientedLetters.indexOf("G")) {
        console.log('1st condition true');
        if (chord.notes[i].octave <= 3) {
          console.log('2nd condition true');
          console.log('letter index: '+octaveOrientedLetters.indexOf((chord.notes[i].letter)));
          adjust = 1
          console.log('treble lower limit!');
          console.log('letter: ' + chord.notes[i].letter);
          console.log('octave: ' + chord.notes[i].octave);
          break
        }
      }
    }
  }
  // apply the adjust to each note
  for(var j=0; j<chord.notes.length; j++){
    chord.notes[j].octave += adjust
  }

  console.log("adjust: " +adjust);

  // console.log(JSON.stringify(chord, null, 4));
  return(chord)
}


// and a big function to generate a random, correctly spelled chord structure within clef/staff limits:
function randomChord(template, subsets, rootAccidentals, accidentals, ip, options){
  // choose a random structure, root, and accidental
  let newStructure = randomchoice(Object.keys(template));
  let newClass = template[newStructure].class
  let newRoot = template[newStructure].anchor
  let rootSyllable = randomchoice(subsets.B); // B is set implicitly as the "reference" subset
  let rootAccidental = randomchoice(rootAccidentals);
  // translate the syllable "position" to a letter
  let rootLetter = letters[subsets.B.indexOf(rootSyllable)]
    // console.log(rootLetter+rootAccidental+" "+newStructure);

  // find the equivalent IP based on the accidental's offset from the "natural" root syllable
  let offset = (accidentals.indexOf(rootAccidental))-(accidentals.indexOf("n")) // the distance from natural!
    // console.log(offset + " from natural")
  let rootIp = ip[(ip.indexOf(rootSyllable)+offset)%12]
    // console.log("IP: " + rootIp)

  // choose the octave of the starting (root) note.
  // TODO: make sure this range matches with staffAdjust()
  let clef = randomchoice(clefs)
  // console.log(clef + " clef")
  let clefOctave
  if(clef === "bass"){
    clefOctave = Math.floor(Math.random() * 4) + 1 // range of 4 octaves starting from octave 1
  }
  if(clef === "treble"){
    clefOctave = Math.floor(Math.random() * 4) + 3 // range of 4 octaves starting from octave 3
  }
  console.log('clefOctave: '+clefOctave)

  // this effectively zeroes everything out
  // let startingOctave = triads[newStructure].structure[0].octave // this takes the first note of the template structure, which works fine when the template is root position triads. better would be to loop through the structure and find the lowest octave number, or the lowest octave number that's also template[newStructure].anchor

  // let noteOctave = startingOctave // reset it outside the note loop
  // let lastOctaveIndex = startingOctave // this is so the octave "if" statement doesn't carry across chords. otherwise if octaveIndex of the first note of the new chord is less than the last note of the previous chord, the new chord will start an octive higher.

  let inversion = randomchoice(inversions);
  // console.log(inversion);

  let chord = {}; // an object to put the stuff in.
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
      "choices": [ // TODO: populate choices, include 7ths
          "M",
          "m",
          "o",
          "+"
      ]
    },
    {
      "type": "Inversions",
      "questionText": "What's the inversion?",
      "answers": [inversion],
      "choices": [ // TODO: populate choices, include 7ths
          "root",
          "63",
          "64"
      ]
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
    if(accidental === "n") accidental = ""

    // translate the syllable "position" to a letter
    let noteLetter = letters[subsets.B.indexOf(noteSyllable)]
      // console.log(noteLetter+accidental)

    // octave adjustments:
    // will this also work for template structures bigger than an octave?
    let octaveIndex = octaveOrientedLetters.indexOf(noteLetter)
    let octave = clefOctave
    // var lastOctaveIndex // just declaring it so i can use it the first time
    if(chord.notes.length > 0 && octaveIndex < octaveOrientedLetters.indexOf(chord.notes[chord.notes.length-1].letter)){
      octave += 1;
      clefOctave +=1 // sets the default octave up for the next note
    }
    // lastOctaveIndex = octaveIndex
    // here's the only safe place to add clefOctave. if you add it to startingOctave outside this loop, it does things like give you chords that start on octave 4 in bass clef.
    // let octave = noteOctave+clefOctave
    // let octave = clefOctave
    // console.log(octave)

    let note = {}
    note.letter = noteLetter
    note.accidental = accidental
    note.octave = octave
    chord.notes.push(note);

    console.log("note: " + JSON.stringify(note));

    chord.questions[0].answers.push(noteLetter);
    chord.questions[1].choices.push(noteLetter+accidental);

  }

  // shuffles the root note choices so they're not always in root position haha
  shuffle(chord.questions[1].choices)

  // adjusts the chord so it's within staff limits
  chord = staffAdjust(chord);
  // console.log("chord adjust: " + adjust); // outta scope now

  if (inversion !== 'root') {
    return handleInversion(chord, inversion)
  }
  else {
    return(chord)
  }

}

function handleInversion(chord, inversion) {

  // adjusts the ordered answer for inversion
  // inverts the chord. slicker would be to also reorder chord.notes, but not necessary.
  if(inversion === "63"){
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.notes[0].octave += 1
    chord.notes.push(chord.notes.shift());
  }
  if(inversion === "64"){
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.questions[0].answers.push(chord.questions[0].answers.shift());
    chord.notes[0].octave += 1
    chord.notes[1].octave += 1
    chord.notes.push(chord.notes.shift());
    chord.notes.push(chord.notes.shift());
  }

// adjusts the inverted chord so it's within staff limits
  let finalChord = staffAdjust(chord)
  return(finalChord)
}



export default (numQs, options) => {
  console.log(JSON.stringify(options));
  let chords = []
  for (var i = 0; i < numQs; i++) {
    chords.push(randomChord(template, subsets, rootAccidentals, accidentals, ip, options))
  }
  console.log('here is chords: ' + JSON.stringify(chords, null, 4));
  return chords
}
