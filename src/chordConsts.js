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

const ip = ["R","N","M","F","V","S","P","L","K","T","D","B"];

// subsets are saturated contexts (subsets of 12 IPs). they're only used to define which context gets mapped to letter positions. in standard theory, this is always "B".
const subsets = {
 "T": ["P","K","T","B","N","F","V"],
 "B": ["R","M","F","S","L","T","D"]
}

const keySignatures = {
  "R7":{"vexSig":"Cb","notes":[{"refIP":"F","accidental":"b","mode":"Lyd"},{"refIP":"D","accidental":"b","mode":"Maj"},{"refIP":"S","accidental":"b","mode":"Dom"},{"refIP":"R","accidental":"b","mode":"dor"},{"refIP":"L","accidental":"b","mode":"min"},{"refIP":"M","accidental":"b","mode":"phr"},{"refIP":"T","accidental":"b","mode":"loc"}]},

  "R6":{"vexSig":"Gb","notes":[{"refIP":"D","accidental":"b","mode":"Lyd"},{"refIP":"S","accidental":"b","mode":"Maj"},{"refIP":"R","accidental":"b","mode":"Dom"},{"refIP":"L","accidental":"b","mode":"dor"},{"refIP":"M","accidental":"b","mode":"min"},{"refIP":"T","accidental":"b","mode":"phr"},{"refIP":"F","accidental":"n","mode":"loc"}]},

  "R5":{"vexSig":"Db","notes":[{"refIP":"S","accidental":"b","mode":"Lyd"},{"refIP":"R","accidental":"b","mode":"Maj"},{"refIP":"L","accidental":"b","mode":"Dom"},{"refIP":"M","accidental":"b","mode":"dor"},{"refIP":"T","accidental":"b","mode":"min"},{"refIP":"F","accidental":"n","mode":"phr"},{"refIP":"D","accidental":"n","mode":"loc"}]},

  "R4":{"vexSig":"Ab","notes":[{"refIP":"R","accidental":"b","mode":"Lyd"},{"refIP":"L","accidental":"b","mode":"Maj"},{"refIP":"M","accidental":"b","mode":"Dom"},{"refIP":"T","accidental":"b","mode":"dor"},{"refIP":"F","accidental":"n","mode":"min"},{"refIP":"D","accidental":"n","mode":"phr"},{"refIP":"S","accidental":"n","mode":"loc"}]},

  "R3":{"vexSig":"Eb","notes":[{"refIP":"L","accidental":"b","mode":"Lyd"},{"refIP":"M","accidental":"b","mode":"Maj"},{"refIP":"T","accidental":"b","mode":"Dom"},{"refIP":"F","accidental":"n","mode":"dor"},{"refIP":"D","accidental":"n","mode":"min"},{"refIP":"S","accidental":"n","mode":"phr"},{"refIP":"R","accidental":"n","mode":"loc"}]},

  "R2":{"vexSig":"Bb","notes":[{"refIP":"M","accidental":"b","mode":"Lyd"},{"refIP":"T","accidental":"b","mode":"Maj"},{"refIP":"F","accidental":"n","mode":"Dom"},{"refIP":"D","accidental":"n","mode":"dor"},{"refIP":"S","accidental":"n","mode":"min"},{"refIP":"R","accidental":"n","mode":"phr"},{"refIP":"L","accidental":"n","mode":"loc"}]},

  "R1":{"vexSig":"F","notes":[{"refIP":"T","accidental":"b","mode":"Lyd"},{"refIP":"F","accidental":"n","mode":"Maj"},{"refIP":"D","accidental":"n","mode":"Dom"},{"refIP":"S","accidental":"n","mode":"dor"},{"refIP":"R","accidental":"n","mode":"min"},{"refIP":"L","accidental":"n","mode":"phr"},{"refIP":"M","accidental":"n","mode":"loc"}]},

  "B":{"vexSig":"C","notes":[{"refIP":"F","accidental":"n","mode":"Lyd"},{"refIP":"D","accidental":"n","mode":"Maj"},{"refIP":"S","accidental":"n","mode":"Dom"},{"refIP":"R","accidental":"n","mode":"dor"},{"refIP":"L","accidental":"n","mode":"min"},{"refIP":"M","accidental":"n","mode":"phr"},{"refIP":"T","accidental":"n","mode":"loc"}]},

  "L1":{"vexSig":"G","notes":[{"refIP":"D","accidental":"n","mode":"Lyd"},{"refIP":"S","accidental":"n","mode":"Maj"},{"refIP":"R","accidental":"n","mode":"Dom"},{"refIP":"L","accidental":"n","mode":"dor"},{"refIP":"M","accidental":"n","mode":"min"},{"refIP":"T","accidental":"n","mode":"phr"},{"refIP":"F","accidental":"#","mode":"loc"}]},

  "L2":{"vexSig":"D","notes":[{"refIP":"S","accidental":"n","mode":"Lyd"},{"refIP":"R","accidental":"n","mode":"Maj"},{"refIP":"L","accidental":"n","mode":"Dom"},{"refIP":"M","accidental":"n","mode":"dor"},{"refIP":"T","accidental":"n","mode":"min"},{"refIP":"F","accidental":"#","mode":"phr"},{"refIP":"D","accidental":"#","mode":"loc"}]},

  "L3":{"vexSig":"A","notes":[{"refIP":"R","accidental":"n","mode":"Lyd"},{"refIP":"L","accidental":"n","mode":"Maj"},{"refIP":"M","accidental":"n","mode":"Dom"},{"refIP":"T","accidental":"n","mode":"dor"},{"refIP":"F","accidental":"#","mode":"min"},{"refIP":"D","accidental":"#","mode":"phr"},{"refIP":"S","accidental":"#","mode":"loc"}]},

  "L4":{"vexSig":"E","notes":[{"refIP":"L","accidental":"n","mode":"Lyd"},{"refIP":"M","accidental":"n","mode":"Maj"},{"refIP":"T","accidental":"n","mode":"Dom"},{"refIP":"F","accidental":"#","mode":"dor"},{"refIP":"D","accidental":"#","mode":"min"},{"refIP":"S","accidental":"#","mode":"phr"},{"refIP":"R","accidental":"#","mode":"loc"}]},

  "L5":{"vexSig":"B","notes":[{"refIP":"M","accidental":"n","mode":"Lyd"},{"refIP":"T","accidental":"n","mode":"Maj"},{"refIP":"F","accidental":"#","mode":"Dom"},{"refIP":"D","accidental":"#","mode":"dor"},{"refIP":"S","accidental":"#","mode":"min"},{"refIP":"R","accidental":"#","mode":"phr"},{"refIP":"L","accidental":"#","mode":"loc"}]},

  "L6":{"vexSig":"F#","notes":[{"refIP":"T","accidental":"n","mode":"Lyd"},{"refIP":"F","accidental":"#","mode":"Maj"},{"refIP":"D","accidental":"#","mode":"Dom"},{"refIP":"S","accidental":"#","mode":"dor"},{"refIP":"R","accidental":"#","mode":"min"},{"refIP":"L","accidental":"#","mode":"phr"},{"refIP":"M","accidental":"#","mode":"loc"}]},

  "L7":{"vexSig":"C#","notes":[{"refIP":"F","accidental":"#","mode":"Lyd"},{"refIP":"D","accidental":"#","mode":"Maj"},{"refIP":"S","accidental":"#","mode":"Dom"},{"refIP":"R","accidental":"#","mode":"dor"},{"refIP":"L","accidental":"#","mode":"min"},{"refIP":"M","accidental":"#","mode":"phr"},{"refIP":"T","accidental":"#","mode":"loc"}]}
}

const letters = ["D","E","F","G","A","B","C"];
const octaveOrientedLetters = ['C','D','E','F','G','A','B'];

const rootAccidentals = ["b", "n", "#"];
const accidentals = ["bb", "b", "n", "#", "##"];

const clefs = ["bass","treble"];

const triadInversions = ["root","63","64"];
const seventhInversions = ["7","65","43","42"];

export {
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
}
