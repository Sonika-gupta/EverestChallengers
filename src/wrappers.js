const { strToInput } = require('./utils')
const { predictOutcome } = require('./predictOutcome')
const { errors } = require('./globals')

function getComment (outcome) {
  return (
    outcome.comments[generateRandomIndex(outcome.comments.length)] +
    ' - ' +
    outcome.result
  )
}

function getShotOutcome (str) {
  const outcome = getOutcome(str)
  return outcome.result
}

function getCommentaryOutcome (str) {
  const outcome = getOutcome(str)
  return getComment(outcome)
}

function getOutcome (str) {
  const input = strToInput(str)
  if (!input || input.length !== 3) throw errors.invalidInput

  const bowlCard = game.getBowlCard(input[0])
  if (!bowlCard) throw errors.invalidBowlType

  return predictOutcome(...input)
}

module.exports = {
  getComment,
  getShotOutcome,
  getCommentaryOutcome
}
