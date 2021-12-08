const { predictOutcome } = require('./predictOutcome')
const { generateRandomIndex, strToInput, printToConsole } = require('./utils')
const { getComment } = require('./wrappers')
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
  return `${bowler} bowled a ${bowlType} ball \n${batsman} played ${shotTimingName} ${shotTypeName} \n${getComment(
    outcome
  )} \n`
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

  let result = null
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

    printToConsole(comment)

    result = game.playDelivery(outcome)
    if (result) break
  }

  printToConsole(result || game.getResult())
}

module.exports = playSuperOver
