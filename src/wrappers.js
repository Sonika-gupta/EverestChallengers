const { errors } = require('./globals')
const predictOutcome = require('./predictOutcome')
const { generateRandomIndex, strToInput } = require('./utils')
const game = require('./models/game')

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

  return predictOutcome(bowlCard, input[1], input[2])
}

module.exports = {
  getComment,
  getShotOutcome,
  getCommentaryOutcome
}
