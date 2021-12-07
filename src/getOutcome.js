const { game, errors } = require('./globals')
const { strToInput, generateRandomIndex } = require('./utils')
const { predictionModel } = require('./predictionModel')

function getShotOutcome (str) {
  const input = strToInput(str)
  const outcome = predictOutcome(...input)
  return outcome.result
}

function getCommentaryOutcome (str) {
  const input = strToInput(str)
  const outcome = predictOutcome(...input)
  return (
    outcome.comments[generateRandomIndex(outcome.comments.length)] +
    ' - ' +
    getShotOutcome(outcome)
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
