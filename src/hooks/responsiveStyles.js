
const fontHeading = "'Fipps Regular', monospace"
const fontBody = "'Thintel', monospace"

const makeBreakpoints = function ({fontFamily, textAlign, baseSize, letterSpacing, lineHeight, textTransform}) {
  const largeFactor = 1.15
  const mediumFactor = 1.1
  let result = {LARGE:{}, MEDIUM:{}, SMALL:{}}
  result.LARGE = {
    fontFamily:fontFamily,
    textAlign:textAlign,
    fontSize:String(baseSize*largeFactor).concat('px'),
    letterSpacing:letterSpacing*largeFactor,
    lineHeight:lineHeight*largeFactor,
    textTransform:textTransform
  }
  result.MEDIUM = {
    fontFamily:fontFamily,
    textAlign:textAlign,
    fontSize:String(baseSize*mediumFactor).concat('px'),
    letterSpacing:letterSpacing*mediumFactor,
    lineHeight:lineHeight*mediumFactor,
    textTransform:textTransform  }
  result.SMALL = {
    fontFamily:fontFamily,
    textAlign:textAlign,
    fontSize:String(baseSize).concat('px'),
    letterSpacing:letterSpacing,
    lineHeight:lineHeight,
    textTransform:textTransform  }
  return result
}

export const h1 = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:26,letterSpacing:3, textTransform:'uppercase'})
export const h2 = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:18,letterSpacing:1, textTransform:'lowercase'})
export const h3 = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:36,letterSpacing:2,lineHeight:1, textTransform:'uppercase'})
export const h4 = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:28,letterSpacing:1, lineHeight:1, textTransform:'lowercase'})
export const para = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:24,letterSpacing:1, lineHeight:1,textTransform:'none'})
export const questionText = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:20,textTransform:'none'})

export const mode = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'}
}

export const input = {
  LARGE: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28},
  MEDIUM: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28},
  SMALL: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28}
}

export const rowOrCol = {
  LARGE: {flexFlow: 'row'},
  MEDIUM: {flexFlow: 'row'},
  SMALL: {flexFlow: 'column'}
}

export const gridMarquee = {
  // rowstart/colstart/rowend/colend
  LARGE: {gridArea:'2/2/2/3'},
  MEDIUM: {gridArea:'2/2/2/3'},
  SMALL: {gridArea:'2/2/2/5'}
}

export const gridMain = {
  LARGE: {gridArea:'2/3/5/5'},
  MEDIUM: {gridArea:'2/3/5/5'},
  SMALL: {gridArea:'3/2/3/5'}
}

export const gridMisc = {
  LARGE: {gridArea:'3/2/3/3'},
  MEDIUM: {gridArea:'3/2/3/3'},
  SMALL: {gridArea:'4/2/4/5'}
}

export const progressTitle = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2.5em', lineHeight: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2em', lineHeight: '1.25em'}
}

export const progressSubtitle = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1em'}
}

export const sessionTitle = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2.5em', lineHeight: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2em', lineHeight: '1.25em'}
}

export const statsTitle = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2.5em', lineHeight: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '2em', lineHeight: '1.25em'}
}

export const statsSubtitle = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.25em', lineHeight: '1.25em'}
}


export const staveSize = {
  LARGE: {
    svgWidth: '500px',
    svgHeight: '250px',
    viewBoxWidth: 250,
    viewBoxHeight: 125,
  },
  MEDIUM: {
    svgWidth: '400px',
    svgHeight: '200px',
    viewBoxWidth: 250,
    viewBoxHeight: 125,
  },
  SMALL: {
    svgWidth: '300px',
    svgHeight: '150px',
    viewBoxWidth: 250,
    viewBoxHeight: 125,
  }
}

export const tableSize = {
  LARGE: 901,
  SMALL: 899
}

export const loadingMargin = {
  LARGE: '5%',
  SMALL: '25%'
}
