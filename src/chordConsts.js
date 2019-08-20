  // a list of example chord structures to choose from:
const triads = {
  "M": // was Major_Triad
  {"class":"LD","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"S","octave":0}]},

  "m": // was Minor_Triad
  {"class":"dor","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"S","octave":0}]},

  "o": // was Diminished_Triad
  {"class":"dim","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"V","octave":0}]},

  "+": // was Augmented_Triad
  {"class":"AD","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"P","octave":0}]}
}


// the contexts that will determine grammar for those chord structures:
// ("quality" and "incidental" are unused)
const classes = {
  "LD":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":-1},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":0},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":-1},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":0},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":-1},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}],

  "dor":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":0},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":1},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":0},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":1},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":0},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":-1},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}],

  "dim":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":0},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":1},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":0},{"tensionMod12":7,"tensionMod7":5,"quality":-1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":1},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":0},{"tensionMod12":10,"tensionMod7":7,"quality":-2,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":-1},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":0}],

  "AD":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":2,"quality":2,"incidental":1},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":0},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":-1},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":-1},{"tensionMod12":9,"tensionMod7":5,"quality":1,"incidental":0},{"tensionMod12":10,"tensionMod7":7,"quality":-2,"incidental":-1},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}]
}

const ip = ["R","N","M","F","V","S","P","L","K","T","D","B"];

const subsets = {
 "B": ["R","M","F","S","L","T","D"],
 "T": ["P","K","T","B","N","F","V"]
}

const letters = ["D","E","F","G","A","B","C"];
const octaveOrientedLetters = ['C','D','E','F','G','A','B'];


const rootAccidentals = ["b", "n", "#"];
const accidentals = ["bb", "b", "n", "#", "##"];

const clefs = ["bass","treble"];
// const clefs = ["treble"];
const inversions = ["root","63","64"]; // was "root_pos","1st_inv","2nd_inv"


export {
  triads,
  classes,
  ip,
  subsets,
  letters,
  octaveOrientedLetters,
  rootAccidentals,
  accidentals,
  clefs,
  inversions
}
