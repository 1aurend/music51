// Independent pitch name. Extension of the traditional _solfege_ language which includes
// non-contextualized names for the pitches in between the traditional instances.
//
// The traditional solfege syllables are contained here:
//
//    [`Re`, `Mi`, `Fa`, `So`, `La`, `Ti`, `Do`]
//
// In between these are:
//
//    [`Na`, `Ve`, `Pe`, `Ke`, `Ba`]
//
export const IndependentPitch = {
  RE: "R",
  NA: "N",
  MI: "M",
  FA: "F",
  VE: "V",
  SO: "S",
  PE: "P",
  LA: "L",
  KE: "K",
  TI: "T",
  DO: "D",
  BA: "B"
}

// Independent Pitch Subsets are potential pools of pitches (represented by `Independent Pitch` values)
// which sound good together. They act as an interface between the notion of "sounding good" and
// conventional music contexts.
export const IndependentPitchSubset = {
  // The "top" set of independent pitches.
  TOP: {
    NA: IndependentPitch.NA,
    FA: IndependentPitch.FA,
    VE: IndependentPitch.VE,
    PE: IndependentPitch.PE,
    KE: IndependentPitch.KE,
    TI: IndependentPitch.TI,
    BA: IndependentPitch.BA,
  },
  // The "bottom" set of independent pitches.
  BOTTOM: {
    RE: IndependentPitch.RE,
    MI: IndependentPitch.MI,
    FA: IndependentPitch.FA,
    SO: IndependentPitch.SO,
    LA: IndependentPitch.LA,
    TI: IndependentPitch.TI,
    DO: IndependentPitch.DO,
  }
}
