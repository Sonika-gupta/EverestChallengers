const { game, errors } = require('./globals')
const { strToInput, generateRandomIndex } = require('./utils')
const { predictionModel } = require('./predictionModel')

function getOutcome (str) {
  const input = strToInput(str)
  return predictOutcome(...input)
}

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

function predictOutcome (bowlType, shotType, shotTiming) {
  const bowlCard = game.getBowlCard(bowlType)
  if (!bowlCard) throw errors.invalidBowlType
  const hitProbability = bowlCard.getHitProbability(shotType)
  if (!hitProbability) throw errors.invalidShotType

  for (let { minProb, outcomes } of predictionModel[shotTiming]) {
    if (hitProbability >= minProb) {
      return outcomes[generateRandomIndex(outcomes.length)]
    }
  }
  return predictionModel.default[
    generateRandomIndex(predictionModel.default.length)
  ]
}

module.exports = {
  getShotOutcome,
  getCommentaryOutcome
}
