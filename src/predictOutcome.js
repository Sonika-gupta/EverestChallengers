const { game, errors } = require('./globals')
const { generateRandomIndex } = require('./utils')
const { predictionModel } = require('./predictionModel')

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
  predictOutcome
}
