export const Mode = { // TODO: these should be called modeConstructor to differentiate from modes.
  LYDIAN: 'Lyd',
  MAJOR: 'Maj',
  DOMINANT: 'Dom',
  DORIAN: 'dor',
  MINOR: 'min',
  PHRYGIAN: 'phr',
  LOCRIAN: 'loc',
  LYDIAN_AUGMENTED: 'LA',
  LYDIAN_DOMINANT: "LD",
  MINOR_DOMINANT: "mD",
  MELODIC_MINOR: "Mm",
  PHRYGIAN_DORIAN: "pd",
  DIMINISHED_MINOR: 'dm',
  ALTERED: "Alt",
  DOMINANT_ALTERED: "DA",
  DIMINISHED: 'dim',
  AUGMENTED_DOMINANT: 'AD',
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
        {
          "tensionMod7": 1, // Maps each mod12 note in the array to the grammatically correct mod7 number in the context of this mode.
          "quality": 0, // Indicates the quality of the tensionMod7. 0 is Perfect, 1 is Major, -1 is Minor.
          "incidental": 0 // Indicates if the note is part of the mode (0), or is a departure higher (1) or lower (-1) from the mode. This is used to calculate accidentals.
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": -1
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 0
        }
      ]
    case Mode.MAJOR:
      return [
        {
          "tensionMod7": 1, // Maps each mod12 note in the array to the grammatically correct mod7 number in the context of this mode.
          "quality": 0, // Indicates the quality of the tensionMod7. 0 is Perfect, 1 is Major, -1 is Minor.
          "incidental": 0 // Indicates if the note is part of the mode (0), or is a departure higher (1) or lower (-1) from the mode. This is used to calculate accidentals.
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        // This was originally (5, 1, 1).
        // FIXME: (David) ponder what this should be in perpetuity
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": -1
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 0
        }
      ]
    case Mode.DOMINANT:
      return [
        {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.DORIAN:
      return [
       {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.MINOR:
      return [
       {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.PHRYGIAN:
      return [
       {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.LOCRIAN:
      return []
    case Mode.LYDIAN_AUGMENTED: // Melodic Minor Mode
      return []
    case Mode.LYDIAN_DOMINANT: // Melodic Minor Mode
      return [
        {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": -1
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.MINOR_DOMINANT: // Melodic Minor Mode
      return []
    case Mode.MELODIC_MINOR: // Melodic Minor Mode
      return []
    case Mode.PHRYGIAN_DORIAN: // Melodic Minor Mode
      return []
    case Mode.DIMINISHED_MINOR: // Melodic Minor Mode
      return [
        {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 1
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 6,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
      ]
    case Mode.ALTERED: // Melodic Minor Mode
      return []
    case Mode.DOMINANT_ALTERED: // Whole-Half Diminished
      return []
    case Mode.DIMINISHED: // Half-Whole Diminished
      return [
        {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 1
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": 1
        },
        {
          "tensionMod7": 6,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -2,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 0
        }
      ]
    case Mode.AUGMENTED_DOMINANT: // Whole Tone
      return [
        {
          "tensionMod7": 1,
          "quality": 0,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": -1,
          "incidental": -1
        },
        {
          "tensionMod7": 2,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 2,
          "quality": 2,
          "incidental": 1
        },
        {
          "tensionMod7": 3,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 4,
          "quality": 0,
          "incidental": -1
        },
        {
          "tensionMod7": 4,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 5,
          "quality": 0,
          "incidental": -1
        },
        {
          "tensionMod7": 5,
          "quality": 1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": -2,
          "incidental": -1
        },
        {
          "tensionMod7": 7,
          "quality": -1,
          "incidental": 0
        },
        {
          "tensionMod7": 7,
          "quality": 1,
          "incidental": 1
        }
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
