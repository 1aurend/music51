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
  // console.log("here is roundMeans: " + JSON.stringify(roundMeans, null, 3));


    data.map( chord => {
      chord.questions.map( question => {
          question.answers.map( answer => {
              roundMeans[question.type].attempts.push(answer.tries.length)
              roundMeans[question.type].times.push(answer.elapsedTime)
              return null
            })
        return null
      })
      return null
    })
    // console.log("here is roundMeans after first map: " + JSON.stringify(roundMeans, null, 3));


    const mean = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    function rounded(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    let qTypes = Object.keys(roundMeans)
    let timesToAverage = []
    let attemptsToAverage = []
    qTypes.map( type => {
      roundMeans[type].meanAttempts = rounded(mean(roundMeans[type].attempts),2)
      attemptsToAverage.push(roundMeans[type].meanAttempts)
      roundMeans[type].meanTime = rounded(mean(roundMeans[type].times),2)
      timesToAverage.push(roundMeans[type].meanTime)
      return null
    })
    let averageAttempts = rounded(mean(attemptsToAverage),2)
    let averageTime = rounded(mean(timesToAverage),2)
    // console.log("here is roundMeans after second map: " + JSON.stringify(roundMeans, null, 3));
    // console.log('averageAttempts: ' + averageAttempts);
    // console.log('averageTime: ' + averageTime);



    useEffect(() => {

        qTypes.map( type => {
          tally.current = {...tally.current,
            [type]: {
              attempts: [...means[type].attempts, roundMeans[type].meanAttempts],
              times: [...means[type].times, roundMeans[type].meanTime]
            }}
            return null
        })
        // console.log('here is tally after map: ' + JSON.stringify(tally.current, null, 3));

        if (round === 1) {
          tally.current = {...tally.current,
              Overall: {
                attempts: [averageAttempts],
                times: [averageTime]
              }
          }
        }
        else {
          tally.current = {...tally.current,
              Overall: {
                attempts: [...means.Overall.attempts, averageAttempts],
                times: [...means.Overall.times, averageTime]
              }
          }
        }

        updateMeans(tally.current)
        done(false)
        console.log('this is the current tally of averages:' + JSON.stringify(tally.current));
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
          <Row style={{display: 'flex', justifyContent: 'center', marginLeft: '50%', marginRight: '50%'}} noGutters>
              <h2 style={{color: '#17c671', fontFamily: "'Press Start 2P', cursive"}}>Calculating your stats...</h2>
          </Row>
        </Col>
    </Container>
    )
  }
}
