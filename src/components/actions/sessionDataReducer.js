import { tallyMeans } from './Tally'
import { getChartData } from './ChartData'

export default function sessionDataReducer(state, action) {
  console.log('in reducer');
  switch (action.type) {
    case 'tally':
      console.log('performing action type tally')
      console.log(state);
      return tallyMeans(state, action.data)
    case 'chart':
      console.log('performing action type chart');
      return getChartData(state.tally, state.questionTypes, action.round)
    case 'settings':
      console.log('performing action type settings');
      return {...state, settings: action.data}
    case 'round':
      return {...state, [action.round]: action.data}
    default:
      alert('invalid action')
  }
}
