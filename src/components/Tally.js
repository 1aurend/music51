import React, { useContext, useEffect, useRef, useState } from 'react'
import { Means } from './Context'
import RoundStats from './Stats'
import ChartData from './ChartData'
import { Container, Row, Col } from 'shards-react'



export default function Tally({ data, round }) {

  console.log(data);
  console.log(round);

  const [means, updateMeans] = useContext(Means)
  const [calculating, done] = useState(true)
  const tally = useRef()
  console.log(JSON.stringify(means));

  let roundMeans = {}
  data[0].questions.map(question => {
    roundMeans = {...roundMeans, [question.type]: {
                        attempts: [],
                        times: [],
                        meanAttempts: null,
                        meanTime: null,
                      }}
    return null
  })


    data.map( chord => {
      chord.questions.map( question => {
          question.answers.map( answer => {
              roundMeans[question.type].attempts.push(answer.tries.length)
              roundMeans[question.type].attempts.push(answer.elapsedTime)
              return null
            })
        return null
      })
      return null
    })


    const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    function rounded(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    let qTypes = Object.keys(roundMeans)
    let timesToAverage = []
    let attemptsToAverage = []
    qTypes.map( type => {
      roundMeans[type].meanAttempts = rounded(mean(roundMeans[type].attempts),2)
      attemptsToAverage.push(roundMeans[type])
      roundMeans[type].meanTime = rounded(mean(roundMeans[type].times),2)
      timesToAverage.push(roundMeans[type])
    })
    let averageAttempts = rounded(mean(attemptsToAverage),2)
    let averageTime = rounded(mean(timesToAverage),2)



    useEffect(() => {

        qTypes.map( type => {
          tally.current = {...tally.current,
            [type]: {
              attempts: [...means[type].attempts, [type].meanAttempts],
              times: [...means[type].times, [type].meanTime]
            }}
            return null
        })

        if (round === 1) {
          tally.current = {...tally.current,
              average: {
                attempts: [averageAttempts],
                times: [averageTime]
              }
          }
        }
        else {
          tally.current = {...tally.current,
              average: {
                attempts: [...means.average.attempts, averageAttempts],
                times: [...means.average.times, averageTime]
              }
          }
        }

        updateMeans(tally.current)
        done(false)
        console.log('this is the current tally of averages:' + JSON.stringify(tally));
    }, [])


  if (!calculating && round === 1) {
    return <RoundStats round={round}/>
  }
  else if (!calculating) {
    return <ChartData round={round} data={tally.current}/>
  }
  else {
    return (
      <Container fluid className="main-content-container px-4" id='container'style={{backgroundColor: 'black', minHeight: '120vh'}}>
        <Row style={{paddingTop: '25%', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}></Row>
        <Col sm='12' lg='12'>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
              <h2 style={{color: '#17c671', fontFamily: "'Press Start 2P', cursive"}}>Calculating your progress...</h2>
          </Row>
        </Col>
    </Container>
    )
  }
}
