const predictOutcome = require('./predictOutcome')
const {
  generateRandomIndex,
  strToInput,
  toTitleCase,
  printToConsole
} = require('./utils')
const { getComment } = require('./wrappers')
const game = require('./models/game')

function format (str) {
  const values = str
    .split(/\s/)
    .map(value => toTitleCase(value))
    .reverse()
  return values.join(' ')
}

function createCommentary ({ bowler, batsman, bowlType, shot, outcome }) {
  return `${bowler} bowled a ${format(
    bowlType
  )} ball \n${batsman} played ${format(shot)} \n${getComment(outcome)} \n`
}

function playSuperOver (shotsPlayed, chasingTeamName) {
  const superOverBowlCards = game.getRandomBowlCards(6)

  const { bowler, batsman } = game.startSuperOver({
    target: 21,
    bowlingTeamName: 'india',
    battingTeamName: 'australia'
  })

  let result = null
  for (let i = 0; i < shotsPlayed.length; i++) {
    const [shotType, shotTiming] = strToInput(shotsPlayed[i])
    const outcome = predictOutcome(superOverBowlCards[i], shotType, shotTiming)
    const comment = createCommentary({
      bowler,
      batsman,
      bowlType: superOverBowlCards[i].name,
      shot: shotsPlayed[i],
      outcome
    })

    printToConsole(comment)

    result = game.playDelivery(outcome)
    if (result) break
  }

  printToConsole(result || game.getResult())
}

module.exports = playSuperOver
