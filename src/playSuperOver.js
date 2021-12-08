const { predictOutcome } = require('./predictOutcome')
const {
  generateRandomIndex,
  strToInput,
  printToConsole,
  getComment
} = require('./utils')
const game = require('./models/game')

const { shotTypes, shotTimings } = require('./data')

function createCommentary ({
  bowler,
  batsman,
  bowlType,
  shotType,
  shotTiming,
  outcome
}) {
  const shotTypeName = shotTypes.find(type => type.value === shotType).name
  const shotTimingName = shotTimings.find(timing => timing.value === shotTiming)
    .name

  return (
    `${bowler} bowled a ${bowlType} ball \n` +
    `${batsman} played ${shotTimingName} ${shotTypeName} \n` +
    `${getComment(outcome)} \n`
  )
}

function playSuperOver ({
  shotsPlayed,
  chasingTeamName = 'australia',
  target = 21
}) {
  const superOverBowlCards = game.getRandomBowlCards(6)

  const { bowler, batsman } = game.startSuperOver({
    target,
    battingTeamName: chasingTeamName
  })

  let result = null,
    commentary = []
  for (let i = 0; i < shotsPlayed.length; i++) {
    const [shotType, shotTiming] = Array.isArray(shotsPlayed[i])
      ? shotsPlayed[i]
      : strToInput(shotsPlayed[i])

    const outcome = predictOutcome(superOverBowlCards[i], shotType, shotTiming)
    const comment = createCommentary({
      bowler,
      batsman,
      bowlType: superOverBowlCards[i].name,
      shotType: shotType,
      shotTiming: shotTiming,
      outcome
    })

    commentary.push(comment)

    result = game.playDelivery(outcome)
    if (result) break
  }

  commentary.push(result || game.getResult())
  return commentary
}

module.exports = playSuperOver
