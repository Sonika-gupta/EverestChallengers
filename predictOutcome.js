const { game, errors } = require('./globals')
const { getInputFromString } = require('./utils')

function predictOutcome (input) {
  const [bowlType, shotType, shotTiming] = getInputFromString(input)

  const bowlCard = game.getBowlCard(bowlType)
  if (!bowlCard) throw errors.invalidBowlType
  const shotLevel = bowlCard.getShotLevel(shotType)
  if (!shotLevel) throw errors.invalidShotType
}

module.exports = {
  predictOutcome
}
