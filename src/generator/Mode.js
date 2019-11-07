export const Mode = {
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
    case Mode.MAJOR:
      order = Object.keys(Mode.MAJOR)
      console.log(order);
      return order.indexOf(modeNote)+1
    case Mode.MINOR:
      order = Object.keys(Mode.MINOR)
      console.log(order);
      return order.indexOf(modeNote)+1
    default:
      throw 'invalid key'
  }
}
