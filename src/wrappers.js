const { getOutcome } = require('./predictOutcome')
const { generateRandomIndex, strToInput, printToConsole } = require('./utils')
const inquiry = require('./inquiry')

function getComment (outcome) {
  return (
    outcome.comments[generateRandomIndex(outcome.comments.length)] +
    ' - ' +
    outcome.result
  )
}

function getShotOutcome (str) {
  const outcome = getOutcome(str)
  printToConsole(outcome.result)
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
