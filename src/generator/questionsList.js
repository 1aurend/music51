// NOTE: this is ld's prototyping version of this. check for errors before merging into anything real!

export const questionsList = {
  LETTER_NAMES: {
    fullName: 'Letter Names',
    fullText: 'Name the letter positions from lowest to highest.',
    shortName: 'Notes',
    abbrev: 'LP',
    chartColor: '#0F4C81'
  },
  ROOT: {
    fullName: 'Root Note',
    fullText: 'What\'s the root note?',
    shortName: 'Root', // shortName is for the stats display, so it's describing all ROOT questions in the round. So should shortName be plural, even if the question name is singular (all the Roots you've defined this round)? A question like LETTER_POSITIONS is plural because the question itself asks for multiple letter positions. Or should they match-- "Role" describes all the Roles you have defined in all the ROLE questions. For now, leaving singular/pural to match the question name.
    abbrev: 'RN',
    chartColor: '#7979E8'
  },
  DEGREE: {
    fullName: 'Degree',
    fullText: 'In a key, what degree is this chord built on?', // key == 'Major' or 'minor'
    shortName: 'Degree',
    abbrev: 'Deg',
    chartColor: '#39D4D2'
  },
    ROLE: {
    fullName: 'Role',
    fullText: 'What is this chord\'s relationship to the key?',
    shortName: 'Role', // Grouping? Category?
    abbrev: 'R', // Cat? Grp? RRG.
    chartColor: '#FFFFFF'
  },
    NUMERAL: {
    fullName: 'Numeral',
    fullText: 'Which roman numeral describes this chord\'s degree and quality?',
    shortName: 'Numeral',
    abbrev: 'Num',
    chartColor: '#B53F04'

  },
    QUALITY: {
    fullName: '',
    fullText: 'What type of grouping is it?', // grouping == 'SEVENTH', 'CHROMATIC_VARIATION' etc.
    shortName: 'Chord',
    abbrev: 'Qlt',
    chartColor: '#082742'
  },
    INVERSION: {
    fullName: 'Inversion',
    fullText: 'What\'s the inversion?',
    shortName: 'Inversion',
    abbrev: 'Inv',
    chartColor: '#FA7268'
  },
    FOLLOWED_BY: {
    fullName: 'Followed By',
    fullText: 'Which chord is most likely to follow this chord?',
    shortName: 'Follow',
    abbrev: 'Fol', // This one isn't great
    chartColor: '#4082C7'
  }
}
