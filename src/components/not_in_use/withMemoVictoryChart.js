import React from 'react'
import { VictoryChart } from 'victory'

function areEqual() {
  return true
}

export default React.memo(VictoryChart, areEqual)
