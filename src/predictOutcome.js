const { game, errors } = require('./globals')
const { getInputFromString } = require('./utils')
const { predictionModel } = require('./predictionModel')

function predictOutcome (input) {
  const [bowlType, shotType, shotTiming] = getInputFromString(input)

  const bowlCard = game.getBowlCard(bowlType)
  if (!bowlCard) throw errors.invalidBowlType
  const hitProbability = bowlCard.getHitProbability(shotType)
  if (!hitProbability) throw errors.invalidShotType

  for (let condition of predictionModel[shotTiming]) {
    if (hitProbability >= condition.minProb) {
      return condition.outcomes[
        Math.floor(Math.random() * condition.outcomes.length)
      ]
    }
  }
  return predictionModel.default
}

module.exports = {
  predictOutcome
}
