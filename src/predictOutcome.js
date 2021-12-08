const { errors } = require('./globals')
const { generateRandomIndex, strToInput } = require('./utils')

const { predictionModel } = require('./models/predictionModel')
const game = require('./models/game')

const BowlCard = require('./classes/BowlCard')

function getOutcome (str) {
  const input = strToInput(str)
  if (!input || input.length !== 3) throw errors.invalidInput

  const bowlCard = game.getBowlCard(input[0])
  if (!bowlCard) throw errors.invalidBowlType

  return predictOutcome(bowlCard, input[1], input[2])
}

function predictOutcome (bowlCard, shotType, shotTiming) {
  const hitProbability = bowlCard.getHitProbability(shotType)
  if (!hitProbability) throw errors.invalidShotType

  if (!predictionModel[shotTiming]) throw errors.invalidShotTiming

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
  getOutcome,
  predictOutcome
}
