// a list of example chord structures to choose from:
const templateTriads = {
  "M": // was Major_Triad
  {"class":"LD","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"S","octave":0}]},

  "m": // was Minor_Triad
  {"class":"dor","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"S","octave":0}]},

  "o": // was Diminished_Triad
  {"class":"dim","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"V","octave":0}]},

  "+": // was Augmented_Triad
  {"class":"AD","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"P","octave":0}]}
}

const templateSevenths = {
  "7":
  {"class":"LD","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"S","octave":0},{"ip":"K","octave":0}]},

  "M7":
  {"class":"Lyd","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"M","octave":0},{"ip":"S","octave":0},{"ip":"T","octave":0}]},

  "m7":
  {"class":"dor","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"S","octave":0},{"ip":"K","octave":0}]},

  "ø7":
  {"class":"dm","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"V","octave":0},{"ip":"K","octave":0}]},

  "o7":
  {"class":"dim","anchor":"D","structure":[{"ip":"D","octave":0},{"ip":"N","octave":0},{"ip":"V","octave":0},{"ip":"L","octave":0}]}
}

// the contexts that will determine grammar for those chord structures:
// ("quality" and "incidental" are unused)
const classes = {
  "Lyd":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":-1},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":0},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":-1},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":0},{"tensionMod12":9,"tensionMod7":5,"quality":1,"incidental":1},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":-1},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":0}],

  "LD":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":-1},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":0},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":-1},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":0},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":-1},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}],

  "dor":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":0},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":1},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":0},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":1},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":0},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":-1},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}],

  "dm":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":0},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":1},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":0},{"tensionMod12":7,"tensionMod7":5,"quality":-1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":1},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":0},{"tensionMod12":10,"tensionMod7":6,"quality":1,"incidental":1},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}],

  "dim":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":3,"quality":-1,"incidental":0},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":1},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":0},{"tensionMod12":7,"tensionMod7":5,"quality":-1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":1},{"tensionMod12":9,"tensionMod7":6,"quality":-1,"incidental":0},{"tensionMod12":10,"tensionMod7":7,"quality":-2,"incidental":0},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":-1},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":0}],

  "AD":
  [{"tensionMod12":1,"tensionMod7":1,"quality":0,"incidental":0},{"tensionMod12":2,"tensionMod7":2,"quality":-1,"incidental":-1},{"tensionMod12":3,"tensionMod7":2,"quality":1,"incidental":0},{"tensionMod12":4,"tensionMod7":2,"quality":2,"incidental":1},{"tensionMod12":5,"tensionMod7":3,"quality":1,"incidental":0},{"tensionMod12":6,"tensionMod7":4,"quality":0,"incidental":-1},{"tensionMod12":7,"tensionMod7":4,"quality":1,"incidental":0},{"tensionMod12":8,"tensionMod7":5,"quality":0,"incidental":-1},{"tensionMod12":9,"tensionMod7":5,"quality":1,"incidental":0},{"tensionMod12":10,"tensionMod7":7,"quality":-2,"incidental":-1},{"tensionMod12":11,"tensionMod7":7,"quality":-1,"incidental":0},{"tensionMod12":12,"tensionMod7":7,"quality":1,"incidental":1}]
}

export {
  classes
}
