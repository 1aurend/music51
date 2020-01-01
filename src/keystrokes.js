import chalk from 'chalk'

function addKeystrokes(chords) {


  let questionTypes = {
    NAMES: `Names`,
    ROOT: `Roots`,
    DEGREE: `Degrees`,
    QUALITY: `Quality`,
    NUMERAL: `Numerals`,
    INVERSION: `Inversions`
  }


  for (var i = 0; i < chords.length; i++) {
    let questions = chords[i].questions

    for (var j = 0; j < questions.length; j++) {
      let choicesWithKeys = []

      for (var k = 0; k < questions[j].choices.length; k++) {
        let withKeystroke

            switch(questions[j].type) {

              case questionTypes.NAMES:
              case questionTypes.ROOT:
                  switch (questions[j].choices[k]) {
                    case 'A':
                    case "A♮":
                    case "A♭":
                    case "A𝄫":
                    case "A♯":
                    case "A𝄪":
                    case 'B':
                    case "B♮":
                    case "B♭":
                    case "B𝄫":
                    case "B♯":
                    case "B𝄪":
                    case 'C':
                    case "C♮":
                    case "C♭":
                    case "C𝄫":
                    case "C♯":
                    case "C𝄪":
                    case 'D':
                    case "D♮":
                    case "D♭":
                    case "D𝄫":
                    case "D♯":
                    case "D𝄪":
                    case 'E':
                    case "E♮":
                    case "E♭":
                    case "E𝄫":
                    case "E♯":
                    case "E𝄪":
                    case 'F':
                    case "F♮":
                    case "F♭":
                    case "F𝄫":
                    case "F♯":
                    case "F𝄪":
                    case 'G':
                    case "G♮":
                    case "G♭":
                    case "G𝄫":
                    case "G♯":
                    case "G𝄪":
                        withKeystroke = {choice: questions[j].choices[k], key: questions[j].choices[k].charAt(0).toLowerCase()}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                      console.log("found an answer choice that isn't a letter name: " + questions[j].choices[k]);
                      break
                    }
              break

              case questionTypes.DEGREE:
                  switch (questions[j].choices[k]) {
                      case '1^':
                      case '2^':
                      case '3^':
                      case '4^':
                      case '5^':
                      case '6^':
                      case '7^':
                          withKeystroke = {choice: questions[j].choices[k], key: questions[j].choices[k].charAt(0)}
                          choicesWithKeys.push(withKeystroke)
                          break
                      default:
                        console.log("found an answer choice that isn't a scale degree: " + questions[j].choices[k]);
                        break
                        }
              break

              case questionTypes.QUALITY:
                if (questions[j].choices.length === 4) {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: 'M'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: 'm'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: 'd'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 3:
                        withKeystroke = {choice: questions[j].choices[k], key: 'A'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid chord quality: " + questions[j].choices[k]);
                        break
                      }}
                else if (questions[j].choices.length === 5) {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: '7'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: 'M'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: 'm'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 3:
                        withKeystroke = {choice: questions[j].choices[k], key: 'h'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 4:
                        withKeystroke = {choice: questions[j].choices[k], key: 'd'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid chord quality: " + questions[j].choices[k]);
                        break
                      }}
              break

              case questionTypes.NUMERAL:
                if (questions[j].choices[k].includes('7')) {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: '7'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: 'm'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: 'h'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 3:
                        withKeystroke = {choice: questions[j].choices[k], key: 'd'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid roman numeral: " + questions[j].choices[k]);
                        break
                      }}
                else {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: 'M'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: 'm'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: 'd'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 3:
                        withKeystroke = {choice: questions[j].choices[k], key: 'A'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid roman numeral: " + questions[j].choices[k]);
                        break
                      }}
              break

              case questionTypes.INVERSION:
                if (questions[j].choices.length === 3) {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: 'r'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: '3'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: '4'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid chord quality: " + questions[j].choices[k]);
                        break
                      }}
                else if (questions[j].choices.length === 4) {
                  switch (k) {
                    case 0:
                        withKeystroke = {choice: questions[j].choices[k], key: 'r'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 1:
                        withKeystroke = {choice: questions[j].choices[k], key: '5'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 2:
                        withKeystroke = {choice: questions[j].choices[k], key: '3'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    case 3:
                        withKeystroke = {choice: questions[j].choices[k], key: '2'}
                        choicesWithKeys.push(withKeystroke)
                        break
                    default:
                        console.log("found an answer choice that isn't a valid chord quality: " + questions[j].choices[k]);
                        break
                      }}
                break

                    default:
                      console.log("something went wrong with the text of this question");
                      break
                  }
    }
    questions[j].choices = choicesWithKeys
  }
  chords[i].questions = questions
}

// console.log(chalk.yellow(JSON.stringify(chords, null, 3)))
return chords
}

export default addKeystrokes
