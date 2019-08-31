import Airtable from 'airtable'
import groupChords from './groupchords.js'
import fs from 'fs'

require('dotenv').config()



async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}


export default async function loadQuiz() {

  const ldBase = new Airtable({apiKey: process.env.LD_AT_KEY}).base(process.env.LD_BASE_ID)

    let data = []

    console.log(`Fetching Quiz Data -----------------------`);


    const Qs = await ldBase('mtQuestions').select({
          maxRecords: 16,
          view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {

          asyncForEach(records, (record) => {
              console.log('Retrieved', record.get('questionText'));
              data.push(record._rawJson)
          }).then(() => fetchNextPage())

      }).then(() => {return 'got Qs!'})


    const chords = groupChords(data)
    console.log(chords)
    fs.writeFileSync('./chords.json', JSON.stringify(chords, null, 4))
    return chords

    }
