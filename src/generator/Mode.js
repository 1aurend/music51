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

export function degree(key, modeNote) {
  let order
  switch (key) {
    case ModeSubset.MAJOR:
      order = Object.keys(ModeSubset.MAJOR)
      console.log(order);
      return order.indexOf(modeNote)+1
    case ModeSubset.MINOR:
      order = Object.keys(ModeSubset.MINOR)
      console.log(order);
      return order.indexOf(modeNote)+1
    default:
      throw 'invalid key'
  }
}
