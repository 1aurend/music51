
function groupChords(data) {

  console.log('in the groupChords function...');
  console.log(data.length);
  let chords = []

    for (var i = 0; i < data.length; i=i+4) {
      console.log('in the first loop');
      let chord = {
        notes: [],
        octaves: [],
        clef: '',
        questions: [],
      }
      chord.notes = data[i].fields.notes
      chord.octaves = data[i].fields.octaves
      chord.clef = data[i].fields.clef

      for (var j = i; j < i+4; j++) {
        console.log('in the second loop');

        let id = data[i].fields.id.slice(2)
        let question

        if (data[j].fields.id.slice(2) === id) {
          question = {
            type: data[j].fields.type,
            questionText: data[j].fields.questionText,
            answers: data[j].fields.answers,
            ordered: data[j].fields.ordered,
            choices: data[j].fields.choices
          }
          chord.questions.push(question)
        }
      }
      chords.push(chord)
    }

    console.log('new data format: ' + JSON.stringify(chords, null, 4));
    return chords

}

export default groupChords
