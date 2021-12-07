const { errors } = require('./globals')
const { generateRandomIndex } = require('./utils')
const { predictionModel } = require('./predictionModel')
const BowlCard = require('./classes/BowlCard')

function predictOutcome (bowlCard, shotType, shotTiming) {
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
