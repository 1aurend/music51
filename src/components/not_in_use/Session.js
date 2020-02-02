import React, { useContext, useEffect, useState } from 'react'
import Context, { Means } from '../Context'
import { rounded } from '../utility'
import ResultsTable from '../views/ResultsTable'
import Loading from '../views/Loading'


export default function Session({ round, qTypes }) {
  const [reset, startOver] = useState(false)

  if (reset) {
    return <Context />
  } else {
    return <ResultsTable startOver={startOver} qTypes={qTypes} round={round}/>
  }
}
