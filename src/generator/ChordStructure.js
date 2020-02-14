import { Mode } from "./Mode"
import { IndependentPitch } from "./IP"
import { ChordType } from "./ChordType"

export const ChordStructure = {
  MAJOR: {
    displayName: "M",
    modeConstructor: Mode.MAJOR, // TODO: David to define all modeConstructors in mode.js
    possibleModeEnvironments: ["Major", "minor"], // FIXME: It would feel safer to derive possibleModeEnvironments based on array lengths >0 in commonRootOffsets.
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [0, 5, 7], // I, IV, or V
      minor: [3, 7, 8, 10] // III, V, VI, or VII
    }
  },
  MINOR: {
    displayName: "m",
    modeConstructor: Mode.MINOR,
    possibleModeEnvironments: ["Major", "minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.SO
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [2, 4, 9], // ii, iii, or vi
      minor: [0, 2, 5] // i, ii, or iv
    }
  },
  DIMINISHED: {
    displayName: "o",
    modeConstructor: Mode.DIMINISHED,
    possibleModeEnvironments: ["Major", "minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [11], // viio
      minor: [2, 10] // iio or viio
    }
  },
  AUGMENTED: {
    displayName: "+",
    modeConstructor: Mode.AUGMENTED_DOMINANT,
    possibleModeEnvironments: ["minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.PE
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [], // none defined.
      minor: [3] // III+
    }
  },
  DOMINANT_SEVENTH: {
    displayName: "7",
    modeConstructor: Mode.DOMINANT,
    possibleModeEnvironments: ["Major", "minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO,
      IndependentPitch.KE
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [7], // V7
      minor: [7] // V7
    }
  },
  MAJOR_SEVENTH: {
    displayName: "M7",
    modeConstructor: Mode.LYDIAN,
    possibleModeEnvironments: ["Major"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.MI,
      IndependentPitch.SO,
      IndependentPitch.TI
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [0, 5], // IMaj7 or IVMaj7
      minor: [] // none defined.
    }
  },
  MINOR_SEVENTH: {
    displayName: "m7",
    modeConstructor: Mode.DORIAN,
    possibleModeEnvironments: ["Major", "minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.SO,
      IndependentPitch.KE
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [2, 4, 9], // ii7, iii7, or vi7
      minor: [0, 5] // i7 or iv7
    }
  },
  HALF_DIMINISHED_SEVENTH: {
    displayName: "ø7",
    modeConstructor: Mode.DIMINISHED_MINOR,
    possibleModeEnvironments: ["Major", "minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE,
      IndependentPitch.KE
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [11], // viiø7
      minor: [2, 10] // iiø7 or viiø7
    }
  },
  FULLY_DIMINISHED_SEVENTH: {
    displayName: "o7",
    modeConstructor: Mode.DIMINISHED,
    possibleModeEnvironments: ["minor"],
    structure: [
      IndependentPitch.DO,
      IndependentPitch.NA,
      IndependentPitch.VE,
      IndependentPitch.LA
    ],
    possibleRootOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    commonRootOffsets: {
      Major: [], // none defined.
      minor: [10] // viio7
    }
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
