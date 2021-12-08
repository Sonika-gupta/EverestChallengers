const { errors, colorText } = require('./globals')
const boxen = require('boxen')

function strToInput (str) {
  if (!str) throw errors.invalidInput
  const input = str.split(/\s/)
  return input && input.map(item => item.toLowerCase())
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

function printToConsole (str) {
  const options = {
    padding: 1,
    margin: 1,
    borderStyle: 'singleDouble',
    backgroundColor: '#333'
  }
  console.log(boxen(str, options))
}

function decorate (text, type) {
  if (colorText[type]) return colorText[type](text)

  if (type === 'result') {
    if (text.match(/1 wicket/)) return colorText.resultBad(text)
    if (text.match(/0 runs|1 run|2 runs|3 runs/))
      return colorText.resultAverage(text)
    if (text.match(/4 runs|5 runs|6 runs/)) return colorText.resultGood(text)
  }
}

function getComment (outcome) {
  return (
    decorate(
      outcome.comments[generateRandomIndex(outcome.comments.length)],
      'comment'
    ) +
    ' - ' +
    decorate(outcome.result, 'result')
  )
}

module.exports = {
  generateRandomIndex,
  printToConsole,
  strToInput,
  decorate,
  getComment
}
