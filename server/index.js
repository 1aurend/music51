import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import loadQuiz from './tools/atfetch'
const app = express()


require('dotenv').config()


const API_PORT = process.env.API_PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({test: 'hello world'}))
})

app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({message: 'server is running. check terminal logs for data.'}))
  })
app.post('/api/loadquiz', async (req, res) => {
    let qs = await loadQuiz(req.body.numQs)
    res.setHeader('Content-Type', 'application/json')
    res.send(qs)
  })

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
