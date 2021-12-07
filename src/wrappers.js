const { strToInput } = require('./utils')
const { predictOutcome } = require('./predictOutcome')

function getShotOutcome (str) {
  const outcome = getOutcome(str)
  return outcome.result
}

function getCommentaryOutcome (str) {
  const outcome = getOutcome(str)
  return (
    outcome.comments[generateRandomIndex(outcome.comments.length)] +
    ' - ' +
    outcome.result
  )
}

function getOutcome (str) {
  const input = strToInput(str)
  return predictOutcome(...input)
}

module.exports = {
  getShotOutcome,
  getCommentaryOutcome
}
