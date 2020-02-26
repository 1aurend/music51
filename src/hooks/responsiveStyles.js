const fontHeading = "'Fipps Regular', monospace"
const fontBody = "'Thintel', monospace"

const makeBreakpoints = function ({fontFamily, textAlign, baseSize, letterSpacing, lineHeight, textTransform, multiplier}) {
  const largeFactor = 1.15
  const mediumFactor = 1.1
  const multiply = multiplier ? 2 : 1
  let result = {LARGE:{}, MEDIUM:{}, SMALL:{}}
  result.LARGE = {
    fontFamily:fontFamily,
    textAlign:textAlign,
    fontSize:String(baseSize*largeFactor*multiply).concat('px'),
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

const sidebarLayout = {gridTemplateAreas: '"B A A" "C A A"'}
const stackedLayout = {gridTemplateAreas: '"B B B" "A A A" "C C C"'}

export const h1 = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:26,letterSpacing:3, textTransform:'uppercase'})
export const h2 = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:18,letterSpacing:1, textTransform:'lowercase'})
export const h3 = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:36,letterSpacing:2,lineHeight:1, textTransform:'uppercase'})
export const h4 = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:28,letterSpacing:1, lineHeight:1, textTransform:'lowercase'})
export const h5 = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:32,letterSpacing:1, lineHeight:1, multiplier:true})
export const para = makeBreakpoints({fontFamily:fontBody, textAlign:'center',baseSize:24,letterSpacing:1, lineHeight:1,textTransform:'none'})
export const questionText = makeBreakpoints({fontFamily:fontHeading, textAlign:'center',baseSize:20,textTransform:'none'})

export const mode = {
  LARGE: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'},
  SMALL: {fontFamily: fontHeading, textAlign: 'center', fontSize: '1.5em'}
}

export const input = {
  LARGE: {fontFamily: fontBody, maxWidth:'100px', minWidth: '80px', textAlign:'center', fontSize:28},
  MEDIUM: {fontFamily: fontBody, maxWidth:'100px',  minWidth: '80px', textAlign:'center', fontSize:28},
  SMALL: {fontFamily: fontBody, maxWidth:'100px',  minWidth: '80px', textAlign:'center', fontSize:28}
}

export const answerText = {
  LARGE: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28},
  MEDIUM: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28},
  SMALL: {fontFamily: fontBody, maxWidth:'100px', textAlign:'center', fontSize:28}
}

export const layoutInfo ={
  LARGE: sidebarLayout,
  MEDIUM: sidebarLayout,
  SMALL: stackedLayout
}

export const layoutQuiz ={
  LARGE: stackedLayout,
  MEDIUM: stackedLayout,
  SMALL: stackedLayout
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
    svgWidth: '250px',
    svgHeight: '125px',
    viewBoxWidth: 250,
    viewBoxHeight: 125,
  }
}

export const tableSize = {
  LARGE: 901,
  SMALL: 899
}

export const answerChoiceSize = {
  LARGE: '100px',
  MEDIUM: '90px',
  SMALL: '80px'
}


export const loadingMargin = {
  LARGE: '5%',
  SMALL: '25%'
}
