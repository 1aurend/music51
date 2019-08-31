import React, { useState, useEffect } from 'react'
import Start from './Start.js'
import axios from 'axios'


function QuizContainer(props) {

  let [quizData, updateData] = useState(null)

  useEffect(() => {

    console.log('here');

    const config = {
        method: 'post',
        url:'/api/loadquiz',
        data: {numQs: 16},
        type: 'application/json',
    }

    async function loadData() {
      try {
        const result = await axios(config)
        console.log(JSON.stringify(result, null, 4));
        updateData(result.data)
      } catch (err) {
        console.log('error fetching quiz data');
      }
    }

    loadData()

  }, [])

  if (!quizData) {
    return <div style={{height: '100vh', backgroundColor: 'black'}}><h2>Loading...</h2></div>
  }
  else {
    console.log(quizData);
    return (
      <Start data={quizData} progress={null} />
    )
  }

  }


export default QuizContainer
