export const Accidental = {
  DOUBLEFLAT: "𝄫",
  FLAT: "♭",
  NATURAL: "♮",
  SHARP: "♯",
  DOUBLESHARP: "𝄪",
  offset: function(accidental) {
    return Object.values(this).indexOf(accidental)
  }
}

/**
 * @returns Int The distance from the given `accidental` to `Accidental.Natural`
 */
export function distanceFromNatural(accidental) {
  return Accidental.offset(accidental) - Accidental.offset(Accidental.NATURAL)
}