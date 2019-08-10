
let pagegrid = {
  display: 'grid',
  gridTemplateColumns: '200px auto 200px',
  gridTemplateRows: '100px auto 200px 100px',
  height: '100%',
  width: '100%',
}

let question = {
  gridColumn: 2,
  gridRow: 2,
  border: '5px solid black',
  margin: '50px',
}

let questionh2 = {
  marginTop: 'auto',
  textAlign: 'center',
  paddingTop: '200px',
}

let questionh3 = {
  marginTop: 'auto',
  textAlign: 'center',
  paddingTop: '50px',
}

let questiontext ={
  textAlign: 'center',
  paddingTop: '10px'
}

let choices = {
  gridColumn: 2,
  gridRow: 3,
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  width: 'inherit',
  height: 'inherit',
}

let choicebutton = {
  border: '5px solid black',
  borderRadius: '5%',
  cursor: 'pointer'
}

let results = {
  gridColumn: 2,
  gridRow: 3,
  margin: 'auto',
  textAlign: 'center',
}

let startinputs = {
  gridColumn: 2,
  gridRow: 3,
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  width: 'inherit',
  height: 'inherit',
}

let selector = {
  gridColumn: 3,
  margin: 'auto',
}

let select = {
  height: '3rem',
  fontSize: '20px',
}

let go = {
  gridColumn: 3,
  margin: 'auto',
  display: 'block',
  cursor: 'pointer',
  backgroundColor: 'none',
}

let sidebar = {
  gridColumn: 2,
  gridRow: 2,
  textAlign: 'right',
  paddingRight: '50px'
}

let sidebarh4 = {
  marginBottom: '5px',
  marginTop: '5px',
  color: 'chartreuse',
}

export {
  question,
  pagegrid,
  questionh2,
  questionh3,
  choices,
  choicebutton,
  results,
  startinputs,
  selector,
  select,
  go,
  questiontext,
  sidebar,
  sidebarh4
}
