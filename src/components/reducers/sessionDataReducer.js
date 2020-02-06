import { tallyMeans } from './Tally'


export default function sessionDataReducer(state, action) {
  console.log('in reducer');
  switch (action.type) {
    case 'tally':
      console.log('performing action type tally')
      return tallyMeans(state, action.data)
    case 'settings':
      console.log('performing action type settings');
      return {...state, settings: action.data}
    case 'round':
      return {...state, [action.round]: action.data}
    default:
      alert('invalid action')
  }
}
