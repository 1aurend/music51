export const Mode = {
  MAJOR: 'Maj',
  DORIAN: 'dor',
  PHRYGIAN: 'phr',
  LYDIAN: 'Lyd',
  LYDIAN_DOMINANT: "LD",
  DOMINANT: 'Dom',
  MINOR: 'min',
  LOCRIAN: 'loc',
  DIMINISHED: 'dim',
  AUGMENTED_DOMINANT: 'AD',
  DIMINISHED_MINOR: 'dm'
}

export const ModeSubset = {
  MAJOR: {
    MAJOR: 'Maj',
    DORIAN: 'dor',
    PHRYGIAN: 'phr',
    LYDIAN: 'Lyd',
    DOMINANT: 'Dom',
    MINOR: 'min',
    LOCRIAN: 'loc',
  },
  MINOR: {
    MINOR: 'min',
    LOCRIAN: 'loc',
    MAJOR: 'Maj',
    DORIAN: 'dor',
    PHRYGIAN: 'phr',
    LYDIAN: 'Lyd',
    DOMINANT: 'Dom',
  }
}

export function noteIdentities(mode) {
  switch (mode) {
    case Mode.LYDIAN:
      return [
        {"tensionMod7":1,"quality":0,"incidental":0},
        {"tensionMod7":2,"quality":-1,"incidental":-1},
        {"tensionMod7":2,"quality":1,"incidental":0},
        {"tensionMod7":3,"quality":-1,"incidental":-1},
        {"tensionMod7":3,"quality":1,"incidental":0},
        {"tensionMod7":4,"quality":0,"incidental":-1},
        {"tensionMod7":4,"quality":1,"incidental":0},
        {"tensionMod7":5,"quality":0,"incidental":0},
        {"tensionMod7":5,"quality":1,"incidental":1},
        {"tensionMod7":6,"quality":1,"incidental":0},
        {"tensionMod7":7,"quality":-1,"incidental":-1},
        {"tensionMod7":7,"quality":1,"incidental":0}
      ]
    case Mode.LYDIAN_DOMINANT:
      return [
        {"tensionMod7":1,"quality":0,"incidental":0},
        {"tensionMod7":2,"quality":-1,"incidental":-1},
        {"tensionMod7":2,"quality":1,"incidental":0},
        {"tensionMod7":3,"quality":-1,"incidental":-1},
        {"tensionMod7":3,"quality":1,"incidental":0},
        {"tensionMod7":4,"quality":0,"incidental":-1},
        {"tensionMod7":4,"quality":1,"incidental":0},
        {"tensionMod7":5,"quality":0,"incidental":0},
        {"tensionMod7":6,"quality":-1,"incidental":-1},
        {"tensionMod7":6,"quality":1,"incidental":0},
        {"tensionMod7":7,"quality":-1,"incidental":0},
        {"tensionMod7":7,"quality":1,"incidental":1}
      ]
    case Mode.DORIAN:
      return [
       {"tensionMod7":1,"quality":0,"incidental":0},
       {"tensionMod7":2,"quality":-1,"incidental":-1},
       {"tensionMod7":2,"quality":1,"incidental":0},
       {"tensionMod7":3,"quality":-1,"incidental":0},
       {"tensionMod7":3,"quality":1,"incidental":1},
       {"tensionMod7":4,"quality":0,"incidental":0},
       {"tensionMod7":4,"quality":1,"incidental":1},
       {"tensionMod7":5,"quality":0,"incidental":0},
       {"tensionMod7":6,"quality":-1,"incidental":-1},
       {"tensionMod7":6,"quality":1,"incidental":0},
       {"tensionMod7":7,"quality":-1,"incidental":0},
       {"tensionMod7":7,"quality":1,"incidental":1}
      ]
    case Mode.DIMINISHED_MINOR:
      return [
        {"tensionMod7":1,"quality":0,"incidental":0},
        {"tensionMod7":2,"quality":-1,"incidental":-1},
        {"tensionMod7":2,"quality":1,"incidental":0},
        {"tensionMod7":3,"quality":-1,"incidental":0},
        {"tensionMod7":3,"quality":1,"incidental":1},
        {"tensionMod7":4,"quality":0,"incidental":0},
        {"tensionMod7":5,"quality":-1,"incidental":0},
        {"tensionMod7":5,"quality":0,"incidental":1},
        {"tensionMod7":6,"quality":-1,"incidental":0},
        {"tensionMod7":6,"quality":1,"incidental":1},
        {"tensionMod7":7,"quality":-1,"incidental":0},
        {"tensionMod7":7,"quality":1,"incidental":1}
      ]
    case Mode.DIMINISHED:
      return [
        {"tensionMod7":1,"quality":0,"incidental":0},
        {"tensionMod7":2,"quality":-1,"incidental":-1},
        {"tensionMod7":2,"quality":1,"incidental":0},
        {"tensionMod7":3,"quality":-1,"incidental":0},
        {"tensionMod7":3,"quality":1,"incidental":1},
        {"tensionMod7":4,"quality":0,"incidental":0},
        {"tensionMod7":5,"quality":-1,"incidental":0},
        {"tensionMod7":5,"quality":0,"incidental":1},
        {"tensionMod7":6,"quality":-1,"incidental":0},
        {"tensionMod7":7,"quality":-2,"incidental":0},
        {"tensionMod7":7,"quality":-1,"incidental":-1},
        {"tensionMod7":7,"quality":1,"incidental":0}
      ]
    case Mode.AUGMENTED_DOMINANT:
      return [
        {"tensionMod7":1,"quality":0,"incidental":0},
        {"tensionMod7":2,"quality":-1,"incidental":-1},
        {"tensionMod7":2,"quality":1,"incidental":0},
        {"tensionMod7":2,"quality":2,"incidental":1},
        {"tensionMod7":3,"quality":1,"incidental":0},
        {"tensionMod7":4,"quality":0,"incidental":-1},
        {"tensionMod7":4,"quality":1,"incidental":0},
        {"tensionMod7":5,"quality":0,"incidental":-1},
        {"tensionMod7":5,"quality":1,"incidental":0},
        {"tensionMod7":7,"quality":-2,"incidental":-1},
        {"tensionMod7":7,"quality":-1,"incidental":0},
        {"tensionMod7":7,"quality":1,"incidental":1}
      ]
      default:
        throw "Unsupported Mode: " + JSON.stringify(mode)
    }
}

export function degree(mode, modeNote) {
  switch (mode) {
    case Mode.MAJOR:
      return Object.values(ModeSubset.MAJOR).indexOf(modeNote)+1
    case Mode.MINOR:
      return Object.values(ModeSubset.MINOR).indexOf(modeNote)+1
    default:
      throw new Error('invalid key')
  }
}
