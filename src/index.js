import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import DevResultsTable from './components/views/layouts/DevResultsTable'
// import * as serviceWorker from './serviceWorker'

// ReactDOM.render(<Router />, document.getElementById('root'))
ReactDOM.render(<DevResultsTable round={3} startOver={() => alert('start over clicked')} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
