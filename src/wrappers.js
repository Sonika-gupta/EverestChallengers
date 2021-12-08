const { colorText } = require('./globals')
const { getOutcome } = require('./predictOutcome')
const { generateRandomIndex, strToInput, printToConsole } = require('./utils')
const inquiry = require('./inquiry')

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

function getShotOutcome (str) {
  const outcome = getOutcome(str)
  printToConsole(decorate(outcome.result, 'result'))
}

function getCommentaryOutcome (str) {
  const outcome = getOutcome(str)
  printToConsole(getComment(outcome))
}

module.exports = {
  getComment,
  getShotOutcome,
  getCommentaryOutcome
}
