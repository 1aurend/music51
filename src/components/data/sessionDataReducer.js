import { tallyMeans } from './tallyMeans'


export default function sessionDataReducer(sessionData, action) {
  switch (action.type) {
    case 'tally':
      return {...sessionData, means: tallyMeans(sessionData.means, action.data)}
    case 'settings':
      return {...sessionData, settings: action.data}
    case 'round':
      return {...sessionData, rounds: {...sessionData.rounds, [action.round]: action.data}}
    case 'db':
      console.log("here's where we'll send session data to the db")
      break
    default:
      alert('invalid action')
  }
}
