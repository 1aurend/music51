export const Accidental = {
  DOUBLEFLAT: "𝄫",
  FLAT: "♭",
  NATURAL: "♮",
  SHARP: "♯",
  DOUBLESHARP: "𝄪",
  offset: function(accidental) {
    return Object.values(this).indexOf(accidental)
  },
  offsetFromNatural: function(accidental) {
    return this.offset(accidental) - this.offset(this.NATURAL)
  }
}
