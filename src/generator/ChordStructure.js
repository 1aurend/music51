import { Mode } from "./Mode"
import { IndependentPitch } from "./IP"
import { ChordType } from "./ChordType"

export const ChordStructure = {
  MAJOR: {
    displayName: "M",
    mode: Mode.LYDIAN_DOMINANT,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO
    ]
  },
  MINOR: {
    displayName: "m",
    mode: Mode.DORIAN,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.SO
    ]
  },
  DIMINISHED: {
    displayName: "o",
    mode: Mode.DIMINISHED,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE
    ]
  },
  AUGMENTED: {
    displayName: "+",
    mode: Mode.AUGMENTED_DOMINANT,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.PE
    ]
  },
  DOMINANT_SEVENTH: {
    displayName: "7",
    mode: Mode.LYDIAN_DOMINANT,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO,
      IndependentPitch.KE
    ]
  },
  MAJOR_SEVENTH: {
    displayName: "M7",
    mode: Mode.LYDIAN,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO,
      IndependentPitch.TI
    ]
  },
  MINOR_SEVENTH: {
    displayName: "m7",
    mode: Mode.DORIAN,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.SO,
      IndependentPitch.KE
    ]
  },
  HALF_DIMINISHED_SEVENTH: {
    displayName: "ø7",
    mode: Mode.DIMINISHED_MINOR,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE,
      IndependentPitch.KE
    ]
  },
  FULLY_DIMINISHED_SEVENTH: {
    displayName: "o7",
    mode: Mode.DIMINISHED,
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE,
      IndependentPitch.LA
    ]
  }
}

// returns one example instantiation of the given `chordType` which we will generate in a 
// concrete form downstream.
export function chordStructures(chordType) {
  switch (chordType) {
    case ChordType.TRIAD:
      return new Set([
        ChordStructure.MAJOR,
        ChordStructure.MINOR,
        ChordStructure.AUGMENTED,
        ChordStructure.DIMINISHED
      ])
    case ChordType.SEVENTH:
      return new Set([
        ChordStructure.DOMINANT_SEVENTH,
        ChordStructure.MAJOR_SEVENTH,
        ChordStructure.MINOR_SEVENTH,
        ChordStructure.HALF_DIMINISHED_SEVENTH,
        ChordStructure.FULLY_DIMINISHED_SEVENTH
      ])
    default:
      throw "Unsupported chordType"
  }
}
