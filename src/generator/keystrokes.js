import { ChordType } from './ChordType'
import { randomArrayElement } from './utility'

export default function addKeystrokes(chords) {

  const questionTypes = {
    NAMES: `Names`,
    ROOT: `Roots`,
    DEGREE: `Degrees`,
    QUALITY: `Quality`,
    NUMERAL: `Numerals`,
    INVERSION: `Inversions`,
    ROLE: 'Role',
    WHAT_FOLLOWS: 'Follows'
  }

  // FIXME: Consider nesting `map` or `forEach` type functions
  for (var ch = 0; ch < chords.length; ch++) {
    var chord = chords[ch]
    var questions = chord.questions
    for (var q = 0; q < questions.length; q++) {
      var question = questions[q]
      let choicesWithKeys = []
      for (var c = 0; c < question.choices.length; c++) {
        const choice = question.choices[c]
        let withKeystroke
          switch(question.type) {
            case questionTypes.NAMES:
              // fallthrough
            case questionTypes.ROOT:
              switch (choice) {
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
                    withKeystroke = {choice: choice, key: choice.charAt(0).toLowerCase()}
                    choicesWithKeys.push(withKeystroke)
                    break
                default:
                  console.log("found an answer choice that isn't a letter name: " + choice);
                  break
                }
              break
            case questionTypes.DEGREE:
              switch (choice) {
                case '1^':
                case '2^':
                case '3^':
                case '4^':
                case '5^':
                case '6^':
                case '7^':
                    withKeystroke = {choice: choice, key: choice.charAt(0)}
                    choicesWithKeys.push(withKeystroke)
                    break
                default:
                  console.log("found an answer choice that isn't a scale degree: " + choice);
                  break
                }
              break
            case questionTypes.QUALITY:
              // FIXME: (James) This is a bit of hack. In the future, I think it
              //        it would be wise if we make the keystroke aggregation
              //        and the question aggregation more cohesive.
              if (chord.chordType === ChordType.CHROMATIC_VARIATION) {
                if (choice.includes("N")) {
                  withKeystroke =  { choice: choice, key: "n" }
                  choicesWithKeys.push(withKeystroke)
                } else if (choice.includes("I")) {
                  withKeystroke =  { choice: choice, key: "i" }
                  choicesWithKeys.push(withKeystroke)
                } else if (choice.includes("F")) {
                  withKeystroke =  { choice: choice, key: "f" }
                  choicesWithKeys.push(withKeystroke)
                } else if (choice.includes("G")) {
                  withKeystroke =  { choice: choice, key: "g" }
                  choicesWithKeys.push(withKeystroke)
                } else {
                  throw "Unsupported choice for chromatic variation question"
                }
                break
              } else if (chord.chordType === ChordType.APPLIED_CHORD) {
                withKeystroke = { choice: choice, key: (c + 1).toString() }
                choicesWithKeys.push(withKeystroke)
                break
              }

              // FIXME: Audit this for correctness.
              //        See if we can find a more flexible way to do this!
              if (question.choices.length === 4) {
                switch (c) {
                  case 0:
                    withKeystroke = {choice: choice, key: 'M'}
                    choicesWithKeys.push(withKeystroke)
                    break
                  case 1:
                    withKeystroke = {choice: choice, key: 'm'}
                    choicesWithKeys.push(withKeystroke)
                    break
                  case 2:
                    withKeystroke = {choice: choice, key: 'd'}
                    choicesWithKeys.push(withKeystroke)
                    break
                  case 3:
                    withKeystroke = {choice: choice, key: 'A'}
                    choicesWithKeys.push(withKeystroke)
                    break
                  default:
                    console.log("found an answer choice that isn't a valid chord quality: " + choice);
                    break
                }
              } else if (question.choices.length === 5) {
                switch (c) {
                  case 0:
                      withKeystroke = {choice: choice, key: '7'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 1:
                      withKeystroke = {choice: choice, key: 'M'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 2:
                      withKeystroke = {choice: choice, key: 'm'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 3:
                      withKeystroke = {choice: choice, key: 'h'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 4:
                      withKeystroke = {choice: choice, key: 'd'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  default:
                      console.log("found an answer choice that isn't a valid chord quality: " + choice);
                      break
                  }
                } else {
                  withKeystroke = { choice: choice, key: randomArrayElement([1,2,3,4,5,6,7,8,9]) }
                  choicesWithKeys.push(withKeystroke)
                  break
                }
                break
            case questionTypes.NUMERAL:
              if (choice.includes('7')) {
                switch (c) {
                  case 0:
                      withKeystroke = {choice: choice, key: '7'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 1:
                      withKeystroke = {choice: choice, key: 'm'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 2:
                      withKeystroke = {choice: choice, key: 'h'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 3:
                      withKeystroke = {choice: choice, key: 'd'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  default:
                      console.log("found an answer choice that isn't a valid roman numeral: " + choice);
                      break
                }
              } else {
                switch (c) {
                  case 0:
                      withKeystroke = {choice: choice, key: 'M'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 1:
                      withKeystroke = {choice: choice, key: 'm'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 2:
                      withKeystroke = {choice: choice, key: 'd'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 3:
                      withKeystroke = {choice: choice, key: 'A'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  default:
                      console.log("found an answer choice that isn't a valid roman numeral: " + choice);
                      break
                    }
                }
              break
            case questionTypes.INVERSION:
              if (question.choices.length === 3) {
                switch (c) {
                  case 0:
                      withKeystroke = {choice: choice, key: 'r'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 1:
                      withKeystroke = {choice: choice, key: '3'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 2:
                      withKeystroke = {choice: choice, key: '4'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  default:
                      console.log("found an answer choice that isn't a valid chord quality: " + choice);
                      break
                    }
                  }
              else if (question.choices.length === 4) {
                switch (c) {
                  case 0:
                      withKeystroke = {choice: choice, key: 'r'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 1:
                      withKeystroke = {choice: choice, key: '5'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 2:
                      withKeystroke = {choice: choice, key: '3'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  case 3:
                      withKeystroke = {choice: choice, key: '2'}
                      choicesWithKeys.push(withKeystroke)
                      break
                  default:
                      console.log("found an answer choice that isn't a valid chord quality: " + choice);
                      break
                    }
                } else {
                  withKeystroke = { choice: choice, key: randomArrayElement([1,2,3,4,5,6,7,8,9]) }
                  choicesWithKeys.push(withKeystroke)
                  break
                }
              break
            case questionTypes.ROLE:
              const map = {
                'In-Key': 'k',
                'Chromatic': 'c',
                'Mixture': 'm',
                'Applied': 'a'
              }
              withKeystroke = { choice: choice, key: map[choice] }
              choicesWithKeys.push(withKeystroke)
              break
            case questionTypes.WHAT_FOLLOWS:
              let key
              switch (choice) {
                case 'I':
                  key = 'I'
                  break
                case 'i':
                  key = 'i'
                  break
                case 'ii':
                case 'iio':
                  key = '2'
                  break
                case 'III':
                case 'iii':
                  key = '3'
                  break
                case 'IV':
                case 'iv':
                  key = '4'
                  break
                case 'V':
                case 'v':
                  key = 'V'
                  break
                case 'VI':
                case 'vi':
                  key = '6'
                  break
                case 'viio':
                  key = '7'
                  break
                case 'Cad64':
                  key = 'c'
                  break
                default:
                  throw "Unsupported choice for Role question: " + choice
              }
              withKeystroke = { choice: choice, key: key }
              choicesWithKeys.push(withKeystroke)
              break
            default:
              console.log("something went wrong with the text of this question");
              break
          }
    }
    question.choices = choicesWithKeys
  }
  chord.questions = questions
}

return chords
}
